# Garde-fous Game Note — méthode unique des soluces

Ce document est la règle de travail du projet. Aucun guide ne doit être
présenté comme « 100 % Steam » tant que les contrôles ci-dessous ne sont pas
terminés.

## Périmètre

- Une soluce complète est réservée aux jeux qui ont une campagne, des zones,
  des quêtes, des collectibles ou des choix qui justifient un ordre de jeu.
- Les jeux compétitifs, les jeux à runs et les jeux-service sans route
  chronologique ne reçoivent pas de fausse soluce classique.
- `Titan Quest II` reste en veille tant que son accès anticipé et son contenu
  de succès ne sont pas stabilisés.
- Les guides actifs et les exclusions sont enregistrés dans
  `docs/guide-catalog.json`.

## Promesse de chaque guide actif

### Regle absolue : sans spoiler

Tous les guides Game Note, sans exception, sont rediges sans spoiler d'histoire.
Cette regle s'applique aussi aux jeux a fins multiples, aux guides de succes
et aux sections post-game. Il est interdit de reveler une mort, une identite,
une trahison, une fin, un twist, la resolution d'une quete ou la consequence
narrative d'un choix. Les noms de lieux, de missions, de boss, de personnages
et de succes sont autorises uniquement quand ils servent a se reperer.

Une condition de succes est formulee par son action de jeu, son emplacement,
son ordre et son effet mecanique. Si un intitulé impose un nom narratif, le nom
est conserve sans commentaire scenaristique. Aucun guide ne doit contenir une
formule du type « spoilers intégraux », « avec spoilers », « voici la fin » ou
une explication qui incite a lire une révélation. En cas de doute, on retire le
detail narratif et on laisse le guide en `draft` pour relecture.

Chaque fichier TXT doit fournir, dans cet ordre :

1. une fiche de périmètre : version, DLC inclus ou non, succès Steam couverts
   et éventuelles limites online ;
2. une préparation sans spoiler : difficulté conseillée, réglages et
   sauvegardes de sécurité ;
3. une route chronologique complète, avec les détours placés au moment sûr ;
4. les missables signalés avant qu'ils deviennent ratables ;
5. les quêtes secondaires, collectibles, achats, combats et fins nécessaires ;
6. un nettoyage post-game séparé, sans révéler les événements de l'histoire ;
7. une checklist finale succès par succès et une section « vérification ».

## Règles anti-spoiler

- Ne jamais révéler une mort, une identité, une trahison, une fin ou un twist.
- Les noms indispensables à la navigation sont autorisés ; les explications
  d'histoire ne le sont pas.
- Les alertes importantes apparaissent avant la zone concernée, jamais après.
- Aucun titre de succès ne doit être accompagné d'une explication narrative.
- Les choix sont décrits par leur effet de jeu et leur condition, pas par leur
  conséquence scénaristique.

## Règles 100 % Steam

- Relever le nombre exact de succès de la fiche Steam au moment de l'audit.
- Distinguer succès de base, DLC, online, coopération et contenu retiré.
- Vérifier chaque succès avec au moins deux sources indépendantes quand le
  succès est missable, buggué, aléatoire ou dépendant d'une version.
- Ne jamais inventer une condition absente des sources : écrire « à confirmer »
  et laisser le guide en révision tant que le point n'est pas tranché.
- Pour un jeu sans succès Steam ou sans route stable, l'indiquer clairement et
  ne pas lui attribuer artificiellement un 100 %.

## Hiérarchie des sources

1. fiche Steam et liste officielle des succès ;
2. notes de mise à jour, manuel ou documentation de l'éditeur ;
3. deux guides communautaires reconnus, comparés entre eux ;
4. forums et vidéos uniquement pour résoudre un cas ambigu, jamais comme
   preuve unique.

La fiche de recherche d'un jeu doit conserver les liens, la date de lecture,
la version du jeu et les points vérifiés. Les sources ne sont pas copiées : le
texte du guide est rédigé de façon originale et pratique.

## Garde-fous renforcés pour les nouveaux lots

- Pour chaque nouveau jeu, conserver dans `docs/steam-audit.json` l'AppID, le
  nombre de succès relevé et le périmètre exact : DLC, Raid, Survival,
  coopération, online ou absence de contenu annexe.
- Distinguer les collectibles récupérables par sélection de chapitre des
  collectibles à fenêtre unique. Une route doit prévenir le missable avant la
  zone, puis proposer une sauvegarde ou un nettoyage séparé.
- Pour les jeux à modes multiples, séparer la partie chronologique, les runs à
  contrainte, le post-game et le coop. Ne jamais faire croire qu'un succès
  online ou DLC est inclus dans la campagne de base.
- Pour les jeux à runs ou à personnages, prévoir un ordre de déblocage, les
  campagnes dédiées sans changement de personnage et le nettoyage des
  compteurs ; une seule route narrative ne suffit pas pour le 100 %.
- Pour les RPG à objets ou compétences missables, vérifier chaque extraction,
  magazine, carte, quête et boss optionnel dans une sauvegarde dédiée avant le
  point de non-retour. Le guide doit indiquer quoi sauvegarder et quoi vérifier
  avant de gagner le combat.
- La checklist finale doit contenir chaque intitulé Steam une seule fois, le
  même total que l'audit et une vérification des modes additionnels.

## Contrôle avant publication

- [ ] le bon jeu et le bon AppID sont identifiés ;
- [ ] le nombre de succès Steam est relevé ;
- [ ] chaque succès est présent une fois, sans doublon ;
- [ ] chaque missable est placé avant son point de non-retour ;
- [ ] les DLC et le online sont séparés du parcours principal ;
- [ ] la route peut être suivie sans connaître l'histoire ;
- [ ] une relecture spoiler confirme l'absence de mort, identité, trahison,
      fin, twist et conséquence narrative révélés ;
- [ ] les fichiers TXT s'ouvrent en UTF-8 et gardent les accents ;
- [ ] le fichier est référencé dans `docs/guide-catalog.json` ;
- [ ] le contrôle automatique normal puis le contrôle strict passent ;
- [ ] le build du site passe avant le commit ;
- [ ] le commit indique le ou les guides réellement contrôlés.

## États autorisés

- `planned` : jeu retenu, recherche non commencée ;
- `research` : sources et succès en cours d'audit ;
- `draft` : guide rédigé, contrôle incomplet ;
- `reviewed` : checklist complète et sources vérifiées ;
- `published` : intégré au site et envoyé sur GitHub ;
- `hold` : contenu instable, jeu-service ou accès anticipé ;
- `excluded` : aucune soluce chronologique utile pour ce projet.

Un guide ne passe à `published` qu'après le contrôle strict. Si le jeu reçoit
une mise à jour qui change les succès ou le contenu, le guide repasse en
`research` et sa date de vérification est mise à jour.
