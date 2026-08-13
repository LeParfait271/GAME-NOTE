# Règles Game Note

Ce fichier est la source de vérité des garde-fous du site. Il reprend les
conventions utiles de Cook Note, adaptées à un catalogue de jeux et à un site
statique Cloudflare Pages.

## Lois qualité permanentes

- Ne pas dégrader : chaque changement doit améliorer la fiabilité, la
  sécurité, la lisibilité, l'accessibilité, la performance ou la maintenance.
- Garder les changements dans leur périmètre. Les soluces ajoutées par
  l'utilisateur et les fichiers docs/ ne sont pas des fichiers de nettoyage.
- Ne jamais supprimer ou remplacer un guide, une carte ou une entrée de
  catalogue sans preuve et sans demande explicite.
- Documenter toute convention nouvelle et ajouter un contrôle automatisé
  lorsqu'elle est vérifiable.
- Après chaque modification du dépôt, créer un commit Git local décrivant le
  lot réalisé ; ne jamais pousser automatiquement vers GitHub.
- Aucun commit n'est complet sans une mise à jour coordonnée du workflow et des
  garde-fous dans `A_LIRE_EN_PREMIER.md`, `GAME_NOTE_RULES.md` et
  `docs/GUIDE-GARDE-FOUS.md`. Cette mise à jour doit résumer le périmètre, les
  contrôles exécutés et les limites restantes du lot ; elle ne doit pas être
  une simple modification vide destinée à satisfaire la règle.
- Ne pas versionner de secret, de clé privée, de fichier .env ou d'artefact
  local.

## Catalogue et contenu

- Chaque carte de app/page.tsx doit avoir un identifiant unique, un fichier TXT
  existant, une entrée dans docs/guide-catalog.json et un audit dans
  docs/steam-audit.json.
- Chaque entrée active ou spéciale du catalogue doit avoir une carte et un TXT.
  Pendant la rédaction, une entrée sans carte est signalée comme « en attente » ;
  avant publication, npm run preflight:strict doit la refuser. Les cartes et les
  TXT doivent rester synchronisés.
- Un guide actif doit conserver une route chronologique, son périmètre Steam,
  ses alertes missables et sa politique de révélations. Quand le propriétaire
  autorise les spoilers, l'exhaustivité prime sur la dissimulation narrative.
  Les guides spéciaux peuvent documenter explicitement l'absence de succès
  Steam.
- La fiche FFVII de référence doit conserver une route par zone et un bloc
  `AVANT DE SORTIR` pour chaque étape importante ; ce bloc reste court et ne
  remplace pas les emplacements détaillés des objets.
- Pour FFVII, chaque objet doit être classé avant d'être marqué comme
  manquable : fenêtre unique, récupérable plus tard en boutique, ou récompense
  optionnelle. Une route ne doit jamais transformer un objet achetable plus
  tard en faux missable ; elle doit aussi distinguer une matéria, un objet
  consommable, un équipement et une compétence ennemie avant d'ajouter un
  repère visuel.
- Pour les mini-jeux FFVII, conserver le déclencheur, le résultat et le barème
  exacts. Une récompense conditionnelle, un équipement volé et une matéria
  posée au sol doivent être vérifiés même s'ils ne sont pas liés à Steam ; le
  guide doit dire clairement si l'objet est unique, achetable plus tard ou
  facultatif.
- Les donjons FFVII à passage unique doivent avoir un ordre de branches, un
  contrôle d'énigme et un point de sauvegarde avant le boss. Les objets obtenus
  par une interaction, une chute, une fouille ou un combat doivent figurer dans
  le checkpoint de la zone ; une liste de noms sans emplacement concret ne
  passe pas le seuil de profondeur.
- Une séquence FFVII sans objet doit être signalée comme telle : elle ne doit
  pas recevoir de faux coffres pour remplir une fiche. À Mideel, les trois
  boutiques, le chocobo blanc, la clé et l'Elixir sont des contrôles séparés.
  Pour une Huge Materia, la fiche doit distinguer la mission, le combat direct,
  le butin volé, le code, la récompense annexe et la condition de rattrapage.
