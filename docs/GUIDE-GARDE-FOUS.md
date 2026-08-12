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
- Chaque jeu ajouté au catalogue doit avoir au moins un visuel de référence :
  en priorité l'icône, la couverture ou la bannière officielle du jeu. La
  source ou le chemin de l'image doit être conservé avec la fiche ; sans image
  validée, le jeu reste en `draft` et ne peut pas passer en `published`.
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
- [ ] une icône, une couverture ou une bannière officielle est définie,
      accessible et affichée sur la carte du jeu ;
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

## Commit et mise à jour du workflow — obligatoire

Chaque commit, y compris un commit d'interface, de correction technique ou de
contenu FFVII, doit contenir une mise à jour coordonnée de ces trois fichiers :

1. `A_LIRE_EN_PREMIER.md` : règle opérationnelle à appliquer au prochain lot ;
2. `GAME_NOTE_RULES.md` : règle permanente ou contrôle à ne pas oublier ;
3. `docs/GUIDE-GARDE-FOUS.md` : méthode détaillée, périmètre ou limite.

La mise à jour doit être utile et liée au lot : périmètre touché, validation
réalisée, risque restant ou décision de méthode. Un commit sans cette triple
mise à jour est refusé, même si le code ou la fiche fonctionne.

### Lot FFVII du 12 août 2026

- Périmètre : précision de la route de Midgar, du train jusqu'à l'évasion ; les
  autres guides et les changements d'interface en cours restent hors périmètre.
- Contrôle attendu : recouper les emplacements et les récompenses sensibles
  avec la liste Steam officielle et deux références d'objets/parcours avant de
  valider la fiche ; vérifier ensuite la structure, le build et les tests du
  site.
- Limite : ce lot améliore Midgar et ne constitue pas encore une relecture
  exhaustive de chaque zone des disques suivants.

### Lot FFVII — sortie de Midgar jusqu'au Cargo Ship

- Périmètre livré : Kalm, Chocobo Ranch, Enemy Skills précoces, Mythril Mines,
  les trois premières batailles de Fort Condor, recrutement de Yuffie, Lower et
  Upper Junon, puis le Cargo Ship.
- Méthode ajoutée : chaque récompense de mini-jeu possède son barème ou son
  numéro de bataille ; les objets volables et les matérias posées au sol sont
  séparés des succès Steam et contrôlés dans le checkpoint de zone.
- Limite restante : Costa del Sol jusqu'à la Northern Cave doit encore être
  repris avec le même niveau de précision avant de considérer la fiche complète.

### Lot FFVII — Costa del Sol jusqu'à la fin du disque 1

- Périmètre livré : Costa del Sol, Mt. Corel, Gold Saucer, Corel Prison, Gongaga,
  Cosmo Canyon, Nibelheim, Mt. Nibel, Rocket Town, Temple of the Ancients, Bone
  Village, City of the Ancients, Great Glacier, Gaea's Cliff et Whirlwind Maze.
- Méthode ajoutée : les fouilles, mini-jeux, branches de donjons et récompenses
  de boss sont inscrits dans l'ordre avec leur fenêtre de sauvegarde ; les
  objets de rattrapage et les équipements uniques restent distingués des
  succès Steam.
- Limite restante : le disque 2, le raid de Midgar et le nettoyage final doivent
  encore être relus au même niveau avant le statut complet.

### Lot FFVII — Junon, Mideel, Wutai et les Huge Materia

- Périmètre livré : évasion de Junon sans faux butin, tournée du Highwind,
  boutiques conditionnelles et objets manquables de Mideel, quête complète de
  Wutai/Pagode, train de North Corel, bataille directe de Fort Condor, sous-marin
  et Rocket Town.
- Méthode ajoutée : une séquence vide est déclarée vide ; les objets de Mideel
  sont séparés par condition ; chaque Huge Materia possède son propre contrôle
  de mini-jeu, vol, code, récompense annexe et sauvegarde de reprise.
- Limite restante : la relecture détaillée des sections Highwind de nettoyage,
  Gelnika, Ancient Forest, raid de Midgar et Northern Cave reste à faire avant
  le statut complet de la fiche FFVII.

## Seuil de profondeur Game Note

Une fiche ne peut plus être considérée comme complète parce qu'elle contient
une liste de succès et quelques paragraphes généraux. Avant `reviewed`, elle
doit passer `scripts/audit-guide-quality.mjs` et sa relecture manuelle :

- la route est découpée par zones, chapitres, missions ou actes dans l'ordre ;
- chaque détour utile arrive avant la transition qui peut le rendre ratable ;
- les coffres, objets, matérias, collectibles et interactions demandés par le
  périmètre ont un repère concret, pas seulement « fouille la zone » ;
- dans une zone à embranchements, le repère concret indique l'écran ou la
  salle, le côté, l'ordre et la condition de récompense. Chaque objet est
  d'abord classé comme fenêtre unique, récupérable plus tard ou optionnel afin
  de ne pas fabriquer de faux missables ; le type réel de l'objet est relu
  avant d'ajouter `[COFFRE]` ;
- les succès sont liés à une action et à un moment précis, avec les DLC, le
  coop et le nettoyage séparés ;
- la checklist finale contient exactement le total Steam audité, sans doublon ;
- une fiche trop courte ou trop générique reste `draft`/`research`, même si le
  contrôle structurel historique passe.

## Repères visuels du lecteur premium

Pour la phase actuelle, ces repères sont activés uniquement sur la fiche
`final-fantasy-vii-2013`. Aucune autre soluce ne doit être reclassée ou
enrichie visuellement sans demande explicite.

Les fichiers TXT restent la source hors ligne et doivent rester lisibles sans
le site. Les repères visuels ajoutés par le lecteur servent uniquement à
accélérer le balayage d'une route : ils ne remplacent jamais un emplacement,
une quantité, une condition ou une consigne écrite.

Le lecteur reconnaît ces marqueurs explicites lorsqu'ils sont placés au tout
début de la ligne, avant le tiret ou la case à cocher :

- `[COFFRE]` : coffre, matéria, objet, récompense, butin ou collectible à
  récupérer ;
- `[SAUVEGARDE]` : sauvegarde manuelle conseillée ;
- `[MANQUABLE]` : action à faire avant une fenêtre qui se ferme ;
- `[SUCCES]` : objectif Steam ou étape directement liée ;
- `[BOSS]` : boss ou combat clé.

Exemple : `[COFFRE] - Dans la salle nord, ouvrir le coffre avant de prendre
l'ascenseur.` Les marqueurs peuvent être combinés, par exemple
`[MANQUABLE] [SAUVEGARDE]`. Le lecteur retire la syntaxe du texte affiché,
expose une légende accessible et rend les repères recherchables.

Le lecteur déduit aussi automatiquement les repères évidents dans les titres,
sous-titres, puces et cases à cocher existants. Cette déduction est un filet de
sécurité pour la fiche FFVII ; pour toute nouvelle information critique, le
marqueur explicite reste préférable. Un seul pictogramme couvre les objets à
trouver : ne pas multiplier les icônes selon le nom de l'objet. Les autres
icônes restent réservées aux alertes de sauvegarde, de missable, de succès et
de boss. Une icône doit signaler une action concrète et utile à ce moment précis
de la route.

Le format maître de la fiche FFVII ajoute un bloc `AVANT DE SORTIR` à chaque
étape importante. Il doit confirmer uniquement les éléments déjà décrits dans
la zone : objets et coffres, succès, équipement utile et sauvegarde. Il ne doit
pas devenir une seconde soluce répétitive ; une zone sans enjeu supplémentaire
reste un checkpoint de deux lignes maximum.

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
