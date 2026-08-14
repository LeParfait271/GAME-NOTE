# À lire en premier — garde-fou maître Game Note

Ce fichier fixe la méthode minimale avant toute modification visible du site.

1. Lire GAME_NOTE_RULES.md.
2. Vérifier git status et git diff avant d'éditer.
3. Préserver les ajouts de soluces dans public/guides/ et les catalogues dans
   docs/. Ne jamais restaurer ces fichiers depuis Git sans demande explicite.
4. Modifier les sources (app/, public/, scripts/), jamais dist/client/ à la main.
5. Toute modification suit le protocole de clôture détaillé plus bas :
   validation, contrôle local, commit, push et publication si le site est touché.
6. Après chaque lot modifié, créer un commit vérifiable puis pousser la branche
   de travail. Une question, une pause ou une lecture seule ne crée aucun commit.
7. Chaque commit de modification doit aussi mettre à jour le workflow et les garde-fous dans
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
     de dissimulation. Pour Expedition 33, la route doit donc pouvoir nommer les
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
    bon mode de révélation. Une ancienne promesse incompatible ou un résumé
    d'un autre jeu invalide la livraison même si le TXT est correct.
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
24. La publication du site suit `docs/site-publication.json` et `SITE_VISIBLE_GUIDE_IDS`.
    Toute soluce reconstruite et validée doit être ajoutée aux deux listes et
    devenir accessible dans l'index, la recherche, la navigation et le cache hors-ligne.
    Les brouillons explicitement en recherche, comme OT0, restent signalés comme tels.

Toute nouvelle règle durable doit être ajoutée à GAME_NOTE_RULES.md et
transformée en validation automatique quand c'est possible.

### Lot catalogue Steam ajouté le 13 août 2026

- La capture Steam est suivie dans `docs/guide-rebuild-queue.json` : trois
  références actives, huit guides d'archive à reconstruire et cinq exclusions.
- OCTOPATH TRAVELER 0 reste en `research` pour l'instant : AppID 3014320,
  37 succès Steam et TXT de travail présents, mais aucune carte ni URL
  publique tant que la matrice n'est pas déclarée validée.
- Les guides déjà présents dans `public/guides/` restent hors publication tant
  qu'ils n'ont pas repassé la méthode des cinq sources et le contrôle complet.
- Contrôle avant commit : cohérence queue/catalogue/audit, publication synchronisée
  avec les soluces reconstruites validées, puis build, preflight et tests.

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
26. La liste `docs/site-publication.json` est la source de publication : les TXT
    des soluces reconstruites et validées doivent être copiés dans `dist/client`
    et le cache hors-ligne. Les brouillons encore en recherche restent exclus.
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
36. La composition du hero doit conserver une hiérarchie lisible : un seul point
    focal, un décor typographique secondaire et un panneau d'actions respirant.
    Les couches d'effet restent sous le contenu et ne doivent jamais provoquer
    de collision visuelle entre la carte, le titre et l'index.
37. Sur desktop, le hero conserve une seule action primaire : l'index réel porte
    la sélection des routes et les actions secondaires ne doivent pas recréer
    une deuxième colonne concurrente.
38. La bibliothèque doit adapter sa grille au nombre de fiches visibles : deux
    fiches actives occupent deux colonnes équilibrées, tandis qu'une recherche
    longue conserve la grille catalogue prévue. Aucun état ne doit laisser une
    colonne vide qui rapetisse inutilement les cartes.

### Lot de recherche OCTOPATH TRAVELER 0 — 13 août 2026

- La fiche passe de `planned` à `research` avec sa matrice dans
  `docs/guide-research/octopath-traveler-0-evidence.md` ; cela ne crée ni TXT,
  ni carte, ni URL visible.
- La méthode utilise cinq piliers distincts : route Neoseeker, guides
  spécialisés Game8, récits NightlyGamingBinge, base d'objets OT0 et guides de
  fin de jeu RPG Site, avec Steam et Square Enix comme autorités de contrôle.
