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

### Politique de révélations

Les spoilers ne sont plus interdits par défaut. Quand le propriétaire demande
une soluce complète avec spoilers, le guide peut donner les identités, morts,
fins, twists, conséquences de choix, boss et solutions exactes nécessaires au
100 %. La priorité devient la précision de la route et la capacité à terminer
le jeu, pas la préservation de la découverte narrative.

Les révélations doivent néanmoins rester utiles : elles sont placées dans
l'ordre de jeu, annoncées par un titre clair quand elles changent la route et
séparées des alertes de missable. Une phrase narrative ne remplace jamais un
emplacement, une condition, une récompense ou une sauvegarde. Si le propriétaire
 Le niveau de révélation est fixé par le lot ; pour Game Note, la règle active
 est l'exhaustivité avec spoilers autorisés, sans masquer une information utile.

Chaque fichier TXT doit fournir, dans cet ordre :

1. une fiche de périmètre : version, DLC inclus ou non, succès Steam couverts
   et éventuelles limites online ;
2. une préparation technique : difficulté conseillée, réglages et sauvegardes
   de sécurité ;
3. une route chronologique complète, avec les détours placés au moment sûr ;
4. les missables signalés avant qu'ils deviennent ratables ;
5. les quêtes secondaires, collectibles, achats, combats et fins nécessaires ;
6. un nettoyage post-game séparé, avec les révélations nécessaires lorsqu'elles
   sont autorisées ;
7. une checklist finale succès par succès et une section « vérification ».

## Règles d'exhaustivité narrative

- Les révélations autorisées doivent servir une action, un choix, une route ou
  une vérification ; ne pas ajouter de résumé narratif gratuit.
- Les alertes importantes apparaissent avant la zone concernée, jamais après.
- Un titre de succès peut être accompagné de la condition exacte, y compris
  lorsqu'elle révèle un élément de l'histoire.
- Les choix indiquent l'option correcte, le rang, la fenêtre et la conséquence
  utile au 100 % ; les alternatives ratées sont mentionnées si elles exigent
  une nouvelle partie.

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
- [ ] la route indique explicitement les révélations nécessaires lorsque les
      spoilers sont autorisés pour le lot ;
- [ ] une relecture de cohérence confirme que chaque révélation sert une
      étape, un choix, une récompense ou une vérification 100 % ;
- [ ] les fichiers TXT s'ouvrent en UTF-8 et gardent les accents ;
- [ ] le fichier est référencé dans `docs/guide-catalog.json` ;
- [ ] le contrôle automatique normal puis le contrôle strict passent ;
- [ ] le build du site passe avant le commit ;
- [ ] le commit indique le ou les guides réellement contrôlés.

## Commit et mise à jour du workflow — obligatoire

Chaque commit, y compris un commit d'interface, de correction technique ou de
contenu FFVII/Expedition 33, doit contenir une mise à jour coordonnée de ces
trois fichiers :

1. `A_LIRE_EN_PREMIER.md` : règle opérationnelle à appliquer au prochain lot ;
2. `GAME_NOTE_RULES.md` : règle permanente ou contrôle à ne pas oublier ;
3. `docs/GUIDE-GARDE-FOUS.md` : méthode détaillée, périmètre ou limite.

La mise à jour doit être utile et liée au lot : périmètre touché, validation
réalisée, risque restant ou décision de méthode. Un commit sans cette triple
mise à jour est refusé, même si le code ou la fiche fonctionne.

### Lot Expedition 33 — spoilers autorisés le 13 août 2026

- Décision : la fiche Clair Obscur: Expedition 33 sera réécrite avec spoilers
  autorisés afin de donner les solutions exactes, les choix finaux et les
  conséquences nécessaires au 100 % Steam.
- Méthode : route par actes et zones, puis nettoyage post-game séparé ; chaque
  étape possède un emplacement concret, une condition, une récompense et une
  case de contrôle lorsqu'elle touche un compteur.
- Compteurs à contrôler : 55 succès Steam, 49 journaux, 33 disques, 10 quêtes
  de Névrons, 9 Gestrals perdus, 5 jeux de Gestrals, 46 compétences de Monoco
  et 35 rangs de relations.
- Livraison de cette passe : la fiche contient une route de 1 785 lignes par
  actes et zones, les choix finaux, les fenêtres manquables et les procédures
  de rattrapage, puis des annexes séparées pour les compteurs 49/33/10/9/5/46
  et 35. La liste finale conserve exactement 55 cases Steam.
- Contrôle de méthode : les journaux et disques sont donnés dans l'ordre avec
  écran ou repère ; Monoco possède les 46 ennemis/compétences ; les cinq jeux
  gestral donnent leurs lieux, seuils et récompenses ; les relations et le
  choix Truth de Maelle sont séparés des succès de collection.
- Contrôle technique ajouté : `validate-guides.mjs` ne rejette plus les spoilers
  et ne demande plus une formule de non-révélation ; il contrôle désormais la
  route, le périmètre Steam et les fenêtres manquables, quel que soit le mode
  de révélation choisi pour la fiche.
- Contrôle build Windows ajouté : l'assertion post-build `UV_HANDLE_CLOSING` est
  tolérée quel que soit son numéro de ligne uniquement si `dist/client/index.html`
  existe et que la préparation/validation Pages termine réellement.
- Validation de cette passe : guide strict, préflight strict, build Pages et
  smoke tests 6/6 passent ; la fiche ne prétend pas compter chaque consommable
  banal ou chaque Picto facultatif comme un succès Steam.
- Dette hors périmètre : l'audit global de profondeur signale encore des fiches
  historiques à réécrire, mais Expedition 33 atteint le nouveau seuil et n'est
  pas mélangée à ce chantier.

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
- Limite restante : la relecture finale des compteurs, sources et sorties Pages
  doit encore être exécutée avant le commit de validation de la fiche FFVII.

### Lot FFVII — Highwind, nettoyage 100 % et Northern Cave

- Sections 33 à 44 : limites de niveau 4 avec seuils, élevage et quatre grottes,
  Gelnika, Ancient Forest, raid de Midgar, Battle Square, 83 matérias,
  24 Enemy Skills sur une copie, Weapons, AP/gils et les trois branches de la
  Northern Cave.
- Contrôles ajoutés : 83/83 types présents, 79 maîtrisés, quatre exceptions,
  Pandora's Box au premier Dragon Zombie, Final Attack, niveau 99, 99 999 999
  gils et retour à la surface avant la fin.