- Pour FFVII Steam, Materia Overlord est un contrôle séparé du simple inventaire :
  la fiche compte 83 types, 79 maîtrisables, les quatre exceptions à conserver,
  une Enemy Skill complète de 24 compétences et l'interdiction de convertir une
  copie MASTER avant le succès.
- Le catalogue FFVII ne valide pas un collectible par son seul nom : chacun des
  83 types de matéria et chacune des 24 Enemy Skills doit avoir une occurrence
  de route avec emplacement, boutique, récompense ou ennemi d'apprentissage.
- Pour Expedition 33, les spoilers autorisés ne dispensent pas de méthode : la
  route doit placer dans l'ordre les 55 succès Steam, les 49 journaux, les 33
  disques, les 10 quêtes de Névrons, les 9 Gestrals perdus, les 5 jeux de
  Gestrals, les 46 compétences de Monoco et les 35 rangs de relations. Chaque
  collectible doit avoir une zone, un écran ou un repère concret ; « explore
  la zone » seul est refusé.
- Pour Expedition 33, séparer les fenêtres réellement manquables des objets
  récupérables en post-game. Le guide doit signaler avant la transition le
  Mime du prologue, la Lettre à Maelle après le premier Axon et le choix
  Truth de Maelle au rang 7 ; les autres retours possibles ne doivent pas être
  transformés en faux missables. Les révélations d'histoire, les identités,
  les fins et les conséquences de choix sont permises lorsque la fiche est
  explicitement demandée avec spoilers.
- La fiche Expedition 33 doit conserver ses annexes de localisation avec la
  route : chaque journal, disque, quête de Nevron, Gestral perdu, jeu gestral
  et compétence de Monoco doit avoir un repère ou une condition. Le contrôle
  final doit compter exactement 55 cases Steam et ne doit pas absorber les
  compteurs de collection dans une seule liste générique.
- Le build Pages Windows peut terminer Vinext par une assertion `UV_HANDLE_CLOSING`
  dont le numéro de ligne varie selon Node. `scripts/build-pages.mjs` ne peut
  tolérer ce signal que si la sortie statique existe, puis doit encore préparer
  et valider `dist/client` ; une sortie présente seule ne vaut pas validation.
- Les repères visuels validés sont activés sur `final-fantasy-vii-2013` et
  `expedition-33`. `[COFFRE]` couvre tous les objets à récupérer (coffres,
  matérias, collectibles et récompenses) ; les marqueurs `[SAUVEGARDE]`,
  `[MANQUABLE]`, `[SUCCES]` et `[BOSS]` restent réservés aux alertes
  correspondantes. Le contenu doit rester découpé en une action par ligne :
  une suite de cases ou d'actions dans un paragraphe est refusée, même si le
  TXT reste techniquement lisible.
- Dans ces deux fiches premium, une case `[ ]` d'annexe ou de contrôle de route
  devient un suivi local distinct ; plusieurs cases sur une même ligne doivent
  être séparées au rendu. Seules les cases placées dans la checklist Steam
  alimentent le compteur des succès.
- La carte catalogue d'un guide premium doit rester synchronisée avec son TXT :
  périmètre, spoilers, compteurs, missables et description doivent parler du
  même jeu. Une carte qui conserve un résumé d'un autre jeu ou « sans spoiler »
  pour une fiche à révélations autorisées est un défaut de publication.
- L'inférence `[COFFRE]` doit être contextuelle : elle peut marquer une ligne qui
  donne un journal, disque, arme, Picto, récompense ou collectible, mais pas un
  simple titre de zone comme `Gestral Village`. Toute extension du vocabulaire
  doit être relue dans le sommaire et dans le premier écran de route.
- Les textes ne doivent pas contenir de caractère de remplacement UTF-8 (�),
  de contenu vide ou de doublon d'identifiant.
- Les nouvelles cartes doivent garder un nom accessible pour chaque bouton et
  une illustration qui possède un texte alternatif.

## Build, cache et Cloudflare

- Le site livré est l'export statique de npm run build dans dist/client.
- dist/client/ est généré, jamais bricolé à la main.
- Le service worker ne précache que des URLs réellement présentes dans la
  sortie. Son cache doit être fingerprinté par le contenu du build.
