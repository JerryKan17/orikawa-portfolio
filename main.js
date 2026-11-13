/* orikawa laurentin · main.js
   1. Vague des boutons   2. Hero (titre ajusté, bascule au survol)   2b. Lightbox   2c. Filtres de Works
   2d. Works : projets lus dans data/works.json
   3. Header (section en cours)   4. Apparition au scroll   5. Grain de papier   6. Curseur
   7. Contact (e-mail, grande vague)   8. Sons (bouton, survols, clics)
   Le moteur de sons (0) est en haut pour que toutes les sections puissent l'appeler. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 0. SONS : MOTEUR -----------------------------------------------------------
     Les fichiers vont dans assets/sounds/, au nom indiqué ici (+ .mp3).
     Liste complète et consignes : assets/sounds/LISTE-DES-SONS.md.
     Actifs par défaut : le visiteur peut les couper avec le bouton du header (choix mémorisé).
     Un fichier absent est simplement ignoré.
     volume : de 0 à 1 (multiplié par MASTER) · throttle : délai minimum entre deux lectures (ms) */
  const SOUND_DIR = 'assets/sounds/';
  const MASTER = 0.8;
  const SOUNDS = {
    'toggle-on':     { volume: 0.6 },
    'toggle-off':    { volume: 0.5 },
    'ui-hover':      { volume: 0.18, throttle: 60 },
    'ui-click':      { volume: 0.4 },
    'hero-reveal':   { volume: 0.5 },
    'lightbox-close':{ volume: 0.45 },
    'card-hover':    { volume: 0.25, throttle: 90 },
    'bubble-1':      { volume: 0.35 },
    'bubble-2':      { volume: 0.35 },
    'bubble-3':      { volume: 0.35 },
    'bubble-4':      { volume: 0.35 },
    'bubble-5':      { volume: 0.35 },
    'bubble-6':      { volume: 0.35 },
    'wave-pluck':    { volume: 0.5 }, // pas de spam : géré par la vague de Contact (section 7)
    'copy':          { volume: 0.5 },
  };
  const sfx = { on: true, cache: {}, missing: new Set(), last: {} };

  function loadSound(name) {
    if (!sfx.cache[name]) {
      const a = new Audio(SOUND_DIR + name + '.mp3');
      a.preload = 'auto';
      a.addEventListener('error', () => sfx.missing.add(name), { once: true });
      sfx.cache[name] = a;
    }
    return sfx.cache[name];
  }

  // Durée d'un son en secondes, lue dans le fichier (0 tant qu'elle n'est pas connue)
  function soundDuration(name) {
    const d = loadSound(name).duration;
    return Number.isFinite(d) ? d : 0;
  }

  function playSound(name) {
    const def = SOUNDS[name];
    if (!sfx.on || !def || sfx.missing.has(name)) return;
    const now = performance.now();
    if (def.throttle && now - (sfx.last[name] || 0) < def.throttle) return;
    sfx.last[name] = now;
    const a = loadSound(name).cloneNode(); // une copie par lecture : les sons peuvent se superposer
    a.volume = Math.min(1, def.volume * MASTER);
    a.play().catch(() => {});
  }

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

  function decorateWave(el) {
    const label = document.createElement('span');
    label.className = 'btn__label';
    while (el.firstChild) label.appendChild(el.firstChild);
    el.appendChild(label);
    el.appendChild(makeWave());
  }
  document.querySelectorAll('[data-wave]').forEach(decorateWave);

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
    if (on) playSound('hero-reveal');
    hero.classList.toggle('is-reveal', on);
    document.documentElement.classList.toggle('hero-revealed', on); // efface le grain sur la vidéo
    syncHeader();
    document.dispatchEvent(new Event('cursor:refresh'));
  }
  showreelBtn.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') setReveal(true); });
  showreelBtn.addEventListener('pointerleave', () => setReveal(false));
  showreelBtn.addEventListener('focus', () => { if (showreelBtn.matches(':focus-visible')) setReveal(true); });
  showreelBtn.addEventListener('blur', () => setReveal(false));

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

  /* 2b. LIGHTBOX (showreel et projets) ---------------------------------------
     Ouverte par tout élément [data-film] : le bouton « See showreel » et les vignettes de Works.
     Elle lit les données du film (vidéo, titre, type, Brief, Concept, Tools) :
       - pour un projet de Works : dans data/works.json (voir section 2d) ;
       - pour le showreel : sur le bouton lui-même (data-title, data-meta, data-video…).
     Un film au format 9:16 s'affiche en vertical, avec sa légende à droite.
     Se ferme : clic en dehors du panneau, Échap, Retour arrière, bouton Précédent du navigateur
     (on empile une entrée d'historique à l'ouverture). */
  const lightbox = document.querySelector('[data-lightbox]');
  const lbVideo = lightbox.querySelector('.lightbox__video');
  const lbPanel = lightbox.querySelector('.lightbox__panel');
  const lbMissing = lightbox.querySelector('.lightbox__missing');
  const lbClose = lightbox.querySelector('[data-lightbox-close]');
  const lbFields = lightbox.querySelectorAll('[data-field]');
  const pageParts = [header, document.getElementById('main'), document.querySelector('.site-footer')];

  let lbOpen = false;
  let lbReturnFocus = null;
  let lbInHistory = false;
  let lbHideTimer = 0;
  let lbToken = 0;

  function filmData(trigger) {
    const card = trigger.closest('.work');
    const work = card && worksById.get(card.dataset.id);
    if (work) {
      return {
        title: work.title,
        meta: workMeta(work),
        video: (work.video && work.video.mp4) || '',
        webm: (work.video && work.video.webm) || '',
        poster: work.poster || '',
        brief: work.brief || '',
        concept: work.concept || '',
        tools: Array.isArray(work.tools) ? work.tools.join(', ') : (work.tools || ''),
        vertical: work.format === '9:16',
      };
    }
    const d = trigger.dataset;
    return {
      title: d.title || '', meta: d.meta || '', video: d.video || '', webm: d.webm || '', poster: d.poster || '',
      brief: d.brief || '', concept: d.concept || '', tools: d.tools || '', vertical: d.format === '9:16',
    };
  }

  function showMissing() {
    lbVideo.hidden = true;
    lbMissing.hidden = false;
  }

  function loadFilm(film) {
    const token = ++lbToken;
    lbFields.forEach((el) => {
      el.textContent = film[el.dataset.field] || '';
      // Brief / Concept / Tools vides : la ligne est masquée (et le bloc entier s'il ne reste rien)
      const row = el.closest('.lightbox__facts > div');
      if (row) row.hidden = !el.textContent;
    });
    const facts = lightbox.querySelector('.lightbox__facts');
    if (facts) facts.hidden = !facts.querySelector(':scope > div:not([hidden])');
    lightbox.classList.toggle('is-vertical', !!film.vertical);
    lbMissing.hidden = true;
    lbVideo.hidden = false;
    if (film.poster) lbVideo.poster = film.poster; else lbVideo.removeAttribute('poster');
    if (!film.video) { showMissing(); return; }
    // Vidéo absente (pas encore ajoutée) : message à la place
    lbVideo.addEventListener('error', () => { if (token === lbToken) showMissing(); }, { once: true });
    // WebM s'il existe et que le navigateur le lit, sinon MP4 (lu partout)
    lbVideo.src = film.webm && lbVideo.canPlayType('video/webm; codecs="vp9"') ? film.webm : film.video;
    lbVideo.muted = false;
    lbVideo.play().catch(() => {});
  }

  function openLightbox(trigger) {
    if (lbOpen) return;
    lbOpen = true;
    lbReturnFocus = trigger || document.activeElement;
    clearTimeout(lbHideTimer);

    setReveal(false);
    video.pause(); // la boucle du hero se met en pause pendant la lecture
    document.body.classList.add('has-lightbox');
    pageParts.forEach((el) => { if (el) el.inert = true; });

    loadFilm(filmData(trigger));
    lightbox.hidden = false;
    // Deux images d'attente pour que la transition d'ouverture joue bien
    requestAnimationFrame(() => requestAnimationFrame(() => lightbox.classList.add('is-open')));
    lbClose.focus({ preventScroll: true });

    history.pushState({ film: true }, '');
    lbInHistory = true;
    document.dispatchEvent(new Event('cursor:refresh'));
  }

  function closeLightbox(fromHistory) {
    if (!lbOpen) return;
    lbOpen = false;
    lbToken++;

    lightbox.classList.remove('is-open');
    playSound('lightbox-close');
    lbVideo.pause();
    document.body.classList.remove('has-lightbox');
    pageParts.forEach((el) => { if (el) el.inert = false; });
    if (!reduceMotion.matches && !video.hidden) video.play().catch(() => {});

    // On cache l'élément et on libère la vidéo une fois la fermeture jouée
    lbHideTimer = setTimeout(() => {
      if (lbOpen) return;
      lightbox.hidden = true;
      lbVideo.removeAttribute('src');
      lbVideo.load();
    }, 350);

    if (lbInHistory && !fromHistory) history.back();
    lbInHistory = false;

    if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus({ preventScroll: true });
    lbReturnFocus = null;
    document.dispatchEvent(new Event('cursor:refresh'));
  }

  // Délégation : marche aussi pour les cartes créées après le chargement (section 2d)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-film]');
    if (trigger) openLightbox(trigger);
  });
  lbClose.addEventListener('click', () => closeLightbox());
  lightbox.addEventListener('click', (e) => {
    if (!lbPanel.contains(e.target)) closeLightbox();
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

  /* 2c. WORKS : FILTRES ---------------------------------------------------------
     Chaque chip [data-filter] garde les projets de la catégorie (data-category, voir section 2d). */
  const filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      document.querySelectorAll('.work').forEach((w) => {
        const show = f === 'all' || w.dataset.category === f;
        if (show && w.hidden) {
          w.hidden = false;
          w.classList.add('is-in'); // déjà apparu : pas besoin d'attendre le scroll
          w.classList.remove('is-entering');
          void w.offsetWidth; // relance l'animation d'entrée
          w.classList.add('is-entering');
        } else if (!show) {
          w.hidden = true;
        }
      });
      document.dispatchEvent(new Event('cursor:refresh'));
    });
  });

  /* 2d. WORKS : PROJETS LUS DANS data/works.json ---------------------------------
     Format : { "version": 1, "works": [ ... ] }. L'ordre du tableau est l'ordre d'affichage ;
     le projet « featured » est affiché en grand, en premier. Un projet avec « externalUrl »
     ouvre ce lien (nouvel onglet) au lieu de la lightbox.
     Le fichier est modifié avec l'outil orikawa-works-editor (dossier voisin du site).
     Ouverture du site en double-cliquant sur index.html : le navigateur bloque la lecture
     du fichier, il faut passer par un serveur local (Live Server). */
  const WORKS_FILE = 'data/works.json';
  const worksList = document.querySelector('[data-works-list]');
  const worksById = new Map();
  const POSTER_ANGLES = [120, 160, 200, 75, 30, 250]; // dégradés d'attente, tant qu'il n'y a pas d'image

  // Ligne de type : « Vertical product video · Concept »
  const workMeta = (w) => [w.summary, w.isConcept ? 'Concept' : ''].filter(Boolean).join(' · ');

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderWork(w, index) {
    const featured = !!w.featured;
    const external = !!w.externalUrl;
    const li = el('li', 'work reveal' + (featured ? ' work--featured' : ''));
    li.dataset.id = w.id;
    li.dataset.category = w.category;
    if (!featured) li.style.setProperty('--i', String(Math.max(0, index - 1) % 4)); // décalage d'apparition

    // Vignette : ouvre la lightbox, ou le lien externe dans un nouvel onglet
    const media = el(external ? 'a' : 'button', 'work__media');
    if (external) {
      media.href = w.externalUrl;
      media.target = '_blank';
      media.rel = 'noopener';
    } else {
      media.type = 'button';
      media.dataset.cursor = 'play';
      media.dataset.film = '';
    }
    const poster = el('span', 'work__poster');
    poster.style.setProperty('--a', POSTER_ANGLES[index % POSTER_ANGLES.length] + 'deg');
    if (w.poster) poster.style.setProperty('--poster', 'url(' + JSON.stringify(w.poster) + ')');
    media.append(poster, el('span', 'sr-only', (external ? 'Open ' : 'Play ') + w.title + (external ? ' (new tab)' : '')));
    if (external) media.append(el('span', 'work__badge', '↗'));

    const info = el('div', 'work__info');
    if (featured) info.append(el('p', 'work__kicker', 'Featured film'));
    info.append(el('h3', 'work__name', w.title), el('p', 'work__meta', workMeta(w)));
    if (featured && w.description) info.append(el('p', 'work__desc', w.description));
    if (featured) {
      const play = el(external ? 'a' : 'button', 'btn btn--ghost work__play', external ? 'Open the project' : 'Play the film');
      if (external) { play.href = w.externalUrl; play.target = '_blank'; play.rel = 'noopener'; }
      else { play.type = 'button'; play.dataset.film = ''; play.dataset.cursor = 'play'; }
      decorateWave(play);
      info.append(play);
    }
    li.append(media, info);
    return li;
  }

  async function loadWorks() {
    if (!worksList) return;
    let data;
    try {
      const res = await fetch(WORKS_FILE, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      data = await res.json();
    } catch (err) {
      console.warn('[works] Impossible de lire ' + WORKS_FILE + ' (ouvre le site avec un serveur local, par exemple Live Server).', err);
      worksList.append(el('li', 'works__empty', 'Projects could not be loaded.'));
      return;
    }
    const all = Array.isArray(data && data.works) ? data.works : [];
    all.forEach((w) => worksById.set(w.id, w));
    // Le projet à la une d'abord, puis les autres dans l'ordre du fichier
    const featured = all.find((w) => w.featured);
    const ordered = featured ? [featured, ...all.filter((w) => w !== featured)] : all;
    ordered.forEach((w, i) => {
      const li = renderWork(w, i);
      worksList.append(li);
      observeReveal(li);
    });
    document.dispatchEvent(new Event('cursor:refresh'));
  }
  loadWorks();

  /* 3. HEADER ----------------------------------------------------------------
     - fond dès le début du défilement, filet une fois le hero passé ;
     - le lien de la section en cours garde un soulignement discret ;
     - sur une section foncée (data-theme="dark" : Contact, footer), le header passe en nuit
       et le grain de papier s'efface. */
  const navLinks = Array.from(document.querySelectorAll('.nav a:not(.btn)'));
  const tracked = [hero, ...document.querySelectorAll('main > section:not(.hero)'), document.querySelector('.site-footer')].filter(Boolean);
  function syncHeader() {
    const y = window.scrollY;
    const line = header.offsetHeight; // la ligne juste sous le header
    const past = y > hero.offsetHeight - line;
    const current = tracked.find((s) => { const r = s.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
    const dark = !!current && current.dataset.theme === 'dark';

    header.classList.toggle('is-scrolled', y > 4);
    header.classList.toggle('is-solid', past && !dark);
    header.classList.toggle('is-dark-section', dark);
    header.classList.toggle('is-on-dark', revealed && !past);
    document.documentElement.classList.toggle('in-dark-section', dark);

    navLinks.forEach((a) => {
      const on = !!current && !!current.id && a.getAttribute('href') === '#' + current.id;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  let scrollFrame = 0;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(syncHeader);
  }, { passive: true });
  window.addEventListener('resize', syncHeader);
  syncHeader();

  /* 4. APPARITION AU SCROLL ------------------------------------------------ */
  const revealIO = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        });
      }, { threshold: 0.2 })
    : null;
  // Aussi appelée pour les cartes de Works, créées après le chargement (section 2d)
  function observeReveal(item) {
    if (revealIO) revealIO.observe(item); else item.classList.add('is-in');
  }
  document.querySelectorAll('.reveal').forEach(observeReveal);

  /* 5. GRAIN DE PAPIER -------------------------------------------------------
     Une seule couche fixe (elle ne bouge pas au défilement), générée une fois au chargement.
     Pas de motif répété : chaque pixel est tiré au hasard, à plusieurs échelles
     (grain fin, petites taches, nuages doux, fibres sombres et claires).
     Réglages : GRAIN ci-dessous (intensités de 0 à 1). */
  const GRAIN = {
    fine: 0.13,     // grain fin, pixel par pixel
    specks: 0.16,   // petites taches irrégulières
    clouds: 0.016,  // nuages doux (irrégularité du papier)
    fibers: 0.09,   // fibres sombres
    light: 0.22,    // fibres claires
  };

  function makeGrain() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = Math.max(screen.width, window.innerWidth);
    const cssH = Math.max(screen.height, window.innerHeight);
    const W = Math.round(cssW * dpr);
    const H = Math.round(cssH * dpr);
    const rnd = Math.random;

    const canvas = document.createElement('canvas');
    canvas.className = 'grain';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    const ctx = canvas.getContext('2d');

    // 1. Grain fin : chaque pixel au hasard (cube : beaucoup de pixels clairs, quelques foncés)
    const img = ctx.createImageData(W, H);
    const d = img.data;
    const fine = GRAIN.fine * 255;
    for (let p = 0; p < d.length; p += 4) {
      const r = rnd();
      d[p] = 19; d[p + 1] = 21; d[p + 2] = 34;
      d[p + 3] = r * r * r * fine;
    }
    ctx.putImageData(img, 0, 0);

    // 2. Nuages doux : grands dégradés ronds, très légers, posés au hasard
    const area = W * H;
    for (let i = 0, n = area / 60000; i < n; i++) {
      const x = rnd() * W, y = rnd() * H, rad = (20 + rnd() * 90) * dpr;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, `rgba(19,21,34,${GRAIN.clouds * (0.4 + rnd() * 0.6)})`);
      g.addColorStop(1, 'rgba(19,21,34,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }

    // 3. Petites taches de tailles variées
    for (let i = 0, n = area / (2600 * dpr); i < n; i++) {
      ctx.fillStyle = `rgba(19,21,34,${GRAIN.specks * (0.3 + rnd() * 0.7)})`;
      ctx.beginPath();
      ctx.arc(rnd() * W, rnd() * H, (0.35 + rnd() * rnd() * 1.3) * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Fibres : petits traits courbes, sombres puis clairs, dans tous les sens
    function fibers(count, color, alpha) {
      ctx.lineCap = 'round';
      for (let i = 0; i < count; i++) {
        const x = rnd() * W, y = rnd() * H;
        const len = (3 + rnd() * 11) * dpr, a = rnd() * Math.PI * 2, bend = (rnd() - 0.5) * len * 0.8;
        const ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len;
        ctx.strokeStyle = `rgba(${color},${alpha * (0.3 + rnd() * 0.7)})`;
        ctx.lineWidth = (0.4 + rnd() * 0.5) * dpr;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + ex) / 2 - Math.sin(a) * bend, (y + ey) / 2 + Math.cos(a) * bend, ex, ey);
        ctx.stroke();
      }
    }
    fibers(area / (16000 * dpr), '19,21,34', GRAIN.fibers);
    fibers(area / (22000 * dpr), '255,255,255', GRAIN.light);

    return canvas;
  }

  // Générée quand le navigateur est libre, pour ne pas gêner l'entrée du titre
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
  idle(() => {
    let grain = makeGrain();
    document.body.appendChild(grain);
    // Fenêtre agrandie au-delà de la taille de l'écran (deux écrans) : on regénère
    window.addEventListener('resize', () => {
      if (window.innerWidth > parseFloat(grain.style.width) || window.innerHeight > parseFloat(grain.style.height)) {
        const next = makeGrain();
        grain.replaceWith(next);
        grain = next;
      }
    });
  });

  /* 6. CURSEUR ----------------------------------------------------------------
     Construit sur assets/cursor.svg : un pic de la vague du logo (Λ). La pointe est le point cliqué.
     Couleurs : un trait principal (bleu ; crème seulement sur fond foncé, pour rester visible)
     et deux échos toujours menthe, l'un à 80 %, l'autre à 40 % (ECHO). En mouvement,
     les échos traînent derrière, puis se replient dessous à l'arrêt.
     Le pic se transforme selon ce qui est survolé :
       default  : le pic, incliné comme une flèche de souris classique
       button   : tous les liens et boutons : le pic droit avec ses trois traits, comme dans le logo
       play     : « See showreel » et les vignettes de Works : le pic couché devient ▷, suivi de ses échos
       close    : un pic et son reflet forment une croix
       text     : un pic très étroit, comme un curseur de texte
       disabled : la vague à plat (pas de signal)
       clic     : le pic s'écrase légèrement
     Couleurs claires sur la vidéo, dans la lightbox et sur les sections data-theme="dark".
     Sur un élément : data-cursor="button|play|close|default" force l'état.
     Uniquement avec une souris : le tactile garde son comportement normal. */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (finePointer.matches) initCursor();

  function initCursor() {
    const TRAIL = [0.3, 0.17];  // retard des deux échos (1 = aucun retard)
    const MORPH = 0.24;         // vitesse de transformation entre deux formes
    const GAP = 3.6;            // écart entre les trois traits (comme le logo)
    const ECHO = [0.8, 0.4];    // opacité des deux échos menthe (couleur fixe, seule l'opacité varie)
    const TILT = -19;           // inclinaison du pic au repos, en degrés (le bord gauche devient vertical)

    // Le pic de assets/cursor.svg (84 × 90), ramené à ~20 px de haut, pointe en (0,0)
    const S = 0.247;
    const tip = [30.3342, 5.79028];
    const P = [[2.50073, 86.8088], tip, [80.6675, 86.8088]].map(([x, y]) => [(x - tip[0]) * S, (y - tip[1]) * S]);

    // Toutes les formes ont 5 points, pour pouvoir passer de l'une à l'autre en douceur
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const five = (a, b, c) => [a, mid(a, b), b, mid(b, c), c];
    const PEAK = five(P[0], P[1], P[2]);
    const rad = TILT * Math.PI / 180;
    const rotate = (pts) => pts.map(([px, py]) => [px * Math.cos(rad) - py * Math.sin(rad), px * Math.sin(rad) + py * Math.cos(rad)]);
    const SHAPES = {
      pointer: rotate(PEAK),                                                  // le pic incliné (repos)
      peak: PEAK,
      play: PEAK.map(([x, y]) => [-y * 0.75 + 4, x * 0.75]),                // le pic couché : ▷
      caret: [[-1.6, 10], [-0.8, 0], [0, -10], [0.8, 0], [1.6, 10]],
      flat: [[-10, 0], [-5, 0], [0, 0], [5, 0], [10, 0]],
      crossA: five([-6, 6], [0, 0], [6, 6]),                                 // Λ
      crossV: five([-6, -6], [0, 0], [6, -6]),                               // V : avec Λ, une croix
    };

    // Pour chaque état : forme, décalage et comportement de chaque trait.
    //   'trail' = traîne derrière, visible seulement en mouvement
    //   'fixed' = collé au pointeur, à son opacité ECHO
    //   'off'   = masqué
    const STATES = {
      default:  { main: 'pointer', e1: ['pointer', 0, -GAP, 'trail'], e2: ['pointer', 0, GAP, 'trail'] },
      button:   { main: 'peak', e1: ['peak', 0, -GAP, 'fixed'], e2: ['peak', 0, GAP, 'fixed'] },
      play:     { main: 'play', e1: ['play', -6, 0, 'fixed'], e2: ['play', -12, 0, 'fixed'] },
      close:    { main: 'crossA', e1: ['crossV', 0, 0, 'fixed'], e2: ['crossV', 0, 0, 'off'] },
      text:     { main: 'caret', e1: ['caret', 0, 0, 'off'], e2: ['caret', 0, 0, 'off'] },
      disabled: { main: 'flat', mainOpacity: 0.35, e1: ['flat', 0, 0, 'off'], e2: ['flat', 0, 0, 'off'] },
    };

    // --- Éléments -----------------------------------------------------------
    const NS = 'http://www.w3.org/2000/svg';
    const cursor = document.createElement('div');
    cursor.className = 'cursor is-hidden';
    cursor.setAttribute('aria-hidden', 'true');
    const svg = document.createElementNS(NS, 'svg');
    const mkPath = (cls) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('class', cls); svg.appendChild(p); return p; };
    // Ordre de dessin : échos dessous, puis le liseré de contraste, puis le trait principal.
    // Le liseré (plus épais, couleur opposée) garde le trait lisible sur n'importe quel fond,
    // par exemple sur le bouton crème « See showreel » quand la vidéo est en plein fond.
    const halo = { el: null };
    const layers = {
      e2: { el: mkPath('cursor__echo'), lag: TRAIL[1], echo: ECHO[1] },
      e1: { el: mkPath('cursor__echo'), lag: TRAIL[0], echo: ECHO[0] },
      main: { el: null, lag: 1 },
    };
    halo.el = mkPath('cursor__halo');
    layers.main.el = mkPath('cursor__main');
    cursor.append(svg);
    document.body.appendChild(cursor);

    // État courant de chaque trait (position, décalage, points, opacité), animé vers sa cible
    Object.values(layers).forEach((l) => {
      l.x = -100; l.y = -100; l.dx = 0; l.dy = 0; l.op = 0;
      l.pts = SHAPES.pointer.map((p) => p.slice());
    });

    let x = -100, y = -100;   // position de la souris
    let state = 'default';
    let down = false;
    let frame = 0;

    const INTERACTIVE = 'a[href], button, [role="button"], label[for], select, summary';
    const TEXT_FIELD = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';

    function stateFor(el) {
      if (!el || !el.closest) return { state: 'default' };
      if (el.closest('[disabled], [aria-disabled="true"]')) return { state: 'disabled' };
      if (el.closest(TEXT_FIELD)) return { state: 'text' };
      const explicit = el.closest('[data-cursor]');
      const interactive = el.closest(INTERACTIVE);
      // data-cursor l'emporte s'il est posé sur l'élément interactif lui-même (ou à l'intérieur)
      if (explicit && (!interactive || interactive.contains(explicit))) {
        return { state: explicit.dataset.cursor };
      }
      if (interactive) return { state: 'button' };
      return { state: 'default' };
    }

    // Mesures mises en cache (relues au défilement, au redimensionnement et quand la page change),
    // pour ne jamais forcer le navigateur à recalculer la mise en page pendant que la souris bouge.
    let heroBottom = 0;
    let disabledRects = [];
    function measure() {
      heroBottom = hero.getBoundingClientRect().bottom;
      disabledRects = Array.from(document.querySelectorAll(':disabled'), (el) => el.getBoundingClientRect());
    }

    const DARK_ZONE = '[data-theme="dark"], .site-header.is-dark-section';
    const isDark = (target) => lbOpen || (revealed && y < heroBottom) ||
      !!(target && target.closest && target.closest(DARK_ZONE));

    // Les contrôles désactivés laissent passer la souris (voir styles.css) : on les repère par leur position
    const overDisabled = () => disabledRects.some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);

    function update(target) {
      const found = overDisabled() ? { state: 'disabled' } : stateFor(target);
      const next = STATES[found.state] ? found.state : 'default';
      const dark = isDark(target);
      if (next === state && dark === cursor.classList.contains('is-dark')) return;
      state = next;
      cursor.dataset.state = state;
      cursor.classList.toggle('is-dark', dark);
      kick();
    }

    // La page change sous une souris immobile (lightbox, bascule du hero, défilement)
    function refresh() {
      measure();
      if (x < 0) return;
      update(document.elementFromPoint(x, y));
    }

    // --- Animation ------------------------------------------------------------
    const approach = (a, b, k) => a + (b - a) * k;
    // Tracé d'un trait, relatif à la souris (le conteneur, lui, est placé sur la souris)
    const pathOf = (l) => l.pts.map(([px, py], i) => (i ? 'L' : 'M') + (l.x - x + l.dx + px).toFixed(1) + ' ' + (l.y - y + l.dy + py).toFixed(1)).join('');
    const setPath = (el, d, cacheOwner) => { if (cacheOwner.d !== d) { cacheOwner.d = d; el.setAttribute('d', d); } };
    const setOpacity = (el, op, cacheOwner) => { const v = op.toFixed(2); if (cacheOwner.o !== v) { cacheOwner.o = v; el.style.opacity = v; } };

    function render() {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const still = reduceMotion.matches;
      const s = STATES[state];
      const squash = down ? 0.72 : 1;
      let moving = false;

      Object.entries(layers).forEach(([name, l]) => {
        const spec = name === 'main' ? [s.main, 0, 0, 'fixed'] : s[name];
        const [shape, tdx, tdy, follow] = spec;
        const fullOp = name === 'main' ? (s.mainOpacity ?? 1) : l.echo;
        const target = SHAPES[shape];
        const lag = still ? 1 : (follow === 'trail' ? l.lag : (name === 'main' ? 1 : 0.45));
        const morph = still ? 1 : MORPH;

        l.x = approach(l.x, x, lag);
        l.y = approach(l.y, y, lag);
        l.dx = approach(l.dx, tdx, morph);
        l.dy = approach(l.dy, tdy, morph);
        l.pts.forEach((p, i) => {
          p[0] = approach(p[0], target[i][0], morph);
          p[1] = approach(p[1], target[i][1] * squash, morph);
        });

        // Opacité : les échos « trail » n'apparaissent qu'en mouvement, selon la distance parcourue
        let op;
        if (follow === 'trail') op = still ? 0 : Math.min(1, Math.hypot(x - l.x, y - l.y) / 10) * fullOp;
        else op = follow === 'off' ? 0 : fullOp;
        l.op = approach(l.op, op, still ? 1 : 0.25);

        const d = pathOf(l);
        setPath(l.el, d, l);
        setOpacity(l.el, l.op, l);
        if (name === 'main') {
          setPath(halo.el, d, halo);
          setOpacity(halo.el, l.op, halo);
        }

        if (Math.abs(x - l.x) > 0.05 || Math.abs(y - l.y) > 0.05 || Math.abs(l.op - op) > 0.005 ||
            Math.abs(l.dx - tdx) > 0.05 || Math.abs(l.dy - tdy) > 0.05 ||
            l.pts.some((p, i) => Math.abs(p[0] - target[i][0]) > 0.05 || Math.abs(p[1] - target[i][1] * squash) > 0.05)) {
          moving = true;
        }
      });

      frame = moving ? requestAnimationFrame(render) : 0;
    }
    const kick = () => { if (!frame) frame = requestAnimationFrame(render); };

    // --- Événements -----------------------------------------------------------
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (x < 0) {
        // Premier mouvement : les traits partent de la souris, le curseur du système s'efface
        Object.values(layers).forEach((l) => { l.x = e.clientX; l.y = e.clientY; });
        document.documentElement.classList.add('has-cursor');
      }
      x = e.clientX;
      y = e.clientY;
      cursor.classList.remove('is-hidden');
      update(e.target);
      kick();
    }, { passive: true });

    document.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') { cursor.classList.add('is-hidden'); return; }
      down = true;
      kick();
    });
    document.addEventListener('pointerup', () => { down = false; kick(); });
    // Sortie de la fenêtre : le curseur s'efface
    document.documentElement.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    window.addEventListener('blur', () => cursor.classList.add('is-hidden'));

    document.addEventListener('cursor:refresh', () => requestAnimationFrame(refresh));
    let scrollTick = 0;
    const scheduleRefresh = () => {
      cancelAnimationFrame(scrollTick);
      scrollTick = requestAnimationFrame(refresh);
    };
    window.addEventListener('scroll', scheduleRefresh, { passive: true });
    window.addEventListener('resize', scheduleRefresh);
    measure();

    // Souris débranchée / passage en tactile : on rend le curseur du système
    finePointer.addEventListener('change', () => {
      if (!finePointer.matches) {
        cursor.remove();
        document.documentElement.classList.remove('has-cursor');
      }
    });
  }

  /* 7. CONTACT : E-MAIL ET GRANDE VAGUE ---------------------------------------- */
  // L'adresse e-mail se copie au clic (« copy » devient « copied »).
  // Si la copie est impossible, on ouvre le logiciel de messagerie à la place.
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const label = btn.querySelector('.contact__copy');
    let timer = 0;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = 'copied';
        playSound('copy');
        clearTimeout(timer);
        timer = setTimeout(() => { label.textContent = 'copy'; }, 1800);
      } catch (err) {
        window.location.href = 'mailto:' + btn.dataset.copy;
      }
    });
  });

  /* La vague du logo, en grand, en bas de la section Contact (canvas).
     - à l'arrivée sur la section, elle se déplie depuis une ligne plate ;
     - elle ondule doucement en permanence, et s'amplifie sous la souris ;
     - seule la vague elle-même est cliquable (le curseur passe en mode bouton dessus) ;
     - un clic la pince comme une corde : elle vibre, ses trois traits s'écartent puis se rejoignent,
       un halo menthe s'ouvre au point touché et deux ondes partent vers les côtés ;
     - tant que le son wave-pluck joue (durée lue dans le fichier), on ne peut pas la pincer à nouveau.
     Elle ne tourne que lorsque la section est visible. Mouvement réduit : dessin fixe, son seul.
     Réglages : WAVE ci-dessous. */
  const WAVE = {
    period: 112,     // largeur d'un aller-retour du zigzag (px)
    gap: 12,         // écart entre les trois traits
    bottom: 120,     // distance entre la vague et le bas de la section
    base: 12,        // amplitude au repos
    hover: 54,       // amplitude ajoutée sous la souris
    radius: 240,     // largeur de la zone amplifiée sous la souris
    hit: 44,         // zone cliquable : distance maximale à la vague (px, au-dessus et au-dessous)
    pluck: 62,       // amplitude de la vibration au point pincé
    freq: 3.2,       // vitesse de vibration (allers-retours par seconde)
    ring: 42,        // amplitude des ondes qui partent vers les côtés
    fallback: 2.2,   // durée de l'animation si le son est coupé ou absent (s)
    speed: 0.32,     // vitesse de défilement
    lines: [         // du haut vers le bas, comme le logo : menthe, puis crème
      'rgba(41,227,190,.9)',
      'rgba(255,247,221,.4)',
      'rgba(255,247,221,.85)',
    ],
  };
  const contact = document.querySelector('.contact');
  if (contact) initWaves(contact);

  function initWaves(section) {
    const canvas = section.querySelector('.contact__waves');
    const ctx = canvas.getContext('2d');
    const still = () => reduceMotion.matches;
    let W = 0, H = 0;
    let visible = false, frame = 0, last = 0;
    let phase = 0, intro = 0, hover = 0, px = 0, targetX = 0, inside = false;
    let pointer = null;   // dernière position de la souris (écran), convertie au prochain dessin
    let localY = -1e4;    // hauteur de la souris dans la section
    let pluck = null;     // pincement en cours : { x, t, dur }
    let armed = false;    // la souris est sur la vague et un pincement est possible

    // Zigzag de -1 à 1 (même forme que la vague du logo)
    const tri = (u) => 1 - 4 * Math.abs(Math.round(u) - u);
    const baseY = () => H - WAVE.bottom;
    const nearWave = (y) => Math.abs(y - baseY()) < WAVE.hit;
    const locked = (now) => !!pluck && now < pluck.t + pluck.dur * 1000;

    // Sur la vague (et pincement possible) : le curseur passe en mode bouton
    function setArmed(on) {
      if (on === armed) return;
      armed = on;
      if (on) section.dataset.cursor = 'button';
      else delete section.dataset.cursor;
      document.dispatchEvent(new Event('cursor:refresh'));
    }

    function readPointer() {
      if (!pointer) return;
      const r = section.getBoundingClientRect();
      targetX = pointer.x - r.left;
      localY = pointer.y - r.top;
      pointer = null;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = section.clientWidth;
      H = section.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!px) px = targetX = W * 0.5; // bosse de repos au centre, sous le texte centré
      if (still() || !frame) draw(performance.now());
    }

    function draw(now) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const t = now / 1000;
      const calm = still();
      readPointer();
      setArmed(inside && nearWave(localY) && !locked(now));
      if (pluck && !locked(now)) pluck = null;

      if (calm) { intro = 1; hover = 0; }
      else {
        phase += dt * WAVE.speed;
        intro = Math.min(1, intro + dt / 1.8);
        hover += ((inside ? (armed ? 1 : 0.45) : 0) - hover) * 0.08;
        px += (targetX - px) * 0.12;
      }
      const unfold = 1 - Math.pow(1 - intro, 3);
      const by = baseY();

      // Pincement : âge, avancement (0 → 1) et énergie restante
      let age = 0, life = 1, energy = 0;
      if (pluck && !calm) {
        age = (now - pluck.t) / 1000;
        life = Math.min(1, age / pluck.dur);
        energy = Math.exp(-3 * life) * (1 - life);
      }

      ctx.clearRect(0, 0, W, H);

      // Halo menthe qui s'ouvre au point pincé
      if (energy > 0.002) {
        const rad = 40 + 300 * Math.sqrt(life);
        const g = ctx.createRadialGradient(pluck.x, by, 0, pluck.x, by, rad);
        g.addColorStop(0, `rgba(41,227,190,${0.3 * energy})`);
        g.addColorStop(1, 'rgba(41,227,190,0)');
        ctx.fillStyle = g;
        ctx.fillRect(pluck.x - rad, by - rad, rad * 2, rad * 2);
      }

      // Points de chaque trait : les sommets du zigzag, plus 3 points entre deux sommets
      // (pour que la vibration se courbe en douceur), décalés par le défilement
      const half = WAVE.period / 2;
      const step = half / 4;
      const offset = ((phase * WAVE.period) % half + half) % half;
      const xs = [];
      for (let x = -half + offset; x <= W + half; x += step) xs.push(x);

      const amps = [], envs = [];
      xs.forEach((x) => {
        let a = WAVE.base * (1 + 0.3 * Math.sin(t * 0.9 + x / 380));
        a += WAVE.hover * hover * Math.exp(-(((x - px) / WAVE.radius) ** 2));
        let env = 0;
        if (energy > 0.002) {
          // deux ondes qui partent vers les côtés
          const ring = Math.abs(x - pluck.x) - age * 620;
          a += WAVE.ring * Math.exp(-((ring / 110) ** 2)) * (1 - life);
          // la zone qui vibre s'élargit avec le temps
          env = Math.exp(-(((x - pluck.x) / (120 + 700 * life)) ** 2));
        }
        amps.push(a * unfold);
        envs.push(env);
      });

      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      WAVE.lines.forEach((color, i) => {
        // chaque trait vibre avec un léger décalage : les trois traits s'écartent puis se rejoignent
        const swing = energy > 0.002 ? Math.sin(2 * Math.PI * WAVE.freq * age - i * 0.75) : 0;
        ctx.strokeStyle = color;
        ctx.shadowColor = 'rgba(41,227,190,.8)';
        ctx.shadowBlur = i === 0 ? 18 * energy : 0; // lueur sur le trait menthe pendant la vibration
        ctx.beginPath();
        xs.forEach((x, k) => {
          const spread = (i - 1) * WAVE.gap * (1 + 1.6 * energy * envs[k]);
          const y = by + spread + amps[k] * tri(x / WAVE.period - phase) + WAVE.pluck * energy * envs[k] * swing;
          if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        });
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
    }

    function loop(now) {
      draw(now);
      frame = visible && !still() ? requestAnimationFrame(loop) : 0;
    }
    const start = () => { if (!frame && visible && !still()) { last = 0; frame = requestAnimationFrame(loop); } };

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else { inside = false; setArmed(false); }
    }, { threshold: 0 }).observe(section);

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(section);
    else window.addEventListener('resize', resize);
    resize();

    section.addEventListener('pointermove', (e) => {
      pointer = { x: e.clientX, y: e.clientY }; // lu au prochain dessin
      inside = true;
      if (still()) draw(performance.now()); // pas de boucle en mouvement réduit
    }, { passive: true });
    section.addEventListener('pointerleave', () => { inside = false; setArmed(false); });
    section.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a, button')) return;
      const now = performance.now();
      const r = section.getBoundingClientRect();
      if (!nearWave(e.clientY - r.top) || locked(now)) return; // seulement sur la vague, et pas pendant le son
      pluck = { x: e.clientX - r.left, t: now, dur: soundDuration('wave-pluck') || WAVE.fallback };
      playSound('wave-pluck');
      setArmed(false);
      start();
    });
    reduceMotion.addEventListener('change', () => { if (still()) draw(performance.now()); else start(); });
  }

  /* 8. SONS : BOUTON, SURVOLS, CLICS -------------------------------------------
     Bouton du header [data-sound-toggle] : coupe / réactive les sons (choix mémorisé dans le navigateur).
     Son annotation (« sound on » / « sound off ») suit l'état.
     Les vidéos (hero, lightbox) ne dépendent pas de ce bouton : le film de la lightbox garde son propre son.
     Les navigateurs bloquent tout son avant le premier clic ou la première touche du visiteur. */
  const soundToggle = document.querySelector('[data-sound-toggle]');
  const soundState = soundToggle && soundToggle.querySelector('.sound-toggle__state');
  const STORE_KEY = 'orikawa-sound';

  function setSound(on) {
    sfx.on = on;
    if (soundToggle) {
      soundToggle.setAttribute('aria-pressed', String(on));
      soundState.textContent = on ? 'on' : 'off';
    }
    try { localStorage.setItem(STORE_KEY, on ? 'on' : 'off'); } catch (err) { /* stockage indisponible */ }
    if (on) Object.keys(SOUNDS).forEach(loadSound); // préchargement
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      if (sfx.on) { playSound('toggle-off'); setSound(false); }
      else { setSound(true); playSound('toggle-on'); }
    });
  }

  // Survols : un son par élément survolé (vignette, bulle de compétence, ou lien / bouton)
  let hoverEl = null;
  document.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.target.closest('.work__media, .bubble, a[href], button');
    if (el === hoverEl) return;
    hoverEl = el;
    if (!el || el.matches('[data-showreel]')) return; // « See showreel » a son propre son (hero-reveal)
    if (el.matches('.work__media')) playSound('card-hover');
    else if (el.matches('.bubble')) playSound('bubble-' + ((Array.from(el.parentElement.children).indexOf(el) % 6) + 1));
    else playSound('ui-hover');
  });

  // Clics : ui-click sur chaque lien ou bouton (filtres, vignettes, lightbox compris).
  // Seul le bouton des sons a ses propres sons (toggle-on / toggle-off).
  document.addEventListener('click', (e) => {
    const el = e.target.closest('a[href], button');
    if (el && !el.matches('[data-sound-toggle]')) playSound('ui-click');
  });

  // État de départ : actif, sauf si le visiteur a coupé le son lors d'une visite précédente
  let stored = null;
  try { stored = localStorage.getItem(STORE_KEY); } catch (err) { /* stockage indisponible */ }
  setSound(stored !== 'off');
})();