- Limite restante : l'audit final doit encore confirmer les occurrences de route
  de chaque type et Enemy Skill, puis la construction Pages avant le commit et
  le push.

### Lot FFVII — audit croisé des matérias et Enemy Skills

- Contrôle ajouté : les 83 types ne sont plus seulement listés dans la section
  Materia Overlord ; Revive, Seal, Enemy Lure, Kjata et Typhoon ont une étape
  d'obtention explicite, et les 24 Enemy Skills ont toutes une occurrence de
  route ou de checklist vérifiable.
- Contrôle de cohérence : le nom du type affiché dans le catalogue est aligné
  sur la route, notamment Kjata, Typhoon, Flame Thrower et Goblin Punch.
- Limite restante : validation ciblée de cette passe, construction Pages et
  commit puis push avec les trois fichiers de garde-fous.

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

Pour le lot premium en cours, ces repères sont activés sur les fiches
`final-fantasy-vii-2013` et `expedition-33`. Une autre soluce ne doit pas être
reclassée ou enrichie visuellement sans demande explicite.

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

Une étape de route doit rester une ligne structurée, sous forme de puce ou de
case isolée. Les suites de `[ ]` séparées par des phrases dans un seul
paragraphe sont interdites : elles empêchent le lecteur de rendre les repères,
la recherche et le suivi utilisables.

Le lecteur doit toutefois savoir récupérer les anciennes cases de contrôle
présentes dans les annexes : il les sépare visuellement et les conserve dans le
suivi local. Le compteur de succès Steam reste limité aux cases de la checklist
finale ; les relations, matérias, compétences et autres collections gardent un
suivi distinct.

La carte de catalogue doit être relue avec le TXT après chaque réécriture : elle
doit annoncer les bons compteurs, le bon niveau de révélation et les vrais
missables du jeu. Pour Expedition 33, toute mention résiduelle de « sans
 de stages, d'Arcade ou d'un autre périmètre est une erreur de fiche.

Exemple : `[COFFRE] - Dans la salle nord, ouvrir le coffre avant de prendre
l'ascenseur.` Les marqueurs peuvent être combinés, par exemple
`[MANQUABLE] [SAUVEGARDE]`. Le lecteur retire la syntaxe du texte affiché,
expose une légende accessible et rend les repères recherchables.

Le lecteur déduit aussi automatiquement les repères évidents dans les titres,
sous-titres, puces et cases à cocher existants. Cette déduction est un filet de
sécurité pour les fiches FFVII et Expedition 33 ; pour toute nouvelle
information critique, le marqueur explicite reste préférable. Un seul
pictogramme couvre les objets à trouver : ne pas multiplier les icônes selon le
nom de l'objet. Les autres icônes restent réservées aux alertes de sauvegarde,
de missable, de succès et de boss. Une icône doit signaler une action concrète
et utile à ce moment précis de la route.

L'inférence automatique ne doit pas marquer les lieux par accident : `Gestral
Village`, `Monoco's Station` ou un nom de personnage seul ne sont pas des objets.
Les termes de collecte restent autorisés sur une puce qui décrit effectivement
un journal, un disque, une arme, une récompense ou un autre objet à contrôler.

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

## Lot interface immersive Game Note - 13 aout 2026

- Perimetre : accueil, index de selection et blocs de methode ; le catalogue,
  la recherche, les filtres et le lecteur restent sur leurs donnees existantes.
- Methode : image de route en fond, typographie editoriale, focus de guide et
  navigation par index ; chaque bouton ouvre la meme route que la carte.
- Controle : lint, build Pages, preflight et six smoke tests passent ; le
  repli local de l'artwork est conserve pour les couvertures distantes.
- Limite : le lot ne remplace pas les artworks Steam et ne modifie pas le
  contenu des guides ; une revue visuelle manuelle sur appareils reels reste
  a refaire lors d'une prochaine passe de responsive.

## Lot effets immersifs de l'accueil - 13 aout 2026

- Perimetre : enrichir le premier ecran sans toucher aux donnees des guides ni
  au lecteur de soluces.
- Composition : la couche d'effets ajoute une lumiere reactive au pointeur, un
  grain discret, un faisceau de scan, une trace de route, deux reperes de visee
  et des transitions d'entree/changement d'artwork.
- Interaction : l'index conserve ses boutons et son focus clavier ; son etat
  actif expose la meme route que l'action souris, avec un repli visuel local
  pour les artworks Steam.
- Accessibilite : les effets sont decoratifs, desactives ou neutralises par
  `prefers-reduced-motion`, et ne masquent jamais titre, index ou CTA.
- Validation : la passe doit etre relue en localhost sur grand et petit ecran,
  puis controlee par lint, build, preflight et smoke tests avant commit.
- Limite : l'effet de lumiere est une amelioration d'ambiance, pas un signal
  fonctionnel ; la page doit rester lisible si aucun mouvement n'est affiche.

## Lot accueil simplifie et logo recentre - 13 aout 2026

- Perimetre : retirer les trois cartes de methode visibles sous le hero, ainsi
  que leur ancre et leurs styles devenus inutiles.
- Navigation : le lien de defilement du hero revient vers la bibliotheque afin
  qu'aucun appel vers `#method` ne reste apres la suppression.
- Identite : la marque Game Note est placee au centre de la topbar d'accueil,
  agrandie sur desktop et redimensionnee sur mobile sans modifier le mode
  lecteur.
- Validation : relire le hero, la jonction avec la bibliotheque et le breakpoint
  mobile en localhost, puis lancer lint, build, preflight et smoke tests.
- Limite : les images des anciennes cartes restent disponibles comme assets,
  mais ne sont plus rendues par l'accueil.

## Lot identite du pied de page - 13 aout 2026

- Perimetre : afficher en bas du site `Game Note © 2026.`, la description
  personnelle des soluces Steam 100 %, l'autonomie Android 5+ et la signature
  de developpement MaruChiwa.
- Mise en page : le bloc d'identite reste a gauche, le retour bibliotheque a
  droite sur grand ecran, puis s'empile proprement sur mobile.
- Version : la valeur locale `vX.YY` reste visible en petit repere editorial ;
  elle ne remplace pas le texte d'identite demande.
- Validation : controler le footer reel en localhost et dans la sortie Pages,
  puis lancer lint, build, preflight et smoke tests avant le commit.
- Limite : aucun changement de contenu ou de navigation du lecteur n'est inclus.

## Sortie Pages des guides validés - 13 aout 2026