- Les pages HTML, le manifeste, le service worker, le sitemap et les routes
  canoniques restent en réseau d'abord ou sans cache long.
- Les assets statiques versionnés peuvent être immuables, mais aucune URL
  supprimée ne doit rester dans le cache.
- public/_headers, public/_redirects, robots.txt, sitemap.xml et wrangler.toml
  doivent rester cohérents avec le build Pages.
- La CSP ne doit pas autoriser unsafe-eval. Les scripts critiques restent
  locaux ; les images Steam externes sont limitées aux domaines déclarés.

## UX, accessibilité et hors-ligne

- Le document garde lang="fr", un lien d'évitement, des labels explicites,
  des noms accessibles, des états de chargement/erreur/absence et une
  navigation clavier.
- Les recherches doivent fonctionner sans accent et l'état vide doit proposer
  une récupération simple.
- Les raccourcis clavier ne doivent pas intercepter la frappe dans un champ.
- Le thème clair/sombre doit utiliser les tokens CSS et conserver un contraste
  lisible.
- Le mode hors-ligne doit signaler son état sans masquer le lecteur ni promettre
  qu'un guide jamais mis en cache est disponible.
- Le service worker ne doit pas produire de logs runtime.

## Performance et sécurité

- Garder un budget contrôlé pour le HTML initial, les bundles JS/CSS et le
  service worker. Ne pas précacher un gros bundle différé uniquement pour faire
  passer un test.
- Vérifier la sortie réelle plutôt que les seuls fichiers source : parité des
  TXT, assets référencés présents, chemins Cloudflare valides et absence de
  répertoires de développement dans dist/client/.
- Toute entrée utilisateur doit rester locale et non exécutée. Ne pas injecter
  de HTML construit depuis une recherche ou un contenu de guide.

## Boucle de validation

Après une modification visible :

    npm run lint
    npm run build
    npm run preflight
    npm test

npm run preflight ne construit ni ne déploie : il contrôle l'artefact déjà
produit. En cas d'échec, corriger la cause puis relancer toute la boucle.

## Compte rendu

Un compte rendu doit indiquer les fichiers touchés, les validations passées,
les vérifications non réalisées, les risques restants et la configuration
Cloudflare attendue. Aucun commit, push ou déploiement n'est implicite.

## Version éditoriale et commits

La version visible de Game Note est la constante `SITE_VERSION` de
`app/site-version.ts`, au format `X.YY`. Un commit livré doit toujours faire
progresser cette valeur de `0.01`, y compris un commit technique, de contenu ou
de garde-fous. Le hook versionné `.githooks/pre-commit` exécute
`scripts/bump-site-version.mjs` puis ajoute la version modifiée au commit ; la
configuration locale doit pointer vers `.githooks` avec `core.hooksPath`.
Le contrôle de site refuse une constante absente, mal formée ou non affichée
dans la sortie Pages. Un contournement par `--no-verify` n'est acceptable que
pour diagnostiquer un blocage, jamais pour livrer une modification.

## Publication des fiches reconstruites

`docs/site-publication.json` et `SITE_VISIBLE_GUIDE_IDS` doivent rester synchronisés.
Toute soluce reconstruite et validée est ajoutée à ces deux listes, puis devient
accessible depuis l'index, la recherche, les boutons précédents/suivants, l'URL
du guide et le cache hors-ligne. Seuls les brouillons explicitement en recherche,
comme OT0, restent hors publication jusqu'à leur validation éditoriale.

## Lot interface immersive Game Note - 13 aout 2026

- L'accueil peut utiliser une composition plein écran, une image de route et
  une indexation interactive, mais le titre, l'index et l'acces a la
  bibliotheque doivent rester lisibles sans animation.
- Les changements d'etat au survol doivent avoir un equivalent clavier et
  conserver un vrai bouton ou lien accessible pour ouvrir chaque guide.
- Les illustrations de couverture distantes doivent avoir un visuel local de
  repli afin de ne pas rendre l'accueil vide hors ligne ou sur reseau lent.
- Un lot d'interface doit repasser par lint, build, preflight et smoke tests
  avant le commit ; la sortie Pages et le cache hors ligne restent controles.

