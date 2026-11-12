# Sons du site : checklist

Tous les sons ci-dessous sont **déjà branchés** dans `main.js`. Il suffit de déposer le fichier dans ce dossier (`assets/sounds/`), avec **exactement** le nom indiqué, pour qu'il soit joué. Un fichier absent est ignoré, tu peux donc les ajouter un par un.

Les sons sont coupés par défaut. Le visiteur les active avec le bouton « vague » du header (son choix est mémorisé). Les vidéos (hero, lightbox) ne dépendent pas de ce bouton.

## Consignes communes

- **Format** : `.mp3`, 44,1 ou 48 kHz, 192 kbps minimum. Mono pour les sons d'interface, stéréo pour `hero-reveal`, `lightbox-open/close` et la nappe.
- **Attaque immédiate** : aucun silence au début du fichier (sinon le son arrive en retard sur le geste). Petit fondu de sortie pour éviter les clics.
- **Courts** : un son d'interface se joue souvent. Vise moins de 150 ms pour les survols, moins de 400 ms pour les clics.
- **Niveau** : prépare-les à un niveau homogène (crête autour de -6 dBFS). Le dosage final se fait dans `main.js` (objet `SOUNDS`, valeur `volume` de 0 à 1, et `MASTER` pour le volume général).
- **Une seule tonalité** pour tous les sons « notés » (bulles, toggle, filtre, copie…), pour que tout sonne ensemble quand ils se superposent.
- **Direction** : la vague du logo. Timbres doux et chauds, onde triangle / zigzag, petites textures de papier. Le menthe est l'accent : une brillance légère, jamais agressive. Rien de « jeu vidéo », rien de strident : le visiteur doit pouvoir survoler le site pendant une minute sans fatigue.

## Interface générale

- [X]  **`toggle-on.mp3`**
  - Quand : le visiteur active le son (premier son qu'il entend).
  - Durée : 300–600 ms.
  - Intention : la signature sonore du site. La vague qui « se déplie » : une petite montée tonale, un accord ou trois notes, comme les trois traits du logo.
- [X]  **`toggle-off.mp3`**
  - Quand : le visiteur coupe le son.
  - Durée : 200–400 ms.
  - Intention : l'inverse du précédent, qui redescend et s'aplatit. Plus court, plus discret.
- [ ]  **`ui-hover.mp3`**
  - Quand : survol d'un lien ou d'un bouton (menu, « Explore works », « Start a project », chips, e-mail…).
  - Durée : 30–120 ms.
  - Intention : un « tick » très doux, presque une texture (frottement de papier, petit souffle tonal). C'est le son le plus fréquent : il doit presque disparaître.
- [ ]  **`ui-click.mp3`**
  - Quand : clic sur un lien ou un bouton qui n'a pas de son propre (menu, logo, « Explore works », « Start a project »…).
  - Durée : 60–200 ms.
  - Intention : une validation nette et feutrée, un cran au-dessus du survol.

## Hero

- [ ]  **`hero-reveal.mp3`**
  - Quand : survol de « See showreel » (la vidéo passe en plein fond).
  - Durée : 600–1200 ms.
  - Intention : une ouverture, un « swell » qui accompagne le fondu de l'image (le voile crème qui s'efface). Le moment le plus cinématographique de l'interface.
- [ ]  **`hero-unreveal.mp3`**
  - Quand : la souris quitte « See showreel » (retour au titre).
  - Durée : 300–600 ms.
  - Intention : le même geste, à l'envers et plus court. Il peut se déclencher souvent, donc il doit rester discret.

## Lightbox (showreel et projets)

- [ ]  **`lightbox-open.mp3`**
  - Quand : ouverture d'un film (« See showreel », vignette, « Play the film »).
  - Durée : 300–700 ms.
  - Intention : le fond se ferme autour de la vidéo, comme une salle qui s'éteint. Il précède le son du film : il ne doit pas le couvrir.
- [ ]  **`lightbox-close.mp3`**
  - Quand : fermeture (clic en dehors, Échap, Retour arrière, « Close »).
  - Durée : 200–500 ms.
  - Intention : retour à la page, plus léger que l'ouverture.

## Works

- [ ]  **`card-hover.mp3`**
  - Quand : survol d'une vignette de projet.
  - Durée : 80–250 ms.
  - Intention : un peu plus présent que `ui-hover`, avec une couleur « image » (petit shimmer, projecteur, pellicule).
- [ ]  **`filter.mp3`**
  - Quand : clic sur un filtre (All, DSP, Music, Other).
  - Durée : 100–300 ms.
  - Intention : un tri, un petit glissement ou un « shuffle » de cartes, tonal.

## About

Les six bulles de compétences forment une gamme : survolées de gauche à droite, elles jouent une petite mélodie. Fichiers dans l'ordre des bulles. Suggestion : une pentatonique ascendante, même timbre pour les six.

- [ ]  **`bubble-1.mp3`** : Motion design, note 1 (la plus grave).
- [ ]  **`bubble-2.mp3`** : Sound design, note 2.
- [ ]  **`bubble-3.mp3`** : Explainer films, note 3.
- [ ]  **`bubble-4.mp3`** : Product videos, note 4.
- [ ]  **`bubble-5.mp3`** : Storyboarding, note 5.
- [ ]  **`bubble-6.mp3`** : UI animation, note 6 (la plus aiguë).

Durée de chacune : 150–400 ms, résonance douce (pluck, marimba feutré, synthé triangle). S'il y a plus de six bulles, la gamme recommence.

## Contact

- [ ]  **`wave-pluck.mp3`**
  - Quand : clic dans la section Contact (en dehors des boutons) : une onde part dans la grande vague.
  - Durée : 400–1200 ms.
  - Intention : une corde pincée ou une goutte qui résonne et s'étale, comme l'onde qui part vers les côtés. Peut se répéter vite : pas trop long en attaque.
- [ ]  **`copy.mp3`**
  - Quand : l'adresse e-mail est copiée.
  - Durée : 150–350 ms.
  - Intention : une confirmation positive et claire (deux notes montantes), dans la tonalité du site.
- [ ]  **`contact-drone.mp3`**
  - Quand : en boucle, tant que la section Contact est à l'écran. Elle monte et redescend en fondu (géré par le code).
  - Durée : 8–20 s, **bouclable sans couture** (même niveau et même phase au début et à la fin).
  - Intention : une nappe calme, grave et chaude, qui donne de la profondeur au fond nuit. Elle doit rester sous le reste : c'est une ambiance, pas une musique.

## Pour tester

1. Ouvre le site avec Live Server.
2. Active le son avec le bouton « vague » du header, à gauche de « Start a project ».
3. Ajuste les volumes dans `main.js`, objet `SOUNDS` (`volume`), et le volume général avec `MASTER`.
4. Le paramètre `throttle` (en millisecondes) évite qu'un même son se répète trop vite (survols rapides).

## Idées optionnelles (pas encore branchées)

- [ ]  Entrée du titre « complexity, unfolded. » au chargement. Les navigateurs bloquent le son avant le premier clic : il ne pourrait se jouer que si le visiteur a déjà activé le son.
- [ ]  Un léger changement d'ambiance à l'arrivée dans chaque section (Works, About).
- [ ]  Un son de clic du curseur (le pic qui s'écrase), en remplacement de `ui-click`.
