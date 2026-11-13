# Sons du site : checklist

Tous les sons ci-dessous sont **branchés** dans `main.js` (moteur en section 0, déclencheurs en section 8). Un fichier déposé dans ce dossier (`assets/sounds/`) avec **exactement** le nom indiqué est joué ; un fichier absent est ignoré.

Les sons sont **actifs par défaut**. Le visiteur peut les couper avec le bouton « vague » du header, annoté « sound on / sound off » (son choix est mémorisé). Les navigateurs bloquent tout son avant le premier clic ou la première touche du visiteur : les survols restent muets jusque-là. Les vidéos (hero, lightbox) ne dépendent pas de ce bouton.

## Consignes communes

- **Format** : `.mp3`, 44,1 ou 48 kHz, 192 kbps minimum. Mono pour les sons d'interface, stéréo pour `hero-reveal` et `lightbox-close`.
- **Attaque immédiate** : aucun silence au début du fichier (sinon le son arrive en retard sur le geste). Petit fondu de sortie pour éviter les clics.
- **Courts** : moins de 150 ms pour les survols, moins de 400 ms pour les clics.
- **Niveau** : homogène (crête autour de -6 dBFS). Le dosage final se fait dans `main.js` (objet `SOUNDS`, valeur `volume` de 0 à 1, et `MASTER` pour le volume général).
- **Une seule tonalité** pour tous les sons « notés » (bulles, toggle, copie…).
- **Direction** : la vague du logo. Timbres doux et chauds, onde triangle / zigzag, petites textures de papier. Rien de strident.

## Interface générale

- [x] **`toggle-on.mp3`** : le visiteur réactive le son. La signature sonore du site.
- [x] **`toggle-off.mp3`** : le visiteur coupe le son.
- [x] **`ui-hover.mp3`** : survol d'un lien ou d'un bouton (menu, « Explore works », « Start a project », filtres, e-mail…).
- [x] **`ui-click.mp3`** : **chaque clic** sur un lien ou un bouton : menu, logo, filtres, vignettes, « See showreel », « Play the film », « Close », e-mail… Seul le bouton des sons a ses propres sons (`toggle-on` / `toggle-off`).

## Hero

- [x] **`hero-reveal.mp3`** : survol de « See showreel » (la vidéo passe en plein fond). Pas de son au retour.

## Lightbox (showreel et projets)

- [x] **`lightbox-close.mp3`** : fermeture (clic en dehors, Échap, Retour arrière, « Close »). L'ouverture n'a pas de son propre : c'est le `ui-click` du bouton cliqué.

## Works

- [x] **`card-hover.mp3`** : survol d'une vignette de projet.

## About

Les six bulles de compétences forment une gamme : survolées de gauche à droite, elles jouent une petite mélodie. Fichiers dans l'ordre des bulles ; s'il y a plus de six bulles, la gamme recommence.

- [x] **`bubble-1.mp3`** : Motion design.
- [x] **`bubble-2.mp3`** : Sound design.
- [x] **`bubble-3.mp3`** : Explainer films.
- [x] **`bubble-4.mp3`** : Product videos.
- [x] **`bubble-5.mp3`** : Storyboarding.
- [x] **`bubble-6.mp3`** : UI animation.

## Contact

- [x] **`wave-pluck.mp3`** : clic dans la section Contact, en dehors des boutons. Une onde part dans la grande vague. Pas de spam : un nouveau pluck ne peut partir qu'une fois le précédent terminé (délai = durée du fichier, option `untilEnd` dans `SOUNDS`).
- [x] **`copy.mp3`** : l'adresse e-mail est copiée (joue avec le `ui-click` du clic).

## Retirés (choix du 12 novembre 2026)

Ces sons ne sont plus branchés dans le code :
- `hero-unreveal` : retour au titre en quittant « See showreel » (surchargeait l'écoute).
- `lightbox-open` : remplacé par le `ui-click`, joué à chaque clic.
- `filter` : remplacé par le `ui-click`, joué à chaque clic.
- `contact-drone` : nappe d'ambiance de la section Contact (trop envahissante).

## Pour tester

1. Ouvre le site avec Live Server, puis clique une fois n'importe où (les navigateurs exigent un premier geste).
2. Ajuste les volumes dans `main.js`, objet `SOUNDS` (`volume`), et le volume général avec `MASTER`.
3. Le paramètre `throttle` (en millisecondes) évite qu'un même son se répète trop vite (survols rapides).
