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

Toute nouvelle règle durable doit être ajoutée à GAME_NOTE_RULES.md et
transformée en validation automatique quand c'est possible.
