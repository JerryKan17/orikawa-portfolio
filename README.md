# orikawa laurentin — site

Toutes les sections sont en place : hero, Works, About, Contact, lightbox. Il reste à remplacer les contenus provisoires (voir « À faire de ton côté ») et à soigner la version téléphone.

## Ouvrir le projet dans VS Code

1. Décompresse le dossier, puis dans VS Code : Fichier > Ouvrir le dossier.
2. Installe l'extension **Live Server** (Ritwick Dey).
3. Clic droit sur `index.html` > **Open with Live Server**. La page se recharge à chaque enregistrement.

## Fichiers

- `index.html` : la structure. Chaque section commence par un commentaire qui explique comment la remplir.
- `styles.css` : les variables en haut (couleurs, polices, espacements, durées) puis le style de chaque partie.
- `main.js` : la vague des boutons, le titre qui remplit la largeur, la bascule du hero, la lightbox, les filtres de Works, le header (section en cours), l'apparition au scroll, le grain de papier, le curseur, la section Contact (e-mail, grande vague), les sons.
- `assets/` : tes vidéos et images (voir `assets/LISEZ-MOI.txt`).

## À faire de ton côté

1. **Polices Adobe** : vérifie dans `styles.css` les noms `--font-title` et `--font-script` et la graisse Heavy (800) d'Effra.
2. **Vidéos** : pour l'instant, on garde le dégradé animé. La boucle du hero (`assets/hero-loop.mp4`), le showreel (`assets/showreel.mp4`) et les films des projets viendront plus tard. Tant qu'une vidéo est absente, la lightbox affiche « coming soon ».
3. **Works** : remplace les noms « Project 02 » à « Project 05 », les types, la description (lorem ipsum) du film mis en avant et les textes `[1–2 lines]` de la lightbox. Même chose pour les textes du showreel, sur le bouton « See showreel ».
4. **Filtres de Works** : « All », « DSP », « Music » et « Other ». Range chaque projet dans sa ou ses catégories avec `data-type` (voir la section Works ci-dessous).
5. **About** : la note sous le titre, l'accroche, le lorem ipsum et la liste des compétences sont à réécrire. Ajoute la photo du studio (`--photo`) et un GIF par bulle (`--gif`).
6. **Contact** : remplace `hello@example.com` (3 endroits dans la section : `href`, `data-copy` et le texte affiché). Les liens Instagram et WhatsApp seront ajoutés plus tard.
7. **Sons** : les fichiers sont en place ; la liste à jour (sons branchés et sons retirés) est dans `assets/sounds/LISTE-DES-SONS.md`.
8. **Vague des boutons** : modifie `ZIGZAG` dans `main.js` ou remplace `makeWave()` par la vague exportée de Figma.

## Direction artistique (telle qu'appliquée dans le code)