- La publication temporaire est définie dans `docs/site-publication.json`.
- `public/guides/` reste l'archive complète, mais `dist/client/guides/` ne doit
  contenir que les TXT listés dans `visibleGuideFiles`.
- Le service worker ne doit précacher que ces guides ; une ancienne URL ne
  doit pas être introduite par le cache hors-ligne.
- Toute soluce reconstruite et validée doit recevoir une carte, un identifiant
  visible et une entrée explicite dans cette liste.

## Lot Expedition 33 - première fiche reconstruite par matrice - 13 aout 2026

- La fiche active doit être accompagnée de
  `docs/guide-research/expedition-33-evidence.md`.
- La matrice doit distinguer la source officielle des sources de route, les
  listes de collectibles, les listes de compétences et les pages de rattrapage.
- Toute contradiction de compteur doit être écrite puis tranchée avant de
  modifier le TXT ; pour Monoco, la valeur actuelle retenue est 46 et non 44.
- La validation porte sur les 55 succès, les 49 journaux, les 33 disques, les
  10 Nevrons, les 9 Gestrals, les 5 jeux, les 46 compétences et les 35 scènes.
- La prochaine fiche doit reprendre cette structure et ajouter ses propres
  preuves, sans copier le texte d'Expedition 33.

### Version éditoriale — règle ajoutée le 13 août 2026

- Source unique : `app/site-version.ts`, affichée dans le pied de page au
  format `X.YY` ; la présente livraison initialise le suivi à `1.00` avant
  l'incrément automatique du commit.
- Règle : chaque commit doit augmenter la version du site de `0.01`, sans
  exception pour une correction technique ou une simple mise à jour de
  méthode. Le hook versionné `.githooks/pre-commit` applique l'incrément et
  ajoute le fichier avant la création du commit.
- Contrôles : `scripts/validate-site-guardrails.mjs` vérifie le format, le
  script d'incrément et la présence de la version dans `dist/client/index.html`.
- Limite : la configuration `core.hooksPath=.githooks` est locale au clone et
  doit être réactivée après un nouveau clone ; un commit sans hook doit être
  bloqué ou corrigé avant livraison.

### Publication des guides reconstruits

- Décision : toute soluce reconstruite et validée est ajoutée à
  `docs/site-publication.json`, à `SITE_VISIBLE_GUIDE_IDS` et au cache hors-ligne.
  Les brouillons explicitement en recherche restent exclus et sont signalés
  comme tels.
- Contrôle : `SITE_VISIBLE_GUIDE_IDS` pilote l'accueil, la recherche, les
  filtres, la navigation entre fiches et les ouvertures par URL. Le garde-fou
  vérifie que la sortie Pages correspond exactement aux listes de publication.
- État livré : Expedition 33, Octopath Traveler 1 et Octopath Traveler II sont
  les trois fiches visibles ; OT0 reste un brouillon `research` non publié.

### Lot Octopath Traveler 1 - matrice complète le 13 août 2026

- La fiche Octopath est reconstruite avec cinq familles de sources et sa
  matrice est conservée dans `docs/guide-research/octopath-traveler-1-evidence.md`.
- Le seuil éditorial est concret : 734 coffres avec contenu et repère, 152
  objets cachés avec PNJ, 101 récits avec solution et récompense, puis 381
  entrées Strategist avec zone et boucliers. Une simple liste ou un lien vers
  un tableur ne valide plus la fiche.
- L'ancien PDF à 721 coffres fournit des directions, jamais le compteur final.
  Les divergences de zones, de niveaux ou de noms restent écrites dans la
  matrice avant d'être résolues.
- Les quatre ennemis manquables, Bone, Zeph, Meryl, Bale et le
  Crest-bearing Swindler doivent apparaître avant leur fenêtre de fermeture.
  Le bonus du Herald de Lord Ciaran reste séparé du 152 officiel.
- Le lecteur premium active les marqueurs pour `octopath`. Un seul pictogramme
  `[COFFRE]` couvre les coffres et les objets à récupérer ; les autres
  marqueurs gardent leur sens sauvegarde, manquable, succès ou boss.
- Contrôle avant chaque commit : route, annexes A à F, compteur 88/88,
  spoilers cohérents avec le lot, build Pages, sortie limitée aux guides validés
  actifs et mise à jour coordonnée des garde-fous.

### Lot effets cinétiques de l'accueil - 13 août 2026

- Les nouveaux calques (mot vertical, orbites, parallaxe, lumière du pointeur,
  progression et bandeau) sont décoratifs et restent derrière le contenu
  utilisable.
- Le titre, l'index, les boutons et la bibliothèque doivent rester lisibles
  sans animation ; le mode `prefers-reduced-motion` neutralise les mouvements.
- Le contrôle visuel couvre desktop et mobile, avec vérification du scroll, du
  clavier, de l'absence de débordement horizontal et des tests de livraison.
- Ce lot n'autorise aucune modification des textes de guides, du lecteur ou
  des compteurs de succès.

## Lot catalogue Steam — 13 août 2026

- La capture de bibliothèque est enregistrée dans
  `docs/guide-rebuild-queue.json`, séparément de `docs/site-publication.json`.
  Une entrée de queue n'est ni une carte visible ni une URL publiée.
- Les trois références actives sont Expedition 33, Octopath Traveler 1 et
  Octopath Traveler II ; les autres titres restent archivés jusqu'à leur
  reconstruction par matrice.
- OCTOPATH TRAVELER 0 reste en `research` avec l'AppID 3014320 et 37 succès
  Steam. La fiche de recherche documente ce qui est confirmé et ce qui doit
  encore être recoupé ; aucun guide incomplet ne doit être publié.
- Dota Underlords, Rocket League, Dota 2, Brotato et FINAL FANTASY VII EVER
  CRISIS restent exclus et doivent rester absents de la file des guides actifs.
- Le contrôle de commit vérifie la cohérence de la file avec le catalogue, les
  audits Steam et la publication temporaire, puis conserve le bump de version
  `0.01` et le commit poussé obligatoire.

## Lot recherche OCTOPATH TRAVELER 0 — 13 août 2026

- `octopath-traveler-0` passe en `research` et possède désormais une matrice
  persistante. Le TXT et la carte restent interdits tant que cette matrice ne
  passe pas en état validé.
- Les cinq piliers sont : Neoseeker pour la route, Game8 pour les chapitres et
  systèmes, NightlyGamingBinge pour les récits, la base OT0 pour les registres
  et RPG Site pour le post-game et les équipements uniques. Steam et Square
  Enix restent les autorités de contrôle des compteurs et des fonctions.
