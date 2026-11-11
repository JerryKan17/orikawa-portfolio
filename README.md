# orikawa laurentin — site

Étape 3 : hero, lightbox, Works et About. La section Contact est encore un emplacement.

## Ouvrir le projet dans VS Code

1. Décompresse le dossier, puis dans VS Code : Fichier > Ouvrir le dossier.
2. Installe l'extension **Live Server** (Ritwick Dey).
3. Clic droit sur `index.html` > **Open with Live Server**. La page se recharge à chaque enregistrement.

## Fichiers

- `index.html` : la structure.
- `styles.css` : les variables en haut (couleurs, polices, espacements, durées) puis le style de chaque partie.
- `main.js` : la vague des boutons, le titre qui remplit la largeur, la bascule du hero, la lightbox, les filtres de Works, le header, l'apparition au scroll, le grain de papier, le curseur.
- `assets/` : tes vidéos et images (voir `assets/LISEZ-MOI.txt`).

## À faire de ton côté

1. **Polices Adobe** : crée un « Web project » sur fonts.adobe.com avec Effra et Emily Austin, colle la balise `<link>` dans `index.html` (emplacement indiqué), puis vérifie dans `styles.css` les noms `--font-title` et `--font-script` et la graisse Heavy (800).
   En attendant : Figtree remplace Effra, Caveat remplace Emily Austin, EB Garamond est la vraie police du corps.
2. **Vidéos** : pour l'instant, on garde le dégradé animé. La boucle du hero (`assets/hero-loop.mp4`), le showreel (`assets/showreel.mp4`), les films des projets et le rangement des assets viendront plus tard. Tant qu'une vidéo est absente, la lightbox affiche « coming soon ».
4. **Textes provisoires d'About** : l'accroche, le second paragraphe (entre crochets), la note sous le titre et la liste des compétences sont à réécrire. Ajoute aussi la photo du studio (`--photo`) et un GIF par bulle (`--gif`), voir la section About ci-dessous.
5. **Projets de Works** : remplace les noms « Project 02 » à « Project 05 », les types, et les textes `[1–2 lines]` (voir la section Works ci-dessous). Même chose pour les textes du showreel, sur le bouton « See showreel ».
3. **Vague des boutons** : modifie `ZIGZAG` dans `main.js` ou remplace `makeWave()` par la vague exportée de Figma.

## Direction artistique (telle qu'appliquée dans le code)

- **Couleurs** : crème `#FFF7DD` (fond), nuit `#131522` (texte), bleu `#323A72` (texte secondaire), menthe `#29E3BE` (accent, uniquement sur fond foncé). Jaune et magenta : sur la planche, pas encore utilisés.
- **Typographies** : Effra (titres, boutons, interface), EB Garamond (corps de texte, note du hero en italique), Emily Austin (touche manuscrite, rappel vers laurentinriviere.com).
- **Motif** : la vague à 3 traits du logo (nuit, bleu, menthe), reprise sous les boutons au survol.
- **Formes** : pastilles (boutons), coins arrondis 16 px pour les médias, et le pic Λ de la vague (`assets/cursor.svg`) pour le curseur.
- **Matière** : grain de papier léger et fixe (il ne bouge pas au défilement), sans motif répété : il est tiré au hasard une fois au chargement, à plusieurs échelles (grain fin, petites taches, nuages très doux, fibres sombres et claires). Il couvre les fonds crème et s’efface sur la vidéo ; la lightbox passe par-dessus. Réglages : objet `GRAIN` dans `main.js` (section 5).
- **Curseur** : construit sur `assets/cursor.svg`, un pic de la vague du logo. La pointe est le point cliqué ; au repos, le pic est incliné comme une flèche de souris classique. Couleurs fixes : un trait principal bleu (crème seulement sur la vidéo et dans la lightbox, pour rester visible) et deux échos toujours menthe, l'un à 80 %, l'autre à 40 %. Sous le trait principal, un liseré de contraste (crème sur fond clair, nuit sur fond foncé) le garde lisible sur n'importe quel fond, par exemple sur le bouton crème « See showreel ». En mouvement, les échos traînent derrière, puis se replient sous le trait à l'arrêt. Pas de texte à côté du curseur. Seulement avec une souris : sur tactile, rien ne change.

| État | Quand | Rendu |
|---|---|---|
| default | partout | le pic incliné |
| link | liens | le pic se déplie en vague |
| button | boutons | le pic droit avec ses trois traits, comme dans le logo |
| play | « See showreel », vignettes de Works | le pic couché devient ▷, suivi de ses deux échos |
| close | dans la lightbox, en dehors du panneau | un pic et son reflet forment une croix |
| text | champs de saisie | un pic très étroit, comme un curseur de texte |
| disabled | éléments désactivés | la vague à plat (pas de signal) |
| pressed | pendant le clic | le pic s'écrase |
| hidden | souris hors de la fenêtre | fondu |

