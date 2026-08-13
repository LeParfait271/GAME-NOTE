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
19. Les cases de contrôle placées dans une annexe premium doivent être rendues
    interactives séparément, y compris lorsqu'une ancienne ligne en contient
    plusieurs. Elles alimentent le suivi local sans modifier le total des
    succès Steam.
20. Après une réécriture de guide, relire aussi sa carte catalogue : titre,
    sous-titre, description, alerte et badges doivent décrire le bon jeu et le
    bon mode de révélation. Un ancien texte « sans spoiler » ou un résumé d'un
    autre jeu invalide la livraison même si le TXT est correct.
21. Les icônes déduites automatiquement doivent rester contextuelles : un nom
    de zone, de village ou de personnage ne suffit pas pour une icône d'objet.
    Vérifier le sommaire et quelques étapes après chaque extension du vocabulaire
    de collecte.
22. Pour l'accueil immersif de Game Note, garder un premier écran lisible sans
    dépendance à une animation : le titre, l'index et l'accès à la bibliothèque
    doivent rester utilisables au clavier et sur petit écran. Les artworks
    distants doivent conserver un visuel local de repli.
23. La version éditoriale affichée du site est centralisée dans
    `app/site-version.ts` au format `X.YY`. Chaque commit doit l'augmenter de
    `0.01` ; le hook `.githooks/pre-commit` le fait automatiquement et ajoute
    le fichier à l'index. Ne pas utiliser `--no-verify` pour contourner cette
    règle ; si le hook est absent, réactiver `core.hooksPath` avant de commit.
24. Jusqu'à validation de la nouvelle méthode, la publication du site est
    volontairement limitée à `expedition-33` et `octopath` (Octopath Traveler 1) via
    `SITE_VISIBLE_GUIDE_IDS`. Les autres fiches et leurs TXT sont conservés
    dans l'archive du dépôt, mais ne doivent apparaître ni dans l'index, ni
    dans la recherche, ni dans les liens de navigation, ni par URL directe.

Toute nouvelle règle durable doit être ajoutée à GAME_NOTE_RULES.md et
transformée en validation automatique quand c'est possible.

### Lot catalogue Steam ajouté le 13 août 2026

- La capture Steam est suivie dans `docs/guide-rebuild-queue.json` : deux
  références actives, neuf guides d'archive à reconstruire et cinq exclusions.
- OCTOPATH TRAVELER 0 est seulement planifié pour l'instant : AppID 3014320,
  37 succès Steam, fiche de recherche créée, aucun TXT de façade ni carte
  visible.
- Les guides déjà présents dans `public/guides/` restent hors publication tant
  qu'ils n'ont pas repassé la méthode des cinq sources et le contrôle complet.
- Contrôle avant commit : cohérence queue/catalogue/audit, publication toujours
  limitée à Expedition 33 et Octopath 1, puis build, preflight et tests.

24. Les effets de l'accueil immersif sont des améliorations progressives : le
    grain, la lumière, le scan et les transitions ne doivent jamais remplacer
    le titre, l'index, les boutons ou l'information de route. Tester aussi
    `prefers-reduced-motion`, le clavier et le petit écran avant de les livrer.
25. Si une section de présentation est retirée de l'accueil, supprimer aussi
    ses liens de navigation et ses styles orphelins. Le logo principal doit
    rester centré, lisible et proportionné sur desktop comme sur mobile.
26. Le pied de page doit présenter l'identité Game Note, sa description,
    l'autonomie Android 5+ et la signature MaruChiwa dans une hiérarchie lisible
    sur desktop comme sur mobile ; la version locale reste discrète mais visible.
26. Tant que le lot de refonte est en cours, la liste `docs/site-publication.json`
    est la source de publication temporaire : seuls Expedition 33 et Octopath
    Traveler 1 doivent être copiés dans `dist/client` et le cache hors-ligne.
    Les autres TXT restent conservés mais ne doivent pas sortir du build.
27. Pour une nouvelle fiche reconstruite, conserver la matrice de sources et le
    registre des contradictions avec le TXT. Les compteurs retenus doivent être
    justifiés par au moins deux sources indépendantes avant publication.
29. Pour Octopath Traveler 1, la checklist actuelle à 734 coffres est l'autorité
    du total ; le PDF à 721 lignes ne sert qu'à récupérer des directions quand
    la zone et l'ordre concordent. Les 734 lignes doivent rester dans le TXT.
30. Une fiche complète intègre les solutions des 101 récits, les 152 objets
    cachés avec leurs PNJ, les 381 entrées de Strategist et le registre
    Collector ; « consulte une carte » ou « fais toutes les quêtes » est refusé.
31. Les spoilers sont autorisés lorsqu'une solution complète est demandée : ne
    pas cacher les identités, choix, conséquences, boss ou conditions du 100 %.
32. Les marqueurs premium sont activés pour Octopath : `[COFFRE]` couvre le
    coffre et tout objet à récupérer, `[MANQUABLE]`, `[SUCCES]`, `[BOSS]` et
    `[SAUVEGARDE]` restent réservés à leur action précise.
33. La matrice Octopath doit être relue avant chaque commit de contenu et les
    garde-fous doivent enregistrer le compteur, la contradiction résolue et la
    validation du lot.
34. Les effets ajoutés à l'accueil doivent former une seule direction visuelle :
    profondeur, orbites, grain, scan, parallaxe et bandeau cinétique restent
    décoratifs, ne doivent pas gêner la lecture et doivent respecter
    `prefers-reduced-motion`, le clavier et le petit écran.
35. Une séquence d'entrée peut mettre en scène l'archive avant le hero, mais
    elle doit rester courte, non bloquante et fournir un accès direct à l'index.
    En mouvement réduit, l'entrée est supprimée et le contenu principal doit
    être immédiatement visible.