- La recherche distingue les 37 succès du reste des compteurs. Elle conserve
  les contradictions sur les 36 personnages, les 454 coffres, les deux fins,
  les musiques 40/30 et les fenêtres de recrutement afin qu'aucune hypothèse
  ne soit transformée en faux missable.
- `validate-site-guardrails.mjs` exige maintenant `evidenceFile` pour toute
  entrée en `research` et vérifie que le fichier existe avant le commit.

## Passe de rédaction OT0 — route archivée — 13 août 2026

- Le TXT de travail est conservé dans l'archive sans carte et sans publication
  temporaire. Sa présence ne change pas la liste visible des trois guides.
- La route couvre prologue, reconstruction, arcs Master/Bestower, recrutements,
  fins, post-game, partitions et équipements uniques ; elle ne passe pas encore
  le seuil final tant que l'appendice des 454 trésors n'est pas intégré.
- Toute ligne de trésor doit devenir un contrôle `[COFFRE]` distinct avec zone,
  sous-zone, section ou condition ; un compteur global sans emplacement est
  refusé, même si le nombre annoncé est correct.
- Le validateur vérifie maintenant, lorsque le brouillon OT0 existe, les 454
  entrées numérotées et les 37 cases Steam finales. Les rappels de route sont
  conservés mais ne sont pas comptés comme des trésors supplémentaires.

### Contrôle de précision — clés ornées OT0

- La passe éditoriale exige huit clés nommées, sans placeholder : Dagger, Sword,
  Axe, Tome, Fan, Polearm/Spear, Staff et Bow.
- La Bow Crest doit être raccordée à East Cyphlo Banks. Ce contrôle reste
  distinct du compteur automatique 454/454 et ne rend pas le guide publiable.

### Contrôle roster et récits secondaires OT0

- Le validateur contrôle 36 fiches de personnages et 57 récits secondaires dans
  le brouillon OT0, en plus des 454 trésors et 37 succès Steam.
- Les omissions de `An Encounter with H'aanit`, `The Monster Arena` ou
  `Greatest Expectations` ou `Unnatural Tremors` bloquent la passe de contrôle.
- Le contrôle exige aussi les cinq zones de fragments, dont le Cat of Graceful
  Bearing à Atlasdam, sans l'ajouter artificiellement aux 454 trésors.
- Les 57 fiches secondaires doivent donner une fenêtre d'accès, un lieu, une
  action ou un combat et une récompense ; un simple catalogue de noms ne suffit
  plus pour passer le contrôle éditorial.

### Contrôle des coffres bleus OT0

- Le TXT doit présenter une checklist dédiée de 44 coffres bleus, reliée aux
  numéros du registre 454/454 et ordonnée pour le retour de nettoyage.
- La condition d'ouverture doit être donnée sans approximation : Église de
  Wishvale construite puis améliorée au rang 3 après Kindlers of the Flame 5.
- Les rappels bleus ne doivent pas créer de faux trésors supplémentaires ; le
  compteur automatique reste fondé uniquement sur les 454 lignes numérotées.

### Contrôle cartographique OT0

- Le TXT doit contenir un index de 37 cartes de zones avant le registre
  numéroté, avec des liens de source complets et un regroupement lisible.
- Une carte peut compléter un manque de direction textuelle, mais elle ne
  transforme pas une zone non vérifiée en zone validée et ne remplace pas la
  relecture écran par écran.

### Couverture cartographique étendue OT0

- L'index Game8 des zones et donjons peut compléter les 37 cartes directes,
  mais doit rester présenté comme une source de navigation externe.
- Le guide doit distinguer lien cartographique, repère de base et contrôle
  réellement vérifié en jeu.
## Lot scène d'entrée et archive monumentale - 13 août 2026

- L'entrée présente une carte, une typographie géante et un lien direct avant
  la révélation de l'accueil ; elle ne doit pas devenir un écran obligatoire.
- La scène principale conserve le titre, l'index, les actions et l'image de
  route sous forme de contenu réel, avec les grands textes décoratifs en
  `aria-hidden`.
- Le contrôle couvre le délai d'entrée, la révélation, le clavier, le mobile,
  l'absence de débordement et le mode `prefers-reduced-motion`.
- Aucun contenu éditorial de guide, compteur Steam ou comportement du lecteur
  n'est inclus dans ce lot visuel.

## Lot nettoyage de composition du hero - 13 août 2026

- La carte centrale est le point focal. Le mur d'archive n'affiche que deux
  repères secondaires et reste limité à une zone qui ne recouvre pas la carte.
- Le titre, les actions et l'index gardent des espaces distincts ; les effets
  sont abaissés en contraste et restent `aria-hidden`.
- Le contrôle couvre desktop, mobile, clavier, mouvement réduit et absence de
  débordement horizontal, puis lint, build, preflight et smoke.
- Ce lot ne touche pas au contenu des guides, aux compteurs Steam ou au lecteur.

## Ajustement final de hiérarchie desktop - 13 août 2026

- Une seule action primaire est visible dans le hero desktop ; les routes
  restent accessibles par l'index réel et par l'appel principal.
- La carte ne recouvre pas la ligne de navigation et l'index ne recouvre pas
  l'introduction ou l'action principale.
- Le contrôle couvre la capture desktop, le mobile, le clavier, le mouvement
  réduit et l'absence de débordement avant les tests de livraison.

## Audit visuel bibliothèque et contraste hero - 13 août 2026

- La bibliothèque active ne laisse plus une troisième colonne vide lorsque deux
  fiches seulement sont visibles ; les cartes occupent deux colonnes équilibrées.
- Le panneau éditorial du hero est élargi et la carte centrale reste le point
  focal avec une image légèrement plus lisible.
- Le contrôle couvre entrée, hero, bibliothèque, pied de page, mouvement réduit,
  débordement horizontal et validations de livraison.
- Ce lot ne modifie aucun contenu de guide, compteur Steam ou comportement du
  lecteur.

## Audit interface personnelle - 13 août 2026

- Les cartes ne montrent plus de badges éditoriaux assimilables à une mise en
  avant commerciale ; les titres, compteurs et types de route restent visibles,
  sans statistiques de vitrine dans le hero.
- Le bandeau de slogans et le bouton PWA flottant disparaissent de l'accueil ;
  le service worker continue de fonctionner silencieusement.