- **Couleurs** : crème `#FFF7DD` (fond), sable `#F6EAC4` (fond d'About), nuit `#131522` (texte, fond de Contact et du footer), bleu `#323A72` (texte secondaire), menthe `#29E3BE` (accent). Jaune et magenta : sur la planche, pas encore utilisés.
- **Passage d'une section à l'autre** : Works sur crème, About glisse doucement vers le sable, puis tout en bas du sable vers la nuit (en passant par le bleu) pour amener Contact. Pas de filet entre les sections.
- **Typographies** : Effra (titres, boutons, interface), EB Garamond (corps de texte, annotations en italique), Emily Austin (touches manuscrites).
- **Annotations** : phrases en EB Garamond italique, couleur douce, sans trait devant (note du hero, notes sous les titres, types des projets). Touches manuscrites en Emily Austin (légende de la photo, « copy », lien du footer). Tailles réglables en haut de `styles.css` : `--note-size` et `--script-size`. Le bouton « sound on / off » est en Effra.
- **Motif** : la vague à 3 traits du logo (menthe, bleu, nuit) :
  - sous les boutons au survol ;
  - en fines bandes qui défilent lentement entre les sections (bords en fondu ; version claire sur fond foncé) ;
  - en grand, en bas de la section Contact (voir plus bas).
- **Formes** : pastilles (boutons, filtres, bulles), coins arrondis 8 et 16 px pour les médias, et le pic Λ de la vague (`assets/cursor.svg`) pour le curseur.
- **Matière** : grain de papier léger et fixe, sans motif répété, tiré au hasard une fois au chargement. Il couvre les fonds clairs et s'efface sur la vidéo du hero et sur les sections foncées. Réglages : objet `GRAIN` dans `main.js` (section 5).
- **Curseur** : construit sur `assets/cursor.svg`, un pic de la vague du logo. La pointe est le point cliqué ; au repos, le pic est incliné comme une flèche de souris classique. Trait principal bleu (crème sur la vidéo, dans la lightbox et sur les sections foncées), deux échos toujours menthe (80 % et 40 %), et un liseré de contraste qui le garde lisible sur n'importe quel fond. En mouvement, les échos traînent derrière. Seulement avec une souris.

| État | Quand | Rendu |
|---|---|---|
| default | partout | le pic incliné |
| link | liens, bulles d'About | le pic se déplie en vague |
| button | boutons | le pic droit avec ses trois traits, comme dans le logo |
| play | « See showreel », vignettes de Works | le pic couché devient ▷, suivi de ses deux échos |
| close | dans la lightbox, en dehors du panneau | un pic et son reflet forment une croix |
| text | champs de saisie | un pic très étroit, comme un curseur de texte |
| disabled | éléments désactivés | la vague à plat (pas de signal) |
| pressed | pendant le clic | le pic s'écrase |
| hidden | souris hors de la fenêtre | fondu |

Pour forcer un état sur un élément : `data-cursor="play"` (ou `close`, `link`, `default`). Réglages dans `main.js` (section 6) : `TILT`, `ECHO`, `TRAIL`, `MORPH`, `GAP`, `SHAPES` et `STATES`.

## Sons

Tous les sons de l'interface sont branchés dans `main.js` (moteur en section 0, déclencheurs en section 8). Ils sont actifs par défaut : le visiteur peut les couper avec le bouton « vague » du header, à gauche de « Start a project ». Le bouton est annoté « sound on » / « sound off » (italique, comme les notes du site) ; ses traits ondulent comme un égaliseur quand le son est actif et passent à plat quand il est coupé. Le choix est mémorisé. `ui-click` joue à chaque clic sur un lien ou un bouton. Un fichier absent est ignoré. Les vidéos ne dépendent pas de ce bouton.

Réglages : objet `SOUNDS` (volume de chaque son, délai minimum entre deux lectures) et `MASTER` (volume général). La liste : `assets/sounds/LISTE-DES-SONS.md`.

## Header

- Fond crème dès que la page défile, filet une fois le hero passé.
- Le lien de la section en cours (Works, About, Contact) garde un soulignement discret.
- Sur les sections foncées (Contact, footer : `data-theme="dark"`), le header passe en nuit avec un texte crème.

## Works

Un film mis en avant (vignette à gauche ; à droite le nom, le type, une courte description et le bouton « Play the film »), puis les autres projets en petites vignettes, 4 par ligne (2 sous 1080 px). Filtres en chips : All, DSP, Music, Other. Chaque vignette ouvre la lightbox : la vidéo, puis la légende (nom et type, puis Brief, Concept, Tools).

Chaque projet est un `<li class="work">` dans `index.html` :
- `.work__name` et `.work__meta` : le nom et le type, affichés sous la vignette et repris dans la lightbox ;
- `.work__desc` (film mis en avant seulement) : la courte description ;
- `data-type` : les catégories pour les filtres (`dsp`, `music`, `other`), séparées par des espaces ;
- `data-video` et `data-poster` : la vidéo de la lightbox (avec le son) et son image d'attente ;
- `data-brief`, `data-concept`, `data-tools` : les trois textes de la légende de la lightbox (1 à 2 lignes) ;
- `style="--poster: url(assets/…)"` sur `.work__poster` : l'image de la vignette (en attendant, un dégradé aux couleurs de la marque).

Pour ajouter un filtre : un bouton `<button class="chip" type="button" data-filter="motcle" aria-pressed="false">Mot clé</button>` à côté des autres, et `motcle` dans le `data-type` des projets concernés.

## About

Photo du studio (4:5, légende manuscrite) et texte côte à côte, la colonne de texte gardant une largeur de lecture confortable ; puis les compétences en bulles, sur une seule ligne (elles passent à la ligne sous 1080 px ; photo et texte s'empilent sous 960 px). Au survol ou au focus clavier d'une bulle, son GIF apparaît au-dessus.
- Photo : `style="--photo: url(assets/…)"` sur `.about__frame`, puis retire le texte « studio photo ».
- GIF d'une bulle : `style="--gif: url(assets/…)"` sur son `.bubble__gif` (format 4:3).
- Ajouter une compétence : copie une ligne `<li class="bubble">`.

## Contact

Dernière section, sur fond nuit, centrée : grand titre « Let's unfold / your next film. » (la seconde ligne en dégradé menthe et crème), une phrase, le bouton « Start a project » (ouvre la messagerie) et l'adresse e-mail, qui se copie au clic (« copy » devient « copied »).

L'effet : la vague du logo, en grand, en bas de la section (dessinée en canvas par `main.js`, section 7) :
- à l'arrivée sur la section, elle se déplie depuis une ligne plate ;
- elle ondule doucement en permanence ;
- sous la souris, elle s'amplifie localement ;
- un clic dans la section y lance une onde qui part vers les côtés.

Elle ne tourne que lorsque la section est visible ; avec le mouvement réduit, elle reste fixe. Réglages : objet `WAVE` dans `main.js`.

## Logo

Le logo du header est une copie en ligne de `assets/logo.svg`, dans `index.html`, pour que ses couleurs suivent le header (crème sur la vidéo et sur les sections foncées). Si tu modifies le logo, ré-exporte le SVG puis recopie les tracés dans `index.html`.

## Ce qui est une proposition (à valider)

- Couleurs des sections (crème, sable, nuit) et passage en dégradé entre elles.
- Bandes de vague entre Works et About, et dans le passage vers Contact.
- Entrée du titre au chargement : chaque ligne monte, se révèle (flou → net) et se resserre.
- Lightbox : fond nuit flouté, vidéo 16:9 la plus grande possible avec la légende dessous. Se ferme en cliquant en dehors, avec Échap, Retour arrière ou le bouton Précédent du navigateur.
- Appel « Explore works » avec une flèche qui descend doucement, dans le bas du hero.
- Boutons : petits et texte centré au repos, la pastille s'agrandit vers le bas au survol pour laisser la place à la vague.
- Durées : 150 ms, 250 ms, 600 ms. Apparition au scroll : montée de 24 px, décalage de 80 ms.

## Prochaines étapes

Contenus réels (projets, textes, photo, GIF, e-mail) > liens Instagram et WhatsApp > version téléphone (à tester sur un vrai téléphone).