Pour forcer un état sur un élément : `data-cursor="play"` (ou `close`, `default`). Réglages dans `main.js` (section 6) : `TILT` (inclinaison au repos), `ECHO` (opacité des échos), `TRAIL` (retard des échos), `MORPH` (vitesse de transformation), `GAP` (écart entre les traits), `SHAPES` et `STATES` (formes de chaque état).

## Works

Version dense : un film mis en avant (vignette à gauche, nom, type, Brief, Concept, Tools et bouton « Play the film » à droite), puis les autres projets en petites vignettes, 4 par ligne (2 sous 1080 px). Filtres en chips (All, Explainer, Product, Sound design). Chaque vignette ouvre la lightbox : la vidéo, puis la légende du wireframe (nom et type à gauche, puis Brief, Concept, Tools).

Chaque projet est un `<li class="work">` dans `index.html` :
- `.work__name` et `.work__meta` : le nom et le type, affichés sous la vignette et repris dans la lightbox ;
- `data-type` : les catégories pour les filtres (`explainer`, `product`, `sound`), séparées par des espaces ;
- `data-video` et `data-poster` : la vidéo de la lightbox (avec le son) et son image d'attente ;
- `data-brief`, `data-concept`, `data-tools` : les trois textes de la légende (1 à 2 lignes). Pour le film mis en avant, ces textes sont écrits directement dans ses `<dd data-fact="…">`, visibles sur la page ;
- `style="--poster: url(assets/…)"` sur `.work__poster` : l'image de la vignette (en attendant, un dégradé aux couleurs de la marque).

Pour ajouter un filtre : un bouton `<button class="chip" data-filter="motcle">`, et `motcle` dans le `data-type` des projets concernés.

## About

Même en-tête que Works (titre et note en annotation). Photo du studio à gauche, avec une légende manuscrite ; à droite, une accroche, le texte, puis les compétences en bulles. Au survol ou au focus clavier d'une bulle, son GIF apparaît au-dessus.
- Photo : `style="--photo: url(assets/…)"` sur `.about__frame` (format 4:5), puis retire le texte « studio photo ».
- GIF d'une bulle : `style="--gif: url(assets/…)"` sur son `.bubble__gif` (format 4:3).
- Ajouter une compétence : copie une ligne `<li class="bubble">`.

## Logo

Le logo du header est une copie en ligne de `assets/logo.svg`, dans `index.html`, pour que ses couleurs suivent le header (crème sur la vidéo). Si tu modifies le logo, ré-exporte le SVG puis recopie les tracés dans `index.html`.

## Ce qui est une proposition (à valider)

- Hauteur du header 88 px. Fond crème légèrement translucide dès que la page défile, filet une fois le hero passé.
- Entrée du titre au chargement : chaque ligne monte, se révèle (flou → net) et se resserre, l'une après l'autre ; la note et le bouton suivent en fondu.
- Lightbox (showreel et projets) : fond nuit flouté, vidéo 16:9 la plus grande possible avec la légende dessous. Se ferme en cliquant en dehors, avec Échap, Retour arrière ou le bouton Précédent du navigateur.
- Appel vers Works dans le bas du hero : « Explore works » et une flèche qui descend doucement (pointe avec un écho menthe). Au survol, le texte se souligne au dégradé du hero ; il s'efface quand la vidéo passe en plein fond, comme la note.
- Works : film mis en avant avec ses infos à côté, autres projets en petites vignettes 16:9 sur 4 colonnes, nom souligné au dégradé du hero au survol de la vignette.
- About : photo 4:5 à gauche, texte à droite, bulles de compétences avec aperçu GIF au survol.
- Soulignement des liens de navigation au survol, aux couleurs du dégradé du hero.
- Boutons : petits et texte centré au repos, la pastille s'agrandit vers le bas au survol pour laisser la place à la vague.
- Titre du hero : au plus 86 % de la largeur utile (`TITLE_WIDTH` dans `main.js`), centré entre le header et le bas du hero.
- Durées : 150 ms, 250 ms, 600 ms. Apparition au scroll : montée de 24 px, décalage de 80 ms.
- Zoom de la vidéo de 1,06 vers 1 au survol du showreel.
- Couleurs jaune et magenta : présentes sur ta planche, non utilisées pour l'instant.

## Prochaines étapes

Contenus réels (projets, textes, photo, GIF) > Contact et footer > finitions > version téléphone.