- Le dernier guide ouvert est le point de reprise rouge ; l'historique jaune
  reste local à l'appareil, ordonné par utilisation et limité à cinq fiches.
- L'index des routes reste celui des guides publiés : un historique local incomplet
  ne doit jamais remplacer la bibliothèque ni masquer les autres soluces au retour.
- Le point de reprise et chaque ligne historique réutilisent l'ouverture
  normale de la bibliothèque afin de conserver la progression du lecteur.
- Les statuts hors ligne et les erreurs de route restent conservés car ils
  décrivent l'état réel de l'application.
- Le contrôle couvre l'accueil, la bibliothèque, le lecteur, le clavier, le
  mobile et les validations de livraison.

## Audit visuel des fiches - lisibilité et hiérarchie - 13 août 2026

- La refonte du lecteur ne touche pas aux TXT : elle modifie uniquement la
  classification visuelle, la hiérarchie des titres et l'ordre des panneaux.
- Les étapes numérotées, y compris `10.` et suivantes, utilisent un repère compact
  `guide-step` ; elles ne doivent plus produire de faux grands chapitres.
- Le sommaire ne liste que les sections et sous-sections utiles. Les étapes restent
  présentes dans le corps, avec leurs marqueurs, leur texte et leurs ancres.
- Sur mobile, le corps de la fiche passe avant la colonne de navigation et le
  sommaire est repliable ; aucune perte de recherche, checklist, téléchargement ou
  progression n'est autorisée.
- La validation attendue compare les volumes de blocs avant/après, contrôle zéro
  débordement horizontal et couvre desktop, tablette étroite et mobile.

### Passe de contrôle 9 — fiches de combat OT0

- Le TXT conserve désormais un dossier de 31 fiches boss reliées à la route par
  des références `B-xx` ; chaque fiche distingue faiblesse fixe, faiblesse de
  phase, statut dangereux, ordre des cibles et récompense quand elle est
  vérifiée.
- Le dossier est une aide de jeu et ne remplace ni le registre des 454 trésors,
  ni les 44 coffres bleus, ni les 37 succès. Ces compteurs restent contrôlés par
  leurs sections et leurs validations dédiées.
- Les rencontres dont la source donne des sets dynamiques doivent conserver la
  séquence complète ou renvoyer à Analyze ; une faiblesse relevée dans une seule
  phase ne peut pas être généralisée au combat entier.
- La matrice OT0 garde les URLs Game8 et Neoseeker utilisées pour cette passe et
  conserve le statut archive/invisible tant que les élites et les zones ne sont
  pas relus écran par écran.

## Passe de contrôle 14 — OT0, repères de trésors consolidés

- Les 454 lignes du registre ont désormais un repère de navigation ou une
  condition explicite ; le libellé générique « aucun repère additionnel » est
  bloqué par le validateur.
- Une direction issue d'une source reste une aide de parcours, pas une preuve de
  test en jeu. Les coffres bleus, les élites, les collectes et les boss gardent
  leurs contrôles séparés pour éviter les faux 100 %.
- La clôture de ce lot impose une validation globale puis un seul commit poussé ;
  le bump de version et les garde-fous suivent ce même commit final.

## Passe OT2 — matrice, registres et publication

- Le guide `octopath-traveler-2` est désormais une fiche visible : son TXT est
  présent dans `docs/site-publication.json`, l'index et le cache offline.
- La matrice de preuve recoupe Steam, les Side Stories, les cartes de zones, les
  walkthroughs et la table d'inventaire. Elle impose 33 succès, 67 récits,
  30 Records, 7 Battle-Tested, 16 EX Skills et 69 lieux.
- Le registre canonique contient exactement 632 lignes `[COFFRE]` `#001` à
  `#632`, avec région, sous-zone, contenu et position locale. Les 237 objets
  cachés `H001` à `H237` sont une seconde couche et ne sont jamais additionnés
  aux coffres.
- Une ligne manquante, dupliquée, tronquée ou réduite à un emplacement vague
  fait échouer la validation. Le compteur seul ne vaut pas solution.
- Les icônes de coffre sont activées pour l'identifiant OT2 dans le lecteur ;
  cette couche d'interface ne modifie aucun compteur éditorial.
- La passe se clôt par une validation globale et un seul commit poussé. Le bump
  de version, le workflow et les garde-fous sont inclus dans ce commit final.

## Passe visuelle — cartes Steam resilientes

- Les cartes actives et les couvertures du lecteur utilisent
  `capsule_616x353.jpg`, plus nette que `header.jpg` lorsqu elle est agrandie.
- Une erreur de chargement d'une image externe bascule une seule fois vers
  `public/images/cards/game-note-card-route.png` dans la carte et le lecteur;
  le second echec ne relance pas la boucle.
- Le smoke test controle la source compatible et les replis avant le commit.

## Passe visuelle mobile — reveal de bibliothèque

- Le reveal de la bibliothèque est raccourci sous 680 px pour éviter une zone
  presque noire lors du premier défilement vers les filtres et les fiches.
- La transition reste facultative et décorative : `prefers-reduced-motion`
  conserve un affichage immédiat, sans modifier le contenu ni les compteurs.
- La vérification attendue couvre 320/390 px, desktop, clavier, absence de
  débordement, lint, build, preflight et smoke tests avant le commit puis le
  push.

## Correctif titres et sequences vides - 14 aout 2026

- Le lecteur conserve le niveau des titres Markdown : `#`/`##` structurent les
  sections et `###` devient un sous-titre lisible.
- Le parseur filtre uniquement les titres qui n'ont aucun contenu descendant
  (paragraphe, puce, case, ou etape). Le contenu source reste inchange.
- Le validateur strict examine chaque TXT visible et signale le fichier ainsi
  que les premiers titres vides ; ce controle bloque la publication.

## Sommaire hierarchique - 14 aout 2026

- Le garde-fou exige la presence du modele `GuideOutlineGroup` et interdit le
  retour a un `outline.map` plat.
- Chaque fiche visible doit conserver une navigation a deux niveaux : groupe
  principal puis sous-sections repliables ; les guides sans sections majeures
  utilisent un regroupement stable par prefixe de zone.
- Le controle couvre le desktop, le mobile, le clavier, le build, le preflight,
  le lint et les smoke tests avant le commit puis le push.

## Acces local de verification - 14 aout 2026

- Le depot doit conserver `APERCU_LOCAL.cmd`, le script `preview:local` et le
  port fixe 3000 pour permettre une verification rapide apres chaque commit.