## Lot effets immersifs de l'accueil - 13 aout 2026

- Perimetre : profondeur visuelle du hero uniquement ; les guides, le catalogue,
  la recherche, le mode lecteur et les donnees existantes restent inchanges.
- Effets ajoutes : lumiere reactive au pointeur, grain anime, faisceau de scan,
  reperes de route, entree progressive, transition d'artwork et etat actif de
  l'index renforce.
- Garde-fou : chaque effet reste decoratif et non bloquant ; l'information et
  les controles restent presents lorsque les animations sont reduites, au
  clavier ou sur petit ecran.
- Controle attendu : verifier le rendu reel en localhost sur desktop et mobile,
  puis relancer lint, build, preflight et les smoke tests avant le commit.
- Limite : la lumiere suit le pointeur uniquement sur une surface compatible ;
  aucun effet ne doit etre considere comme une dependance du contenu hors ligne.

## Lot accueil simplifie et logo recentre - 13 aout 2026

- Perimetre : suppression du bloc de presentation Route / Lecture / Archive et
  de ses liens morts ; le hero, l'index et la bibliotheque restent en place.
- Composition : le logo Game Note devient le point focal centre de la barre
  d'accueil, avec une taille augmentee et un ajustement dedie au mobile.
- Garde-fou : aucun contenu de guide, artwork source ou controle de lecteur ne
  doit etre supprime avec cette section decorative.
- Controle attendu : verifier l'absence d'ancre `#method`, le centrage reel du
  logo, le rendu mobile, puis relancer lint, build, preflight et smoke tests.
- Limite : le centrage concerne l'accueil ; la barre du mode lecture conserve
  sa logique de navigation existante.

## Lot identite du pied de page - 13 aout 2026

- Perimetre : remplacer la ligne technique du footer par l'identite demandee,
  la description de Game Note, la compatibilite Android 5+ et la signature
  MaruChiwa.
- Composition : le footer est une grille courte sur desktop et une pile lisible
  sur mobile ; le retour a la bibliotheque reste une action separee.
- Garde-fou : la version `SITE_VERSION` reste affichee de facon discrete afin
  que le controle de version du site continue de fonctionner.
- Controle attendu : verifier la presence du texte dans la sortie Pages et le
  rendu en bas de page, puis relancer lint, build, preflight et smoke tests.
- Limite : ce lot ne modifie ni le lecteur de soluce ni les donnees de catalogue.

## Publication des guides reconstruits - 13 aout 2026

- Source unique : `docs/site-publication.json` contient les identifiants et les
  TXT réellement publiés après validation.
- Protection : `prepare-pages-output.mjs` retire de `dist/client/guides` les
  anciennes fiches conservées dans `public/guides`, puis prépare uniquement les
  URL validées dans le service worker.
- Contrôle : `validate-pages-output.mjs` et `validate-site-guardrails.mjs`
  vérifient la sortie publiée contre cette liste, jamais contre la totalité de
  l'archive source.
- Limite : cette règle masque les anciennes fiches sans les supprimer ; leur
  réactivation exige une nouvelle vérification éditoriale et un commit dédié.

## Lot Expedition 33 - reconstruction par matrice - 13 aout 2026

- La fiche doit conserver une matrice dans `docs/guide-research/` : sources
  lues, rôle de chaque source, compteurs retenus et contradictions résolues.
- Une page ancienne qui donne un compteur différent n'est pas fusionnée sans
  preuve : la valeur retenue doit être confirmée par une seconde source récente
  ou par le compteur du jeu.
- Les zones chronologiques, les annexes de collectibles et la checklist Steam
  restent séparées pour que le lecteur sache ce qu'il coche.
- Limite : ce lot traite le jeu de base et le contenu gratuit séparément ; il
  ne transforme pas un objet de confort en exigence artificielle du 55/55.

## Lot Octopath Traveler 1 - reconstruction complete - 13 aout 2026

- Toute fiche qui annonce 100 % doit intégrer ses inventaires dans le TXT :
  emplacement concret, contenu, condition et point de contrôle. Un simple
  renvoi vers une carte ou un tableur est refusé.
