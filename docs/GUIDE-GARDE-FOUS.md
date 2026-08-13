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
redemande une version sans spoiler, cette décision doit être inscrite comme
limite du lot concerné plutôt que supposée pour tous les guides.

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
  et ne demande plus une formule « sans spoiler » ; il contrôle désormais la
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
  de chaque type et Enemy Skill, puis la construction Pages avant le commit local.

### Lot FFVII — audit croisé des matérias et Enemy Skills

- Contrôle ajouté : les 83 types ne sont plus seulement listés dans la section
  Materia Overlord ; Revive, Seal, Enemy Lure, Kjata et Typhoon ont une étape
  d'obtention explicite, et les 24 Enemy Skills ont toutes une occurrence de
  route ou de checklist vérifiable.
- Contrôle de cohérence : le nom du type affiché dans le catalogue est aligné
  sur la route, notamment Kjata, Typhoon, Flame Thrower et Goblin Punch.
- Limite restante : validation ciblée de cette passe, construction Pages et
  commit local avec les trois fichiers de garde-fous.

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
spoiler », de stages, d'Arcade ou d'un autre périmètre est une erreur de fiche.

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

## Sortie Pages limitée au lot en refonte - 13 aout 2026

- La publication temporaire est définie dans `docs/site-publication.json`.
- `public/guides/` reste l'archive complète, mais `dist/client/guides/` ne doit
  contenir que `expedition-33.txt` et `octopath-traveler-1.txt`.
- Le service worker ne doit précacher que ces deux guides ; une ancienne URL ne
  doit pas être introduite par le cache hors-ligne.
- Toute réactivation d'une autre fiche passe par une nouvelle matrice de
  sources, une validation de contenu et une modification explicite de cette
  liste.

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

### Publication temporaire — Expedition 33 et Octopath Traveler 1

- Décision : les anciennes soluces sont mises de côté pendant la refonte. Les
  fichiers TXT et les données de catalogue sont conservés dans le dépôt, mais
  l'interface ne publie temporairement que `expedition-33` et
  `octopath` (Octopath Traveler 1).
- Contrôle : `SITE_VISIBLE_GUIDE_IDS` pilote l'accueil, la recherche, les
  filtres, la navigation entre fiches et les ouvertures par URL. Le garde-fou
  vérifie que la sortie Pages ne contient exactement que deux cartes visibles.
- Méthode : ces deux fiches sont les premiers guides reconstruits avec cinq
  familles de sources, une matrice d'informations, une résolution des
  contradictions et un audit final route/objets/succès.
- Limite : aucune ancienne fiche ne doit être remise en ligne sur simple
  demande de catalogue ; elle repasse par la nouvelle méthode avant publication.

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
  absence de « sans spoiler », build Pages, sortie limitée aux deux guides
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
- Les deux références actives restent Expedition 33 et Octopath Traveler 1 ;
  les neuf autres titres à route chronologique de la capture restent archivés
  jusqu'à leur reconstruction par matrice.
- OCTOPATH TRAVELER 0 est ajouté en `planned` avec l'AppID 3014320 et 37 succès
  Steam. La fiche de recherche documente ce qui est confirmé et ce qui doit
  encore être recoupé ; aucun guide incomplet ne doit être publié.
- Dota Underlords, Rocket League, Dota 2, Brotato et FINAL FANTASY VII EVER
  CRISIS restent exclus et doivent rester absents de la file des guides actifs.
- Le contrôle de commit vérifie la cohérence de la file avec le catalogue, les
  audits Steam et la publication temporaire, puis conserve le bump de version
  `0.01` et le commit local obligatoire.

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
  temporaire. Sa présence ne change pas la liste visible des deux guides.
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
- Le point de reprise et chaque ligne historique réutilisent l'ouverture
  normale de la bibliothèque afin de conserver la progression du lecteur.
- Les statuts hors ligne et les erreurs de route restent conservés car ils
  décrivent l'état réel de l'application.
- Le contrôle couvre l'accueil, la bibliothèque, le lecteur, le clavier, le
  mobile et les validations de livraison.

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
- La clôture de ce lot impose une validation globale puis un seul commit local,
  sans push automatique ; le bump de version et les garde-fous suivent ce même
  commit final.

## Passe OT2 — matrice, registres et publication protégée

- Le guide `octopath-traveler-2` est traité comme un brouillon archive : son
  TXT peut être enrichi sans le rendre visible ni l'ajouter au cache offline.
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
- La passe se clôt par une validation globale et un seul commit local. Le bump
  de version, le workflow et les garde-fous sont inclus dans ce commit final,
  sans push automatique.

## Passe visuelle — cartes Steam resilientes

- Les cartes actives utilisent `header.jpg`, plus largement disponible que
  `header_2x.jpg` pour les anciens jeux Steam.
- Une erreur de chargement d'une image externe bascule une seule fois vers
  `public/images/cards/game-note-card-route.png` dans la carte et le lecteur;
  le second echec ne relance pas la boucle.
- Le smoke test controle la source compatible et les replis avant le commit.