- Le garde-fou verifie l'URL locale et l'appel Vinext ; une suppression du point
  d'entree local bloque la validation.
- Le serveur local est une aide de verification et ne constitue pas une
  publication distante.

## Correctif lecteur - etat du sommaire - 14 aout 2026

- Une verification de lecteur doit ouvrir au moins une fiche via `?guide=...`,
  pas seulement charger la bibliotheque.
- Le handler `onToggle` du sommaire capture `event.currentTarget.open` avant
  l'appel au setter React. Cette valeur ne doit jamais etre relue dans la
  fonction updater, car l evenement peut deja avoir un `currentTarget` nul.
- Le validateur de garde-fous et le smoke test exigent la capture locale et
  refusent le motif dangereux ; une erreur `null.open` bloque toute publication.

## Regle active de livraison - commit et push

- Toute modification terminee est validee, committee puis poussee sur la
  branche de travail avant de cloturer la demande.
- Une demande en lecture seule, une pause ou un blocage externe ne declenche ni
  commit vide ni push.
- Cette regle remplace les anciennes mentions de commit local sans push.

## Correctif rendu des tableaux - 14 aout 2026

- Le garde-fou exige un type de donnees de tableau, un parseur de ligne et un
  conteneur `guide-table-wrap` dans le lecteur.
- Les tableaux Markdown des guides visibles sont controlés sans modification
  du TXT ; sur mobile, les cellules doivent porter le nom de leur colonne pour
  rester comprehensibles dans une carte verticale.
- Le lot est valide par build, preflight strict, audit qualite, lint, smoke tests
  et inspection reelle d une fiche avant le commit puis le push.

## Separation des sequences - 14 aout 2026

- Le garde-fou exige la classification `title`/`route`/`reference` avant le
  rendu des grands titres.
- Seuls les blocs `route` peuvent produire `SEQUENCE XX` et compter dans la
  route ; les alertes, regles, checklists, registres et annexes restent des
  dossiers de reference.
- Le smoke test et l audit visuel couvrent OT1, OT2 et Expedition 33, avec les
  deux categories du sommaire et sans debordement mobile.

## Garde-fou - toute demande doit etre ajoutee - 14 aout 2026

- Toute demande d ajout doit laisser une trace dans la source appropriee et
  dans le flux de publication : jeu, guide, succes, objet, coffre, annexe,
  icone, catalogue, queue et rendu utilisateur selon le cas.
- Le controle echoue si un element demande est seulement cite dans une note,
  ou si une entree `queued`/`planned` disparait sans transition explicite.
  Aucune suppression par omission silencieuse n est autorisee.
- Une ancienne fiche peut etre invisible, mais elle doit rester preservee et
  etiquetee archive, planned, queued ou visible ; ces etats ne sont pas
  interchangeables.

## Garde-fou - noms Steam francais verifies - 14 aout 2026

- Chaque guide visible avec succes Steam doit avoir une entree dans
  `docs/steam-achievements-fr.json`, avec AppID, source Steam `?l=french`,
  fichier, format et liste complete dans l ordre de la checklist publiee.
- Le validateur compare chaque intitulé du TXT au registre : nombre, ordre,
  accents, ponctuation et capitalisation. Un nom anglais, une traduction
  litterale ou un intitulé invente bloque la publication.
- Les conditions et descriptions peuvent rester redigees en francais pour la
  route, mais le nom affiche doit etre l intitulé officiel francais de Steam.

## Garde-fou - methode de soluce complete

- La preuve minimale est une lecture croisee de cinq familles de sources,
  avec matrice des divergences et compteurs retenus avant rédaction.
- Le contenu attendu couvre la route chronologique, les solutions, lieux,
  coffres, objets, missables, quetes, combats, fins, rattrapages et succes ;
  spoilers autorises et aucune information utile masquee.
- Le TXT ne doit perdre aucune ligne utile. Les sequences ne regroupent que la
  route jouable ; les annexes, alertes, registres, compteurs et checklists sont
  des dossiers de reference distincts.
- `[COFFRE]` est l icone editoriale commune des coffres et objets a trouver ;
  le lecteur peut proposer des icones premium, mais la collection reste
  volontairement limitee et coherente.

## Garde-fou - cloture de chaque modification

- Le lot est controle par catalogue, guides, build, preflight strict, audit
  qualite, lint, smoke tests, inspection locale desktop/mobile et diff final.
- Le hook augmente la version du site de `0.01` au commit. Une modification
  terminee est committee puis poussee ; une question, une pause, une lecture
  seule ou un blocage externe ne cree ni commit vide ni push.

## Garde-fou - protocole obligatoire a chaque commit - 14 aout 2026

Chaque commit de modification doit suivre cette chaine complete, sans exception
liee au type de fichier :

1. cadrage de la demande, `git status`, diff initial et protection des travaux
   existants ;
2. integrer chaque ajout dans la source, le catalogue, la queue,
   les registres, les composants et le rendu concernes ;
3. pour une soluce, lecture croisee d au moins cinq familles de sources, matrice
   des divergences, route exhaustive 100 % jeu + Steam, noms officiels Steam
   francais et `[COFFRE]` pour les objets a trouver ;
4. separation stricte entre sequences jouables et dossiers de reference, sans
   perte d information du TXT ;
5. validation catalogue + guides, garde-fous, build, preflight strict, audit
   qualite, lint, smoke tests, diff final et verification locale desktop/mobile ;
6. controle de la version `+0.01`, du perimetre staged et du commit unique,
   puis pousser la branche. Si le site est modifie, le meme commit doit etre
   enregistre et deploye.

Le garde-fou refuse un commit qui transforme une demande en simple note, omet un
element, invente un nom de succes, melange route et annexes, masque un echec de
validation ou reste seulement local.

## Garde-fou - lecture claire des soluces - 14 aout 2026

- Le titre de la fiche ne compte pas comme sequence et ne peut pas etre rendu
  une seconde fois dans le corps du guide.
- Le lecteur doit exposer une route visible et chronologique, puis isoler les
  informations preparatoires et les annexes dans deux panneaux repliables.
- Les dossiers ne doivent jamais perdre le texte du TXT : ils changent la
  presentation, pas le contenu. La recherche conserve l ordre d origine et
  permet de retrouver les blocs filtres.
- Le garde-fou visuel exige une fiche reelle controlee sur desktop et 390 px,
  avec route lisible, panneaux repliables, recherche fonctionnelle et aucun
  debordement horizontal.