- Octopath Traveler 1 conserve les compteurs indépendants 88/88, 734, 152,
  101 et 381. Les boss uniques et le bonus du Herald de Lord Ciaran restent
  séparés des compteurs qui ne les incluent pas.
- Avant chaque commit de ce lot, relire la matrice Octopath, vérifier l'écart
  du PDF à 721 coffres et confirmer que la checklist actuelle à 734 reste
  l'autorité du guide.
- Les spoilers sont autorisés pour les solutions : une contrainte anti-spoiler
  ne doit jamais supprimer une identité, une conséquence, une faiblesse, un
  objet manquable ou un emplacement nécessaire au 100 %.

## Lot effets cinetiques de l'accueil - 13 aout 2026

- Direction : les calques de profondeur, la typographie fantome, les orbites et
  le bandeau defilant prolongent la carte, le quadrillage et la route sans
  ajouter de contenu editorial cache.
- Interaction : le pointeur peut deplacer la lumiere, la parallaxe et la carte
  a la une ; le scroll peut deplacer les reperes decoratifs, mais aucun de ces
  effets ne doit conditionner l'acces a l'index ou a une soluce.
- Accessibilite : `prefers-reduced-motion` coupe les animations et les reveals,
  le mode mobile evite tout debordement horizontal et les calques restent
  `aria-hidden`.
- Controle attendu : verifier le premier ecran, le scroll vers la bibliotheque,
  le mobile, le clavier et les sorties lint, build, preflight et smoke tests.
- Limite : ce lot ne modifie ni les fiches, ni le lecteur, ni les donnees de
  progression Steam.

## File de reconstruction issue de la bibliotheque Steam

- `docs/guide-rebuild-queue.json` est la source editoriale des lots a refaire ;
  elle ne vaut jamais autorisation de publication.
- Une entree `active` doit correspondre a la publication temporaire ; une entree
  `queued` reste dans l'archive jusqu'a sa nouvelle matrice de sources ; une
  entree `excluded` doit conserver la justification qui empeche une soluce
  chronologique classique.
- Un nouveau jeu planifie doit d'abord avoir son AppID, son nombre de succes et
  sa fiche de recherche. Aucun TXT court ou carte visible ne doit servir de
  placeholder.
- Pour la capture du 13 aout 2026, OCTOPATH TRAVELER 0 est planifie (3014320,
  37 succes) ; Dota Underlords, Rocket League, Dota 2, Brotato et FINAL FANTASY
  VII EVER CRISIS restent exclus.
## Lot scène d'entrée et archive monumentale - 13 août 2026

- Ouverture : l'accueil commence par une carte d'entrée courte, une typographie
  géante et un accès `Entrer` avant de révéler l'archive interactive.
- Composition : la liste monumentale, l'image centrale et les repères latéraux
  servent une scène éditoriale unique ; ils ne remplacent pas l'index réel ni
  les boutons de lecture.
- Accessibilité : l'overlay disparaît automatiquement, reste non bloquant et
  `prefers-reduced-motion` le supprime entièrement ; le lien d'entrée doit
  rester utilisable au clavier.
- Contrôle attendu : vérifier l'entrée et sa révélation, le premier écran
  desktop, le mobile sans débordement, puis lint, build, preflight et smoke.
- Limite : ce lot ne modifie ni les textes des guides, ni leurs compteurs, ni
  la navigation du lecteur.

## Lot nettoyage de composition du hero - 13 août 2026

- Hiérarchie : l'image de route est le point focal ; la typographie d'archive
  reste secondaire et le panneau éditorial conserve une largeur respirante.
- Effets : orbites, grain, scan et repère pointeur restent décoratifs et sont
  abaissés en contraste pour ne pas concurrencer le titre, la carte ou l'index.
- Contrôle attendu : vérifier desktop et mobile, le mode mouvement réduit,
  l'absence de collision visuelle et les validations lint, build, preflight et
  smoke.
- Limite : ce lot ne modifie ni les guides, ni leurs compteurs, ni le lecteur.

## Ajustement final de hiérarchie desktop - 13 août 2026

