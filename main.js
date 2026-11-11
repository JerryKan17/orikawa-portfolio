/* orikawa laurentin · main.js
   1. Vague des boutons   2. Hero (titre ajusté, bascule au survol)   2b. Lightbox   2c. Filtres de Works
   3. Header   4. Apparition au scroll   5. Grain de papier   6. Curseur */
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
       - sur l'élément cliqué (data-title, data-meta, data-video…),
       - sinon sur le projet qui le contient (<li class="work">, avec .work__name et .work__meta).
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
    const work = trigger.closest('.work');
    const read = (key) => trigger.dataset[key] || (work && work.dataset[key]) || '';
    const text = (sel) => (work && work.querySelector(sel) ? work.querySelector(sel).textContent.trim() : '');
    return {
      title: read('title') || text('.work__name'),
      meta: read('meta') || text('.work__meta'),
      video: read('video'),
      poster: read('poster'),
      brief: read('brief'),
      concept: read('concept'),
      tools: read('tools'),
    };
  }

  function showMissing() {
    lbVideo.hidden = true;
    lbMissing.hidden = false;
  }

  function loadFilm(film) {
    const token = ++lbToken;
    lbFields.forEach((el) => { el.textContent = film[el.dataset.field] || ''; });
    lbMissing.hidden = true;
    lbVideo.hidden = false;
    if (film.poster) lbVideo.poster = film.poster; else lbVideo.removeAttribute('poster');
    if (!film.video) { showMissing(); return; }
    // Vidéo absente (pas encore ajoutée) : message à la place
    lbVideo.addEventListener('error', () => { if (token === lbToken) showMissing(); }, { once: true });
    lbVideo.src = film.video;
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

  document.querySelectorAll('[data-film]').forEach((el) => {
    el.addEventListener('click', () => openLightbox(el));
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
     Chaque chip [data-filter] garde les projets dont data-type contient la catégorie. */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const works = document.querySelectorAll('.work');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      works.forEach((w) => {
        const show = f === 'all' || w.dataset.type.split(/\s+/).includes(f);
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
       link     : le pic se déplie en vague
       button   : le pic droit avec ses trois traits, comme dans le logo
       play     : le pic couché devient un triangle de lecture, suivi de ses deux échos
       close    : un pic et son reflet forment une croix
       text     : un pic très étroit, comme un curseur de texte
       disabled : la vague à plat (pas de signal)
       clic     : le pic s'écrase légèrement
     Sur un élément : data-cursor="play|close|default" force l'état.
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
      wave: [[-12, 3], [-6, 12], [0, 3], [6, 12], [12, 3]],                 // le pic déplié
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
      link:     { main: 'wave', e1: ['wave', 0, -GAP, 'trail'], e2: ['wave', 0, GAP, 'trail'] },
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
    // Ordre de dessin : échos dessous, trait principal dessus
    const layers = {
      e2: { el: mkPath('cursor__echo'), lag: TRAIL[1], echo: ECHO[1] },
      e1: { el: mkPath('cursor__echo'), lag: TRAIL[0], echo: ECHO[0] },
      main: { el: mkPath('cursor__main'), lag: 1 },
    };
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
      if (interactive) {
        const isButton = interactive.matches('button, [role="button"], .btn');
        return { state: isButton ? 'button' : 'link' };
      }
      return { state: 'default' };
    }

    const isDark = () => lbOpen || (revealed && y < hero.getBoundingClientRect().bottom);

    // Les contrôles désactivés laissent passer la souris (voir styles.css) : on les repère par leur position
    function overDisabled() {
      for (const el of document.querySelectorAll(':disabled')) {
        const r = el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
      }
      return false;
    }

    function update(target) {
      const found = overDisabled() ? { state: 'disabled' } : stateFor(target);
      const next = STATES[found.state] ? found.state : 'default';
      const dark = isDark();
      if (next === state && dark === cursor.classList.contains('is-dark')) return;
      state = next;
      cursor.dataset.state = state;
      cursor.classList.toggle('is-dark', dark);
      kick();
    }

    // La page change sous une souris immobile (lightbox, bascule du hero, défilement)
    function refresh() {
      if (x < 0) return;
      update(document.elementFromPoint(x, y));
    }

    // --- Animation ------------------------------------------------------------
    const approach = (a, b, k) => a + (b - a) * k;
    const pathOf = (l) => l.pts.map(([px, py], i) => (i ? 'L' : 'M') + (l.x + l.dx + px).toFixed(2) + ' ' + (l.y + l.dy + py).toFixed(2)).join('');

    function render() {
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

        l.el.setAttribute('d', pathOf(l));
        l.el.style.opacity = l.op.toFixed(3);

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
    window.addEventListener('scroll', () => {
      cancelAnimationFrame(scrollTick);
      scrollTick = requestAnimationFrame(refresh);
    }, { passive: true });

    // Souris débranchée / passage en tactile : on rend le curseur du système
    finePointer.addEventListener('change', () => {
      if (!finePointer.matches) {
        cursor.remove();
        document.documentElement.classList.remove('has-cursor');
      }
    });
  }
})();