- Le guide ne sera pas déclaré complet tant que les 37 succès, les recrues,
  les coffres, les fins et les fenêtres de recrutement n'auront pas été
  replacés dans une route chronologique concrète.

### Passe de rédaction 1 — route OT0 archivée

- Le TXT de travail existe désormais dans l'archive avec la route du prologue
  à la fin véritable, Wishvale, les recrutements, les quêtes, les équipements,
  les partitions et la checklist des 37 succès.
- Il reste volontairement invisible et non publié : le registre détaillé des
  454 trésors doit encore être ajouté et vérifié avant tout raccordement.

### Passe de rédaction 2 — registre OT0

- L'appendice OT0 contient désormais les 454 entrées numérotées, sans supprimer
  les rappels placés dans la route.
- Le validateur contrôle que le brouillon, s'il existe, conserve exactement
  454 lignes de registre et 37 cases dans sa checklist Steam finale.
- Le catalogue reste `research` et la publication temporaire ne change pas.

### Passe de contrôle 3 — clés ornées OT0

- Les huit clés ornées sont désormais toutes nommées et localisées dans le TXT ;
  la Polearm/Spear Crest est sur l'île de l'Outersea Est et la Bow Crest dans
  le coffre d'East Cyphlo Banks.
- Aucun emplacement provisoire ou « huitième clé à compléter » ne doit rester
  dans une fiche déclarée exhaustive.
- Cette passe corrige le registre sans rendre le guide visible ni le déclarer
  `reviewed`.

### Passe de contrôle 4 — roster et récits OT0

- Le TXT conserve 36 cases de personnages et 57 cases de récits secondaires ;
  chaque fiche indique désormais sa fenêtre, son trajet et sa récompense au lieu
  d'un simple nom.
- Les contrôles obligatoires incluent Tressa, H'aanit, Goodwin, Elrica, Carinda,
  Tatloch, `The Monster Arena`, `Greatest Expectations` et `Unnatural Tremors`.
- Le fichier reste une archive de travail : aucune carte, URL ou entrée de
  publication ne doit être créée à cette étape.
- Les cinq fragments de lettre doivent rester séparés du compteur 454 : le
  fragment d'Atlasdam est une récompense d'Entreat auprès du Cat of Graceful
  Bearing, pas une ligne de coffre.

### Passe de contrôle 5 — coffres bleus OT0

- Le TXT possède maintenant une checklist séparée de 44 coffres bleus, reliée
  aux numéros du registre 454/454 et organisée par ordre de rattrapage.
- La checklist rappelle le vrai déblocage : construire l'Église de Wishvale,
  puis la monter au rang 3 après Kindlers of the Flame 5.
- Une checklist secondaire ne doit jamais gonfler le compteur canonique : les
  454 lignes numérotées restent l'autorité, tandis que les rappels de route
  servent uniquement à jouer et à vérifier.

### Passe de contrôle 6 — cartes de zones OT0

- Le guide comporte désormais un index de 37 cartes de zones, placé juste
  avant le registre des 454 trésors.
- Les cartes servent à retrouver visuellement les coffres lorsque la base ne
  fournit pas de direction textuelle ; aucune position ne doit être inventée.
- Les cartes et les rappels restent distincts des lignes numérotées : ils
  améliorent la navigation sans modifier les compteurs de contenu.

### Passe de contrôle 7 — couverture cartographique étendue

- L'index direct de 37 cartes est complété par l'index Game8 des zones et
  donjons non présents dans la première sélection.
- Le guide doit signaler cette différence et ne jamais transformer un lien
  cartographique en validation écran par écran.

### Passe de contrôle 5 — interface personnelle

- L'accueil ne doit pas afficher de badge promotionnel, de bouton d'installation
  flottant, de bandeau de slogans ou de statistiques décoratives ; les fonctions
  utiles restent accessibles par la navigation normale et le menu du navigateur.
- Les statuts hors ligne, erreurs de route et marqueurs de contenu restent
  autorisés lorsqu'ils décrivent réellement l'état ou la fiche consultée.