- Le hero ne présente qu'une action primaire visible sur desktop ; l'index réel
  reste la seconde porte d'entrée vers les routes.
- La carte centrale reste sous la ligne de navigation et le panneau d'index est
  séparé du texte d'introduction par un espace mesurable.
- Le contrôle attendu couvre les collisions à 1280 px, le mobile, le clavier,
  le mouvement réduit et les validations de livraison.

## Audit visuel bibliothèque et contraste hero - 13 août 2026

- Bibliothèque : lorsque deux fiches ou moins sont visibles, la grille passe en
  deux colonnes équilibrées afin d'éviter une troisième colonne vide.
- Hero : le panneau éditorial gagne de la largeur et l'image centrale reçoit un
  contraste légèrement plus lumineux, sans changer le contenu ni les compteurs.
- Contrôle attendu : vérifier l'entrée, le hero, la bibliothèque, le pied de
  page, le mode mouvement réduit, puis lint, build, preflight et smoke.
- Limite : aucun guide, texte éditorial, compteur Steam ou comportement lecteur
  n'est modifié.

### Recherche OCTOPATH TRAVELER 0 — 13 août 2026

- Une entrée `research` de `docs/guide-rebuild-queue.json` doit pointer vers sa
  matrice de sources avec `evidenceFile` ; le validateur bloque une matrice
  absente avant toute rédaction publiée.
- La matrice OT0 retient cinq piliers éditoriaux indépendants et sépare les
  compteurs Steam des compteurs de contenu : 37 succès, 36 recrues de travail,
  454 coffres de base, 40 musiques, 11 trésors légendaires, 9 Battle-Tested,
  8 trésors sacrés et 9 armes Forbidden. Les valeurs de base restent à
  confirmer par la route et ne sont pas affichées comme acquises.
- Une divergence entre une fiche de route, une base de données et Steam doit
  être inscrite dans la matrice avant d'entrer dans le TXT ; aucune hypothèse
  de missable ou de troisième fin ne devient une instruction sans seconde
  preuve.

### Passe de rédaction OT0 — route archivée — 13 août 2026

- Un TXT de travail peut exister dans `public/guides/` sans être une fiche
  publiée : tant que le catalogue reste `planned`/`research`, le fichier doit
  rester absent de `docs/site-publication.json`, de l'index et du cache offline.
- La première passe OT0 couvre la route et les registres ciblés, mais le seuil
  100 % reste bloqué jusqu'à l'intégration vérifiée des 454 trésors, avec zone,
  sous-zone, section et condition pour chaque entrée.

### Registre OT0 — contrôle automatique — 13 août 2026

- Si le brouillon `public/guides/octopath-traveler-0.txt` est présent, il doit
  contenir exactement 454 entrées numérotées `[COFFRE]` et exactement 37 cases
  dans la checklist Steam finale.
- Les rappels de coffres dans la route sont autorisés et ne comptent pas dans
  ce contrôle ; l'appendice numéroté est l'autorité du compteur 454/454.

### Contrôle de précision des clés OT0 — 13 août 2026

- Le bloc des clés ornées doit citer les huit types : Dagger, Sword, Axe, Tome,
  Fan, Polearm/Spear, Staff et Bow.
- Une formule générique comme « huitième clé à compléter » est interdite dans
  un brouillon présenté comme complet ; l'emplacement de la Bow Crest doit être
  East Cyphlo Banks.

### Contrôle roster et side stories OT0 — 13 août 2026

- Un brouillon OT0 doit compter exactement 36 personnages et 57 récits
  secondaires ; un simple total global sans noms contrôlables est insuffisant.
- Les entrées `An Encounter with H'aanit`, `The Monster Arena` et `Greatest
  Expectations`, ainsi que `Unnatural Tremors`, sont obligatoires dans le
  registre secondaire.
- Les cinq Letter Fragments doivent être contrôlables par lieu ; une récompense
  d'action à Atlasdam ne doit pas être inventée comme un coffre numéroté.
- Chaque récit secondaire doit garder son déclencheur, son trajet et sa
  récompense dans le TXT ; le compteur 57 ne remplace pas la procédure.

### Contrôle coffres bleus OT0 — 13 août 2026

