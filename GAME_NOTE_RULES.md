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
