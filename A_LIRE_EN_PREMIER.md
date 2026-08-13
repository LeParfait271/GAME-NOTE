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
12. Pour les séquences FFVII sans butin, l'indiquer explicitement afin de ne
    pas inventer des coffres. Pour Mideel, les boutiques conditionnelles, le
    chocobo blanc et la porte verrouillée sont des contrôles distincts. Pour
    les Huge Materia, séparer la récompense du mini-jeu, le combat direct, le
    butin volé et le code de la séquence ; un résultat partiel ne passe jamais
    pour une route 100 %.
13. Pour la checklist Materia Overlord de FFVII Steam, compter les 83 types
    distincts, conserver les quatre exceptions non maîtrisables dans
    l'inventaire, remplir les 24 compétences sur une même Enemy Skill et ne
    jamais convertir les copies MASTER dans une Huge Materia avant le succès.
    La Northern Cave doit décrire les trois branches et le retour sûr au
    Highwind.
14. Après cette checklist, comparer chaque type de matéria et chaque Enemy Skill
    à une occurrence de route avec emplacement ou condition. Un nom présent
    uniquement dans le catalogue ne suffit pas : les achats, récompenses de
    mini-jeu et compétences apprises sur un ennemi doivent être placés avant
    leur fenêtre de collecte.
15. Les spoilers sont autorisés lorsqu'ils sont explicitement demandés par le
    propriétaire du projet : ne pas sacrifier une condition, une identité, une
    fin, une conséquence ou une solution exacte pour préserver une politique
    anti-spoiler. Pour Expedition 33, la route doit donc pouvoir nommer les
    révélations utiles au 100 %, tout en les plaçant dans l'ordre de jeu et en
    séparant clairement les fenêtres manquables, le post-game et les choix.
16. Pour Expedition 33, ne valider la fiche qu'après comparaison croisée des
    compteurs 55/55, 49 journaux, 33 disques, 10 quêtes de Névrons, 9 Gestrals,
    5 jeux gestral, 46 compétences de Monoco et 35 interactions de relation.
    La checklist Steam et les annexes de localisation sont deux contrôles
    distincts : une liste de noms sans route concrète ne suffit pas.
17. Sur Windows, une assertion post-build `UV_HANDLE_CLOSING` n'est tolérée que
    si `dist/client/index.html` existe et que les validations Pages poursuivent
    leur exécution. Le numéro de ligne de l'assertion peut varier selon Node.
18. Le format visuel validé sur FFVII est aussi obligatoire pour Expedition 33 :
    activer les mêmes repères dans le lecteur, garder une action par ligne et
    contrôler le rendu réel de la fiche avant de déclarer la réécriture terminée.

Toute nouvelle règle durable doit être ajoutée à GAME_NOTE_RULES.md et
transformée en validation automatique quand c'est possible.