- Le hero peut afficher le dernier guide réellement ouvert en rouge et un
  historique local de cinq guides maximum en jaune, dans l'ordre d'utilisation.
- L'index des routes reste toujours basé sur les guides publiés : un historique
  local partiel ne doit jamais masquer les autres soluces au retour vers l'accueil.
- Le bouton de reprise et une entrée de l'historique doivent ouvrir la même
  fiche que la bibliothèque, sans créer une navigation parallèle.

### Audit de lisibilité des fiches — 13 août 2026

- Le texte source des guides ne doit pas être supprimé pour résoudre un problème
  d'interface : la refonte agit sur le parseur et la présentation uniquement.
- Une ligne numérotée de parcours reste une étape dans le document, même si son
  numéro comporte deux chiffres ; elle ne doit pas devenir un faux chapitre.
- Le sommaire expose les sections utiles, tandis que les étapes détaillées restent
  lisibles dans la route complète et accessibles par la recherche.
- Sur mobile, la fiche commence par le contenu ; le sommaire devient repliable
  et ne doit pas repousser la première étape sous plusieurs écrans de navigation.

### Passe de contrôle 8 — fiches boss OT0

- La route OT0 renvoie maintenant les combats importants vers 31 fiches
  opérationnelles : faiblesses, phases, statuts, ordre des cibles et reprise.
- Une faiblesse dynamique doit rester écrite par phase ; une phrase générique
  comme « utilise les faiblesses » ne suffit plus pour un boss principal.
- Les fiches de combat ne gonflent pas les compteurs 454/454 ou 37/37 ; le
  validateur vérifie leur présence et plusieurs renvois depuis la route.

### Passe de contrôle 14 — registre OT0 navigable

- Les 454 lignes `[COFFRE]` disposent maintenant d'un repère de route, de salle,
  d'étage, de gardien ou de collecte ; le texte générique est interdit.
- Le registre, la checklist des 44 coffres bleus et les fiches boss restent trois
  couches distinctes : aucun repère ne doit créer un doublon dans les compteurs.
- Avant toute visibilité, lancer le validateur strict, le build, le préflight et
  les smoke tests ; le commit final est unique pour cette passe, puis poussé.

### Passe OT2 — registre complet et publication

- Octopath Traveler II est une soluce reconstruite : `octopath-2` et
  `octopath-traveler-2.txt` doivent figurer dans la publication visible.
- Le TXT doit conserver une route 33/33 Steam, 67 Side Stories, 30 Records,
  7 Battle-Tested, 16 EX Skills, 632 coffres et 237 objets caches.
- Les 632 coffres utilisent `[COFFRE]` avec `#001` a `#632` ; les 237 objets
  caches utilisent le meme repere visuel mais le compteur `H001` a `H237`.
  Les deux registres restent independants des succes Steam.
- La matrice de preuve OT2 doit rester dans `docs/guide-research/` et citer les
  cinq piliers de recoupement ; une ligne tronquee ou sans emplacement bloque
  la passe.
- Le lot se ferme par build, validation stricte, preflight, audit et smoke tests,
  puis un seul commit final poussé sur la branche de travail.

### Passe visuelle — cartes Steam resilientes

- Les cartes actives utilisent la source Steam panoramique compatible `header.jpg`;
  `header_2x.jpg` ne doit pas etre suppose disponible pour chaque jeu du catalogue.
- Chaque image externe du catalogue et du lecteur possede un repli local vers
  `public/images/cards/game-note-card-route.png`, avec un garde contre la boucle
  d'erreur si le repli lui-meme echoue.
- Le smoke test doit conserver ces deux controles avant tout commit visuel.

### Passe visuelle mobile — reveal de bibliothèque

- Le reveal de la bibliothèque est raccourci sous 680 px : le premier défilement
  ne doit pas laisser les fiches presque invisibles pendant près d'une seconde.
- Le contrôle reste décoratif : le contenu, les cartes et les actions restent
  présents sans animation réduite et la règle `prefers-reduced-motion` conserve
  l'affichage immédiat.