- Le guide doit isoler les 44 coffres bleus dans une checklist de rattrapage
  ordonnée, sans les compter une seconde fois dans les 454 entrées canoniques.
- Le prérequis doit être explicite : Église de Wishvale construite et rang 3
  atteint après Kindlers of the Flame 5.
- Chaque ligne bleue doit conserver son identifiant du registre et sa zone ;
  un simple total « 44 coffres bleus » sans correspondance est refusé.

### Contrôle cartographique OT0 — 13 août 2026

- Le brouillon doit conserver un index de 37 cartes de zones avant le registre
  des 454 trésors, avec des URLs de source vérifiables.
- L'index doit servir de repère visuel pour les lignes sans direction détaillée,
  mais il ne peut pas être compté comme un coffre ni remplacer la relecture.
- Les zones sans carte source doivent rester signalées ; une direction inventée
  pour atteindre un faux niveau de complétude est interdite.

### Couverture cartographique étendue OT0 — 13 août 2026

- Le guide peut renvoyer vers l'index Game8 des cartes pour les zones absentes
  des 37 cartes directes.
- Les deux niveaux de source doivent rester distincts : un lien aide à naviguer,
  mais ne prouve pas qu'un écran a été relu ou qu'un coffre a été ouvert.

### Audit interface personnelle — 13 août 2026

- L'accueil ne présente pas de badges « nouveau », « fondateur » ou équivalent,
  de bandeau animé de slogans, de statistiques décoratives, ni de bouton PWA
  flottant qui ressemble à une publicité.
- Le service worker reste actif et met à jour l'application automatiquement ;
  les messages hors ligne et les erreurs de route restent des statuts utiles.
- Le hero peut afficher le dernier guide réellement ouvert en rouge et un
  historique local de cinq guides maximum en jaune, dans l'ordre d'utilisation.
- L'index du hero doit conserver toutes les routes publiées ; l'historique local
  sert au point de reprise et ne peut pas réduire la bibliothèque à une seule fiche.
- Le bouton de reprise et une entrée de l'historique doivent ouvrir la même
  fiche que la bibliothèque, sans créer une navigation parallèle.
- Le contrôle couvre l'entrée, le hero, la bibliothèque, le lecteur, le clavier,
  le mobile, puis lint, build, preflight et smoke.

### Refonte lisibilité des guides — 13 août 2026

- Toute refonte du lecteur conserve les TXT et leur ordre : aucune suppression de
  texte ne peut servir de correction visuelle.
- Les lignes numérotées `1.` à `99.` sont des étapes compactes, pas des titres de
  chapitre. Le compteur de grandes sections et le sommaire ne doivent pas gonfler
  à cause du nombre de l'étape.
- Le document de route reste la première surface de lecture sur mobile ; le
  sommaire détaillé est repliable et la recherche reste disponible avant lui.
- Le contrôle visuel doit couvrir au minimum un écran desktop et un écran mobile,
  puis vérifier le build, le lint, le préflight et les smoke tests.

### Contrôle de précision des boss OT0 — 13 août 2026

- Une fiche OT0 complète doit fournir une préparation, les faiblesses par
  phase, la mécanique qui tue ou bloque le groupe, l'ordre des cibles et le
  point de reprise lorsqu'ils sont établis par les sources.
- Les combats principaux de la route doivent renvoyer vers le dossier boss du
  TXT ; la liste de succès seule ne constitue pas une solution jouable.
- Les coffres gardés par un élite restent séparés des fiches de boss et du
  compteur 454 : le type de rencontre ne doit pas être changé pour remplir une
  checklist.

### Registre OT0 sans lignes génériques — 13 août 2026

- Les 454 entrées numérotées doivent conserver un repère exploitable : chemin,
  salle, étage, gardien, point de collecte ou condition d'ouverture.
- Le validateur bloque toute ligne `[COFFRE]` qui reviendrait à « aucun repère
  additionnel » ; une carte externe complète la navigation mais ne remplace pas
  la précision textuelle ni la vérification finale.
- Cette passe se clôt par une seule validation et un seul commit local ; aucun
  push n'est implicite et aucune version ne doit être déclarée livrée avant les
  validations de publication.