## Garde-fou - retour fiche vers bibliotheque - 14 aout 2026

- Le retour doit afficher une bibliotheque utilisable, pas seulement conserver
  les cartes dans le DOM : `#guides` doit etre visible et son opacite doit etre
  superieure a zero.
- Le cycle de vie de l effet `IntersectionObserver` doit etre reactive quand
  `readerMode` remonte ou demonte la bibliotheque ; le marqueur est controle par
  `validate-site-guardrails.mjs` et `site-smoke.test.mjs`.
- La verification locale couvre fiche -> retour -> fiche et le bouton precedent
  du navigateur, avec controle des cartes, du sommaire et du debordement.

## Garde-fou - orientation active du lecteur - 14 aout 2026

- La route jouable doit etre decoupee en cartes de sequence distinctes, sans
  creer de sequence artificielle ni supprimer un bloc du TXT.
- La carte active doit suivre `activeRouteId` et rester secondaire par rapport
  au titre, au sommaire et au texte reel de la fiche.
- Les cartes, les tableaux, les sous-sections et les marqueurs doivent rester
  lisibles sur desktop et a 390 px, sans debordement horizontal ni mur de texte
  impossible a parcourir.

- La barre de lecture doit exposer la sequence en cours ou a suivre et sa
  position ; le sommaire doit porter `aria-current` sur les reperes actifs.
- La sous-section active est surlignee quand elle est visible dans la route.
  Les compteurs de sous-sections sont des aides visuelles, jamais une source
  de contenu a la place du TXT.
- Le garde-fou controle les marqueurs React et CSS de cette orientation, puis
  la verification locale doit observer un changement de sequence au scroll.


## Garde-fou - homepage inspiree d une direction terminal - 14 aout 2026

- La reference de style est traduite en motifs reutilisables : capsule fixe,
  hero sombre, accent vert fluorescent, surface claire, grille technique et
  cartes editoriales ; aucune donnee de guide n est remplacee par un decor.
- La passe active reste limitee a `app/globals.css` et ne change ni le TXT,
  ni le catalogue, ni le rendu structurel du lecteur ; toute extension doit
  repasser le controle de perimetre.
- Le controle local couvre le premier ecran, l acces a l index, la recherche,
  les filtres, les cartes et le pied de page sur desktop et 390 px. Le lecteur
  conserve sa presentation et doit rester controle sur une fiche reelle.
- Le lot est livre seulement apres build, preflight, audit qualite, lint,
  smoke tests et verification de l absence de debordement horizontal.

## Garde-fou - covers pleine largeur 16/9 - 14 aout 2026

- Dans une fiche, l artwork doit couvrir toute la cover en ratio `16 / 9` ;
  aucune mise en page ne doit reduire l image a une colonne laterale.
- Le texte de la fiche est superpose en bas a droite dans un degrade de contraste
  stable, avec un titre, une description, les compteurs, les badges et la reprise lisibles.
  L alerte reste une bande pleine largeur et ne doit pas masquer le contenu.
- Les images Steam automatiques utilisent `capsule_616x353.jpg` dans la carte et
  le lecteur afin d eviter l agrandissement flou du `header.jpg` 460 px.
- Sous 760 px, le fond reste plein cadre mais la hauteur peut s adapter au
  contenu ; l image reste en `object-fit: cover` et aucun debordement horizontal
  n est accepte.
- La verification controle Expedition 33, OT1 et OT2 sur desktop et 390 px,
  puis ratio, chargement des images, visibilite de l alerte, build, preflight,
  audit qualite, lint et smoke tests.

## Garde-fou - identite des dossiers et recherche lisible - 14 aout 2026

- La route jouable reste coral, le panneau preparatoire est or et les dossiers
  de reference sont bleus ; aucun de ces styles ne doit se substituer au TXT.
- Chaque resultat de recherche est presente dans un bloc visuel separe, en
  conservant l ordre et le contenu du bloc source.
- La verification couvre les ouvertures et fermetures des panneaux, une
  recherche a plusieurs resultats, desktop, 390 px et l absence de debordement.

## Garde-fou - etapes numerotees du parcours - 14 aout 2026

- Les blocs `step` numerotes heritent de la section active et restent dans la
  route ; ils ne peuvent pas disparaitre lors du decoupage des dossiers.
- La classe compacte ne concerne que les sequences avec au plus un bloc de
  contenu et ne masque jamais une etape, un coffre, un objet ou un succes.
- Le controle visuel verifie Expedition 33 sur Spring Meadows, Flying Waters
  et Stone Wave Cliffs, desktop et 390 px, avec le texte des etapes present.

## Garde-fou - bandeau terminal et barre de lecture - 14 aout 2026

- Le bandeau fixe du lecteur et la barre de recherche/progression doivent avoir
  deux zones distinctes ; aucun controle ne peut etre masque par le bandeau.
- L offset desktop de `.reader-tools` doit depasser la hauteur du bandeau ; le
  comportement mobile doit rester dans le flux, sans zone morte supplementaire.
- Le controle visuel couvre une sequence ouverte depuis le sommaire, desktop,
  390 px, clavier et absence de debordement horizontal.

## Garde-fou - rythme des sequences et sommaire mobile - 14 aout 2026

- Le rail de chaque sequence reste identifiable pendant le défilement avec son
  numéro, sa route et ses sous-sections ; il ne remplace pas le sommaire.
- Paragraphes, listes, cases, étapes et tableaux utilisent des traitements
  visuels distincts pour éviter le mur de texte, sans supprimer ni réécrire le
  contenu du TXT.
- Sous 760 px, le sommaire est placé avant le document, fermé par défaut et
  accessible depuis un contrôle clairement étiqueté ; la route reste intacte.
- La vérification couvre une fiche longue, une sous-section, une liste, un
  tableau, le sommaire ouvert puis fermé, desktop, 390 px et l absence de
  debordement horizontal avant le commit.

## Garde-fou - barre mobile compacte et largeur utile - 14 aout 2026

- Sous 760 px, la barre de lecture place l identite de la fiche et la route
  active sur deux colonnes, avec la recherche et les indicateurs conserves dans
  des zones lisibles et accessibles ; elle reste dans le flux pour ne pas
  recouvrir le debut d un panneau ou d une sequence.
- La route jouable doit utiliser la largeur disponible apres ses conteneurs :
  aucune sous-section ne doit devenir une colonne inutilement etroite, et le
  TXT reste integralement present et dans son ordre.