- La passe ne touche ni aux guides, ni aux compteurs, ni au lecteur ; elle doit
  être validée par les rendus 320/390 px, le build, le preflight et les smoke tests.

### Correctif sequences vides - 14 aout 2026

- Les niveaux Markdown sont conserves par le lecteur : `#` et `##` sont des
  sections, `###` est un sous-titre, et une ligne numerotee reste une etape.
- Un titre sans paragraphe, objectif, puce ou etape avant la prochaine section
  est masque dans l'interface ; aucune ligne du TXT source n'est supprimee.
- Le validateur strict bloque tout guide visible qui introduit un titre Markdown
  sans contenu exploitable. Ce controle est obligatoire avant le commit final.

### Sommaire hierarchique - 14 aout 2026

- Le sommaire ne doit plus afficher une liste plate de titres : les sections
  principales restent visibles et leurs sous-sections sont repliees.
- Les guides sans chapitres explicites doivent etre regroupes par famille
  lisible, par exemple par region pour les zones d'Octopath Traveler II.
- Les etapes, coffres et objectifs restent dans le corps du guide ; le sommaire
  ne doit pas les supprimer ni les transformer en faux chapitres.

### Acces local de verification - 14 aout 2026

- Pour verifier la version en cours, double-cliquer `APERCU_LOCAL.cmd` puis
  ouvrir `http://localhost:3000/`.
- Le serveur de developpement reste ouvert pendant les commits et recharge les
  fichiers modifies ; le lien ne change pas.
- Le controle avant commit confirme que le raccourci, le port 3000 et le script
  `preview:local` restent presents.

### Correctif lecteur Cloudflare - 14 aout 2026

- Tester aussi une URL directe `/?guide=...` : le catalogue peut fonctionner
  alors que le lecteur plante au montage.
- Dans un callback `onToggle`, capturer `event.currentTarget.open` avant de
  passer dans le setter React ; ne jamais relire l evenement dans son updater.
- Une page Cloudflare qui affiche "This page couldnt load" avec une erreur
  `null.open` indique cette regression du lecteur, pas un TXT absent.

### Regle active de livraison - commit et push

- Pour chaque demande qui modifie le site et qui est terminee, lancer les
  validations, creer le commit puis pousser sur la branche de travail.
- Une question, une pause, un diagnostic en lecture seule ou une tache bloquee
  ne cree ni commit vide ni push.
- Cette regle remplace les anciennes mentions de livraison restant locale.

### Correctif lecture des tableaux - 14 aout 2026

- Une ligne Markdown `| ... | ... |` est rendue comme un vrai tableau dans le
  lecteur, jamais comme un paragraphe continu ; le TXT original reste intact.
- Sur mobile, chaque ligne devient une carte avec le nom de chaque colonne afin
  que les moments, actions et risques restent lisibles sans zoom ni balayage
  horizontal obligatoire.
- Le controle visuel doit ouvrir la fiche Octopath Traveler sur ordinateur et
  sur une largeur mobile de 390 px, puis confirmer qu il existe un tableau
  rendu, sans perte de cellule, avant build, commit et push.

### Separation du parcours et des dossiers - 14 aout 2026

- Une sequence correspond uniquement a une partie jouable de la route : Route,
  Phase, Acte, Prologue, Chapitre ou Post-game.
- Les legendes, alertes, regles, compteurs, checklists, registres, inventaires
  et annexes restent accessibles, mais sont etiquetes comme dossiers de
  reference et ne gonflent plus le compteur de sequences.
- Le sommaire doit toujours afficher deux zones distinctes : parcours
  chronologique puis dossiers de reference ; le titre de la fiche n est jamais
  une sequence.

### Regle active - toujours integrer les demandes - 14 aout 2026

- Toute demande d ajout est une tache de production : jeu, guide, succes,
  coffre, objet, icone, annexe, registre ou correction doit etre integre dans
  la bonne source, le catalogue, la file de travail et l interface concernee.
  Une mention dans une note ou un commentaire ne compte jamais comme ajout.