### Lot OT2 — contrôle de complétude et publication

- Octopath Traveler II est ajouté à la publication visible après sa reconstruction
  et ses contrôles de contenu ; il ne doit pas être laissé dans la file `queued`.
- Le seuil de contenu est contrôlable : 33 succès Steam, 67 Side Stories,
  30 Records, 7 Battle-Tested, 16 EX Skills, 632 coffres et 237 objets caches.
- Chaque coffre du registre porte `[COFFRE]`, un identifiant `#001`-`#632`, une
  région, une sous-zone, un contenu et un numéro local. Les objets caches sont
  `H001`-`H237` et ne gonflent jamais le compteur des coffres.
- Le validateur strict bloque les doublons, les trous, les lignes tronquées,
  les placeholders et le retour de la mention `SANS SPOILER` sur cette fiche.
- La version et les garde-fous suivent le commit final unique de la passe ; le
  travail reste local tant qu'aucune demande de push n'est faite.

## Passe visuelle — cartes Steam resilientes

- Les cartes actives utilisent la source Steam panoramique compatible `header.jpg`;
  `header_2x.jpg` ne doit pas etre suppose disponible pour chaque jeu du catalogue.
- Chaque image externe du catalogue et du lecteur possede un repli local vers
  `public/images/cards/game-note-card-route.png`, avec un garde contre la boucle
  d'erreur si le repli lui-meme echoue.
- Le smoke test verifie la source compatible et la presence du repli avant le
  commit d'un lot visuel.

## Passe visuelle mobile — reveal de bibliothèque

- Sous 680 px, le reveal de la bibliothèque utilise une durée plus courte afin
  que le premier défilement ne masque pas temporairement les cartes et les
  filtres sous une opacité trop basse.
- Le changement reste limité à la transition d'interface ; les données, les
  compteurs, le lecteur et les replis d'images restent inchangés.
- Le contrôle couvre 320/390 px, le desktop, le clavier, le mouvement réduit,
  l'absence de débordement, lint, build, preflight et smoke tests.

### Correctif sequences vides - 14 aout 2026

- Le parseur ne transforme plus les titres `###` des guides en cartes de
  sequence geantes ; la hierarchie du document est respectee.
- Les titres reellement sans contenu sont exclus du rendu et du sommaire, sans
  toucher au TXT, aux coffres, aux succes ou aux etapes.
- Le garde-fou strict inspecte les guides visibles et refuse tout titre Markdown
  vide avant le build et le commit unique.

### Sommaire hierarchique - 14 aout 2026

- Le lecteur construit maintenant des groupes de navigation au lieu d'exposer
  toutes les sous-sections au meme niveau.
- Les grandes sections sont ancrees, les details sont accessibles dans des
  panneaux repliables, et les longues fiches restent parcourables au clavier.
- OT2 est regroupe par region et les titres de combat d'Expedition 33 restent
  des sous-sections ; aucun TXT source n'est rearrange ou ampute.

### Acces local de verification - 14 aout 2026

- Toute modification de l'interface doit rester verifiable sur l'adresse fixe
  `http://localhost:3000/`.
- Le point d'entree utilisateur est `APERCU_LOCAL.cmd` ; le script npm
  equivalent est `preview:local`.
- Cet acces local ne remplace pas le build ni le preflight et ne declenche aucun
  push Cloudflare automatiquement.

### Correctif etat du sommaire - 14 aout 2026

- Toute interaction `details`/`onToggle` doit lire les proprietes DOM de
  `event.currentTarget` dans le corps immediat du handler.
- Le setter React ne doit recevoir que la valeur capturee ; conserver
  `event.currentTarget` dans l updater peut produire `Cannot read properties of
  null (reading 'open')` en local comme sur Cloudflare.
- Le smoke test et le guardrail source bloquent le retour de cette regression.

### Regle active de livraison - commit et push

- Toute demande de modification terminee suit l ordre : validations, commit,
  puis push sur la branche de travail.
- Aucun commit vide ni push pour une question, une pause, une lecture seule ou
  une tache bloquee.
- Cette regle remplace les anciennes mentions de livraison restant locale.