- Sur desktop, les metadonnees de sequence et les ancres de sous-section restent
  sous la barre de lecture ; elles ne peuvent pas etre masquées par un rail
  sticky concurrent.
- Le controle couvre 390 px, largeur du corps, largeur de la carte, titre de
  sous-section, liste, case, absence de debordement et validations completes.

## Garde-fou - largeur des panneaux mobiles - 14 aout 2026

- Sous 760 px, le lecteur force `.reader-layout` et `.reader-sidebar` a
  s etirer sur la largeur utile ; un sommaire replie ne doit pas produire une
  colonne vide a droite.
- Le controle verifie une hierarchie mobile explicite, le sommaire ferme puis
  ouvert, une fiche reelle, la recherche, une ancre de route et l absence de
  debordement horizontal.
- La cloture exige ensuite build, preflight strict, audit qualite, lint et
  smoke tests avant commit, push et deploiement.

## Garde-fou - composition desktop large du home - 14 aout 2026

- A partir de 1440 px, la scene d accueil recentre `.portfolio-hero-grid` et
  separe le titre, `.hero-focus` et `.hero-index` ; aucune collision visuelle
  entre ces trois zones n est acceptee.
- La typographie du titre se resserre dans cette largeur et la carte focale
  reste dans sa colonne ; le decor typographique reste secondaire.
- Le controle couvre 1280, 1440, 1920 et 390 px, l animation d entree, le
  debordement horizontal, puis build, preflight, audit qualite, lint et smoke
  tests avant commit, push et deploiement.

## Garde-fou - composition tablette et largeur utile a 320 px - 14 aout 2026

- Entre 681 et 980 px, `.portfolio-hero-grid` passe en deux colonnes : copie a
  gauche, `.hero-focus` a droite et `.hero-index` sous la fiche. Une collision
  ou une colonne de titre comprimee fait echouer la passe visuelle.
- Sous 340 px, `html` et `body` peuvent abandonner la largeur minimale de 320 px
  pour tenir compte de la barre de defilement classique ; aucun bord fixe ne
  doit etre coupe dans un viewport de 320 px.
- Le controle couvre 681, 768, 800, 980, 390 et 320 px, les titres longs, les
  tableaux, la recherche, les ancres, le clavier et l absence de debordement,
  puis build, preflight strict, audit qualite, lint et smoke tests avant le
  commit, le push et le deploiement.

## Garde-fou - confinement du contenu des panneaux mobiles - 14 aout 2026

- Les panneaux de lecture `AVANT DE COMMENCER`, `PARCOURS CHRONOLOGIQUE` et
  `DOSSIERS DE REFERENCE` partagent le meme garde-fou de largeur ; une etape,
  un titre ou un libelle long ne doit jamais sortir de sa carte et etre coupe.
- Sous 760 px, `.guide-lane-content`, `.guide-route-sequence-list`,
  `.guide-sequence-card`, les blocs de texte et `.guide-step-copy` doivent
  rester a `min-width: 0` et `max-width: 100%`; `overflow-wrap: anywhere` gere
  les tokens longs sans enlever le texte source.
- Le controle couvre Expedition 33, OT1 et OT2 a 320, 390, 768 et 1280 px,
  plus une largeur extreme reproduisant la capture. Il mesure les descendants,
  le debordement du document et les erreurs console avant build, preflight,
  audit qualite, lint, smoke, commit, push et deploiement.

## Garde-fou - gouttiere des fleches des puces - 14 aout 2026

- Sous 960 px, `.guide-bullet-arrow` doit conserver une gouttiere de 25 px
  avant `.guide-bullet-copy`; le repere ne peut pas recouvrir un marqueur ou le
  premier caractere de la ligne.
- Le controle mesure les puces avec et sans `.guide-marker-row` a largeur
  extreme, 320, 390 et 768 px, puis verifie l absence de debordement et les
  validations completes avant commit, push et deploiement.

## Garde-fou - premiere vue et cibles tactiles du lecteur - 14 aout 2026

- La couverture du lecteur doit laisser 96 px sous la barre fixe sur desktop et
  76 px sous 760 px ; aucune action ne doit etre recouverte par le chrome fixe.
- Les boutons `.reader-backlink` et `.reader-resume` gardent une hauteur
  minimale de 40 px sur mobile et une surface contrastee sur l artwork.
- `terminal-pass-eight.css` ne fournit que des signaux decoratifs ; ses
  animations doivent etre neutralisees par `prefers-reduced-motion`.
- Le controle mesure la premiere vue, les cibles, le focus, le debordement et la
  console sur 390, 768 et 1280 px avant les validations completes.

## Garde-fou - finition visuelle editoriale - 15 aout 2026

- La couche Terminal existante reste une couche de finition : profondeur, cadres
  et etats actifs uniquement ; aucun contenu fonctionnel ne doit y etre ajoute.
- Le controle couvre le hero, le header, l index actif, la bibliotheque et la
  couverture du lecteur sur 390, 768 et 1440 px.
- Les transitions et effets de cette couche sont neutralises avec
  `prefers-reduced-motion`.

## Garde-fou - filtres de bibliotheque lisibles sur mobile - 14 aout 2026

- Sous 760 px, `.library-filters` revient a la ligne et garde chaque bouton
  entierement visible ; aucun choix ne doit dependre d une barre horizontale
  masquee.
- Le controle couvre 390 px et 320 px, les cinq libelles, le debordement
  horizontal, puis build, preflight strict, audit qualite, lint et smoke tests.

## Garde-fou - audit final groupe des trois guides - 15 aout 2026

- Le lot visible est exactement Expedition 33, Octopath Traveler 1 et Octopath
  Traveler 2. Octopath Traveler 0 reste archive, non visible et hors de cette
  certification.
- Le controle strict doit retrouver 55, 88 et 33 succes Steam, puis les
  compteurs de collecte Expedition 49/33/10/9/5/46/35, OT1 734/152/101/381 et
  OT2 67/30/7/16 avec les registres distincts 632/237.
- Pour OT2, le parcours de fin est impose : 66 Side Stories preparatoires,
  sauvegarde S4, The Journey for the Dawn, epilogue, puis A Gate Between Worlds
  apres les credits. Une ligne A Gate ne doit jamais etre comptee comme une
  68e Side Story.
- Le lot doit passer l audit visuel reel a 390, 768, 1280 et 1440 px, puis le
  build, le preflight strict, l audit qualite, le lint, les smoke tests, le
  commit, le push et le deploiement.
