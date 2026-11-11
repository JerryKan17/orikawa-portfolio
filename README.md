# orikawa laurentin — site

Étape 1 : fondation + hero + bouton avec la vague. Les sections Works, About et Contact sont des emplacements.

## Ouvrir le projet dans VS Code

1. Décompresse le dossier, puis dans VS Code : Fichier > Ouvrir le dossier.
2. Installe l'extension **Live Server** (Ritwick Dey).
3. Clic droit sur `index.html` > **Open with Live Server**. La page se recharge à chaque enregistrement.

## Fichiers

- `index.html` : la structure.
- `styles.css` : les variables en haut (couleurs, polices, espacements, durées) puis le style de chaque partie.
- `main.js` : la vague des boutons, le titre qui remplit la largeur, la bascule du hero, le header, l'apparition au scroll.
- `assets/` : tes vidéos et images (voir `assets/LISEZ-MOI.txt`).

## À faire de ton côté

1. **Polices Adobe** : crée un « Web project » sur fonts.adobe.com avec Effra et Emily Austin, colle la balise `<link>` dans `index.html` (emplacement indiqué), puis vérifie dans `styles.css` les noms `--font-title` et `--font-script` et la graisse Heavy (800).
   En attendant : Figtree remplace Effra, Caveat remplace Emily Austin, EB Garamond est la vraie police du corps.
2. **Vidéos** : pour l'instant, on garde le dégradé animé. La boucle du hero (`assets/hero-loop.mp4`), le showreel de la lightbox (`assets/showreel.mp4`) et le rangement des assets viendront plus tard. Tant que le showreel est absent, la lightbox affiche « coming soon ».
3. **Vague des boutons** : modifie `ZIGZAG` dans `main.js` ou remplace `makeWave()` par la vague exportée de Figma.

## Logo

Le logo du header est une copie en ligne de `assets/logo.svg`, dans `index.html`, pour que ses couleurs suivent le header (crème sur la vidéo). Si tu modifies le logo, ré-exporte le SVG puis recopie les tracés dans `index.html`.

## Ce qui est une proposition (à valider)

- Hauteur du header 88 px. Fond crème légèrement translucide dès que la page défile, filet une fois le hero passé.
- Entrée du titre au chargement : chaque ligne monte, se révèle (flou → net) et se resserre, l'une après l'autre ; la note et le bouton suivent en fondu.
- Lightbox du showreel : fond nuit flouté, vidéo 16:9 la plus grande possible. Se ferme en cliquant en dehors, avec Échap, Retour arrière ou le bouton Précédent du navigateur.
- Soulignement des liens de navigation au survol, aux couleurs du dégradé du hero.
- Boutons : petits et texte centré au repos, la pastille s'agrandit vers le bas au survol pour laisser la place à la vague.
- Titre du hero : au plus 86 % de la largeur utile (`TITLE_WIDTH` dans `main.js`), centré entre le header et le bas du hero.
- Durées : 150 ms, 250 ms, 600 ms. Apparition au scroll : montée de 24 px, décalage de 80 ms.
- Zoom de la vidéo de 1,06 vers 1 au survol du showreel.
- Couleurs jaune et magenta : présentes sur ta planche, non utilisées pour l'instant.

## Prochaines étapes

Header et boutons (affiner) > Works et lightbox du showreel > About et bulles skills > Contact et footer > finitions > version téléphone.