- Rien de demande ne doit disparaitre par omission silencieuse. Si un element
  n est pas encore verifie, il reste present avec un statut explicite
  `planned`, `research`, `archive-rebuild` ou `hold`, jamais efface.
- Les anciennes fiches peuvent etre sorties de la publication visible sur
  demande, mais elles restent preservees dans les sources et leur statut
  archive/visible est controle separement.

### Regle active - methode editoriale complete

- Une soluce est une route chronologique 100 % du jeu et des succes Steam,
  avec spoilers autorises : conditions, lieux, coffres, objets, missables,
  quetes, combats, fins et solutions necessaires doivent etre exploitables.
- Avant d ecrire, recouper au moins cinq familles de sources independantes,
  conserver une matrice de preuves, signaler les contradictions et ne jamais
  recopier aveuglement une soluce.
- Les noms de succes utilisent la liste Steam officielle dans la langue
  francaise quand elle existe. Aucun nom ne doit etre traduit litteralement ou
  invente ; le registre `docs/steam-achievements-fr.json` et le garde-fou
  source doivent correspondre ligne par ligne.
- Le TXT reste la source editoriale complete. La presentation premium peut
  structurer les etapes, tableaux, coffres et dossiers, mais ne supprime ni
  texte, ni objet, ni succes, ni preuve. `[COFFRE]` suffit pour les coffres et
  objets a trouver ; les icones restent utiles et limitees.
- Une sequence ne contient que la route jouable. Les compteurs, alertes,
  checklists, registres et autres informations annexes vont dans les dossiers
  de reference du sommaire.

### Regle active - cloture obligatoire

- Avant chaque modification terminee : validation des sources et du catalogue,
  build, preflight strict, audit qualite, lint, smoke tests, controle local
  desktop/mobile et verification du diff.
- La version publique augmente de 0.01 au commit. Toute modification terminee
  est committee puis poussee ; une question, une pause ou une lecture seule ne
  cree ni commit vide ni push.

### Protocole maitre obligatoire a chaque commit - 14 aout 2026

Chaque commit de modification applique cette methode complete :

1. cadrer la demande, lire les regles, verifier le statut et proteger les
   changements existants ;
2. toujours integrer chaque ajout dans sa vraie destination et tracer avec un
   statut explicite tout element encore en recherche ;
3. pour une soluce, croiser cinq familles de sources minimum, conserver la
   matrice, rediger une route exhaustive 100 % jeu + Steam et utiliser les noms
   officiels francais de Steam ;
4. conserver le TXT, separer les sequences jouables des dossiers de reference
   et utiliser `[COFFRE]` pour les coffres et objets a trouver ;
5. lancer validation catalogue + guides, garde-fous, build, preflight strict,
   audit qualite, lint, smoke tests, diff et verification locale desktop/mobile ;
6. controler la version `+0.01`, le contenu staged et le perimetre, creer un
   commit unique, pousser la branche et deployer ce meme commit si le site est
   touche.

Un commit est refuse si une demande est seulement notee, si une information
utile disparait, si une preuve ou un nom Steam francais manque, si route et
annexes sont melangees, si un controle echoue ou si le commit reste local.

### Regle active - lecteur de soluce lisible - 14 aout 2026

- Le titre de la fiche est affiche une seule fois dans la couverture ; il ne
  doit pas reapparaitre comme une fausse sequence dans le corps du guide.
- Le lecteur affiche la route jouable dans `PARCOURS CHRONOLOGIQUE`. Les
  regles, alertes, sauvegardes, compteurs, inventaires et checklists restent
  dans `AVANT DE COMMENCER` ou `DOSSIERS DE REFERENCE`, repliables par defaut.
- La recherche peut afficher tous les blocs correspondants dans leur ordre
  source, sans supprimer ni reclasser une information du TXT.
- Toute refonte de lecture doit etre verifiee sur une fiche reelle en desktop,
  a 390 px, sans debordement, avec les panneaux repliables et la recherche.
