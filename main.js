/* orikawa laurentin · main.js
   1. Vague des boutons   2. Hero (titre ajusté, bascule au survol)   2b. Lightbox du showreel
   3. Header   4. Apparition au scroll */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. VAGUE DES BOUTONS --------------------------------------------------
     Zigzag de 3 traits, injecté dans chaque bouton portant [data-wave] :
     il se dessine au survol (voir styles.css). Le logo, lui, a sa propre vague (SVG).
     Pour utiliser la vraie vague exportée de Figma, remplace les points de ZIGZAG
     ou la fonction makeWave() par ton SVG. */
  const NS = 'http://www.w3.org/2000/svg';
  const ZIGZAG = [[2, 4], [35, 16], [68, 4], [101, 16], [134, 4], [167, 16], [198, 4]];
  const OFFSETS = [0, 5, 10]; // écart vertical entre les 3 traits

  function makeWave() {
    const wrap = document.createElement('span');
    wrap.className = 'wave';
    wrap.setAttribute('aria-hidden', 'true');

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 28');
    svg.setAttribute('preserveAspectRatio', 'none');

    OFFSETS.forEach((dy) => {
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', ZIGZAG.map(([x, y], i) => (i ? 'L' : 'M') + x + ' ' + (y + dy)).join(' '));
      path.setAttribute('pathLength', '1'); // pour animer le tracé de 0 à 100 %
      svg.appendChild(path);
    });

    wrap.appendChild(svg);
    return wrap;
  }

  document.querySelectorAll('[data-wave]').forEach((el) => {
    const label = document.createElement('span');
    label.className = 'btn__label';
    while (el.firstChild) label.appendChild(el.firstChild);
    el.appendChild(label);
    el.appendChild(makeWave());
  });

  /* 2. HERO ---------------------------------------------------------------- */
  const hero = document.querySelector('[data-hero]');
  const header = document.querySelector('[data-header]');
  const title = hero.querySelector('.hero__title');
  const veil = hero.querySelector('.hero__veil');
  const showreelBtn = hero.querySelector('[data-showreel]');
  const video = hero.querySelector('.hero__video');

  // Taille du titre : la plus grande possible dans TITLE_WIDTH de la largeur utile
  // et TITLE_HEIGHT de la hauteur libre entre le header et le bas du hero.
  const TITLE_WIDTH = 0.86;
  const TITLE_HEIGHT = 0.78;
  function fitTitle() {
    const cs = getComputedStyle(veil);
    const availW = (veil.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) * TITLE_WIDTH;
    const availH = (veil.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) * TITLE_HEIGHT;
    const probe = 100;

    title.style.setProperty('--title-size', probe + 'px');
    // offsetWidth/Height : insensibles aux transformations de l'animation d'entrée
    const textW = Math.max(...Array.from(title.children, (l) => l.offsetWidth));
    const textH = title.offsetHeight;
    if (!textW || !textH) return;

    const size = Math.min((probe * availW) / textW, (probe * availH) / textH);
    title.style.setProperty('--title-size', size.toFixed(1) + 'px');
  }

  let fitFrame = 0;
  const scheduleFit = () => {
    cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(fitTitle);
  };
  fitTitle();
  window.addEventListener('resize', scheduleFit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);

  // Bascule : vidéo à travers le texte (repos) <-> vidéo en plein fond (survol de « See showreel »)
  let revealed = false;
  function setReveal(on) {
    if (on === revealed) return;
    revealed = on;
    hero.classList.toggle('is-reveal', on);
    syncHeader();
  }
  showreelBtn.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') setReveal(true); });
  showreelBtn.addEventListener('pointerleave', () => setReveal(false));
  showreelBtn.addEventListener('focus', () => { if (showreelBtn.matches(':focus-visible')) setReveal(true); });
  showreelBtn.addEventListener('blur', () => setReveal(false));

  showreelBtn.addEventListener('click', () => openLightbox(showreelBtn));

  // Vidéo absente (pas encore ajoutée) : on la cache, le dégradé de remplacement reste visible.
  // L'erreur peut survenir avant que ce script ne tourne, d'où la vérification immédiate.
  function whenVideoFails(v, cb) {
    if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) cb();
    else v.addEventListener('error', cb, { once: true });
  }
  whenVideoFails(video, () => { video.hidden = true; });

  // Mouvement réduit : la vidéo reste à l'arrêt.
  function applyMotionPreference() {
    if (reduceMotion.matches) {
      video.removeAttribute('autoplay');
      video.pause();
    } else if (!video.hidden) {
      video.play().catch(() => {});
    }
  }
  applyMotionPreference();
  reduceMotion.addEventListener('change', applyMotionPreference);

  /* 2b. LIGHTBOX DU SHOWREEL -----------------------------------------------
     Se ferme : clic en dehors de la vidéo, Échap, Retour arrière, bouton Précédent
     du navigateur (on empile une entrée d'historique à l'ouverture). */
  const lightbox = document.querySelector('[data-lightbox]');
  const lbVideo = lightbox.querySelector('.lightbox__video');
  const lbFrame = lightbox.querySelector('.lightbox__frame');
  const lbMissing = lightbox.querySelector('.lightbox__missing');
  const lbClose = lightbox.querySelector('[data-lightbox-close]');
  const pageParts = [header, document.getElementById('main'), document.querySelector('.site-footer')];

  let lbOpen = false;
  let lbReturnFocus = null;
  let lbInHistory = false;
  let lbHideTimer = 0;

  function openLightbox(trigger) {
    if (lbOpen) return;
    lbOpen = true;
    lbReturnFocus = trigger || document.activeElement;
    clearTimeout(lbHideTimer);

    setReveal(false);
    video.pause(); // la boucle du hero se met en pause pendant le showreel
    document.body.classList.add('has-lightbox');
    pageParts.forEach((el) => { if (el) el.inert = true; });

    lightbox.hidden = false;
    // Deux images d'attente pour que la transition d'ouverture joue bien
    requestAnimationFrame(() => requestAnimationFrame(() => lightbox.classList.add('is-open')));
    lbClose.focus({ preventScroll: true });

    if (!lbVideo.hidden) {
      lbVideo.currentTime = 0;
      lbVideo.muted = false;
      lbVideo.play().catch(() => {});
    }

    history.pushState({ showreel: true }, '');
    lbInHistory = true;
  }

  function closeLightbox(fromHistory) {
    if (!lbOpen) return;
    lbOpen = false;

    lightbox.classList.remove('is-open');
    lbVideo.pause();
    document.body.classList.remove('has-lightbox');
    pageParts.forEach((el) => { if (el) el.inert = false; });
    if (!reduceMotion.matches && !video.hidden) video.play().catch(() => {});

    // On cache l'élément une fois la fermeture jouée
    lbHideTimer = setTimeout(() => { if (!lbOpen) lightbox.hidden = true; }, 350);

    if (lbInHistory && !fromHistory) history.back();
    lbInHistory = false;

    if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus({ preventScroll: true });
    lbReturnFocus = null;
  }

  lbClose.addEventListener('click', () => closeLightbox());
  lightbox.addEventListener('click', (e) => {
    if (!lbFrame.contains(e.target)) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lbOpen) return;
    const typing = e.target.matches('input, textarea, [contenteditable]');
    if (e.key === 'Escape' || (e.key === 'Backspace' && !typing)) {
      e.preventDefault();
      closeLightbox();
    }
  });
  window.addEventListener('popstate', () => { if (lbOpen) closeLightbox(true); });

  // Showreel absent (pas encore ajouté) : message à la place de la vidéo.
  whenVideoFails(lbVideo, () => {
    lbVideo.hidden = true;
    lbMissing.hidden = false;
  });

  /* 3. HEADER -------------------------------------------------------------- */
  function syncHeader() {
    const y = window.scrollY;
    const past = y > hero.offsetHeight - header.offsetHeight;
    header.classList.toggle('is-scrolled', y > 4);   // fond dès le début du défilement
    header.classList.toggle('is-solid', past);       // filet une fois le hero passé
    header.classList.toggle('is-on-dark', revealed && !past);
  }
  let scrollFrame = 0;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(syncHeader);
  }, { passive: true });
  syncHeader();

  /* 4. APPARITION AU SCROLL ------------------------------------------------ */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    items.forEach((item) => io.observe(item));
  } else {
    items.forEach((item) => item.classList.add('is-in'));
  }
})();
