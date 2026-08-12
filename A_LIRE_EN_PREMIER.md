# À lire en premier — garde-fou maître Game Note

Ce fichier fixe la méthode minimale avant toute modification visible du site.

1. Lire GAME_NOTE_RULES.md.
2. Vérifier git status et git diff avant d'éditer.
3. Préserver les ajouts de soluces dans public/guides/ et les catalogues dans
   docs/. Ne jamais restaurer ces fichiers depuis Git sans demande explicite.
4. Modifier les sources (app/, public/, scripts/), jamais dist/client/ à la main.
5. Après une modification visible, lancer npm run build, puis npm run preflight.
6. Après chaque lot modifié, créer un commit local vérifiable. Ne pas déployer
   ni pousser automatiquement vers GitHub.
7. Chaque commit doit aussi mettre à jour le workflow et les garde-fous dans
   `A_LIRE_EN_PREMIER.md`, `GAME_NOTE_RULES.md` et
   `docs/GUIDE-GARDE-FOUS.md`. La note doit refléter le lot livré, ses
   validations et sa limite éventuelle ; un simple changement cosmétique est
   interdit.
8. Pour le lot FFVII en cours, le format de référence est une route par zone
   avec un bloc `AVANT DE SORTIR` : objets, succès, équipement et sauvegarde
   doivent y être contrôlés avant chaque transition importante.
9. Pour chaque passe d'objets FFVII, qualifier séparément les objets réellement
   manquables, ceux récupérables plus tard en boutique et les récompenses
   optionnelles. La fiche doit donner l'écran, le côté et l'ordre quand un
   détour peut être raté ; une simple mention « fouille la zone » est refusée.
10. Pour les mini-jeux et événements à récompense, noter le déclencheur, le
    barème, la récompense exacte et la possibilité de la récupérer plus tard.
    Les équipements volables sur un ennemi et les matérias posées au sol sont
    contrôlés comme des objets, même lorsqu'ils ne débloquent aucun succès.
11. Pour les donjons à passage unique de FFVII, donner l'ordre des branches,
    les objets de retour et le point de sauvegarde avant le boss. Une route ne
    peut pas être déclarée complète si elle décrit seulement l'objectif de la
    zone sans traiter les récompenses de ses énigmes et de ses combats.

Toute nouvelle règle durable doit être ajoutée à GAME_NOTE_RULES.md et
transformée en validation automatique quand c'est possible.
