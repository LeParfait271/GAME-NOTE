# Workflow de publication temporaire Game Note

## Regle active

Pendant la reconstruction des guides, `docs/site-publication.json` est la
source unique du lot visible. Il contient actuellement trois identifiants et
trois fichiers autorises : Expedition 33, Octopath Traveler 1 et Octopath
Traveler II.

`public/guides/` reste l'archive de travail complete. Un fichier archive ne
doit toutefois pas etre copie dans `dist/client/guides/`, ajoute au service
worker, ou rendu accessible par l'index tant qu'il n'est pas dans la liste de
publication temporaire.

La file editoriale `docs/guide-rebuild-queue.json` est distincte de la liste de
publication. Elle enregistre les trois references actives, les fiches a refaire
et les exclusions issues de la capture Steam. Ajouter un jeu dans cette file ne
cree donc ni carte visible, ni URL publique, ni promesse de guide termine.

## Controle a chaque commit

1. La liste des identifiants de `app/page.tsx` doit correspondre a la liste
   `visibleGuideIds` du fichier de publication.
2. La sortie Pages doit contenir exactement les fichiers `visibleGuideFiles`.
3. Le service worker doit precacher exactement ces memes fichiers.
4. Les anciens TXT doivent rester presents dans l'archive source et ne doivent
   pas etre modifies par une simple operation de masquage.
5. Toute reintegration d'un ancien guide exige une nouvelle matrice de sources,
   une validation editoriale et un commit distinct.

Les controles automatises associes sont `validate-pages-output.mjs` et
`validate-site-guardrails.mjs`. Le hook de commit augmente la version du site
de 0,01 a chaque commit ; une modification terminee est ensuite poussee.

## Protocole canonique applique a chaque commit - 14 aout 2026

Chaque commit de modification reprend l ordre suivant :

1. cadrer la demande, lire les regles, verifier le statut et proteger les
   changements deja presents ;
2. integrer chaque ajout et chaque demande dans sa destination reelle et conserver un statut
   explicite pour tout element encore en recherche ;
3. pour chaque soluce, croiser cinq familles de sources minimum, resoudre les
   divergences, rediger une route originale exhaustive et utiliser les vrais
   noms francais Steam ;
4. garder les sequences limitees a la route jouable, separer les annexes dans
   les dossiers de reference, conserver le TXT et marquer les coffres/objets
   avec `[COFFRE]` ;
5. lancer validation catalogue + guides, garde-fous, build, preflight strict,
   audit qualite, lint, smoke tests et diff ; verifier ensuite la fiche sur
   desktop, mobile et par URL directe ;
6. confirmer la version `+0.01`, le contenu staged et le perimetre, creer un
   commit unique, pousser la branche et deployer le meme commit si le site est
   concerne.

Une modification n est pas consideree comme terminee si elle est seulement
notee, si un ajout disparait, si une preuve manque, si une sequence contient des
annexes ou si le commit reste local. Les questions, pauses et audits en lecture
seule ne creent pas de commit.

## Controle editorial Octopath Traveler 1

Le guide actif Octopath conserve sa matrice dans
`docs/guide-research/octopath-traveler-1-evidence.md`. Avant chaque commit de
contenu, verifier les cinq familles de sources, les divergences du PDF ancien
et les compteurs 88/88, 734, 152, 101 et 381.

Le contrôle strict de profondeur suit la même liste temporaire : les archives
invisibles ne bloquent pas la reconstruction du lot actif, mais elles restent
conservées et devront repasser ce contrôle lors de leur réactivation.

Le TXT contient les registres eux-memes : coffres par zone et contenu, objets
caches par PNJ, solutions et recompenses des recits, entrees Strategist et
inventaire Collector. Une sortie qui ne contient qu'une liste de succes ou un
lien externe est refusee. Les spoilers sont autorises pour cette fiche.

## Lot catalogue Steam — 13 aout 2026

- Les titres a route chronologique de la capture sont conserves dans la file de
  reconstruction ; les anciens TXT restent archives et invisibles.
- OCTOPATH TRAVELER 0 reste en `research` avec son AppID, ses 37 succes et
  `docs/guide-research/octopath-traveler-0-evidence.md` ; son TXT de travail
  reste hors publication tant que la matrice n'est pas validée.
- Dota Underlords, Rocket League, Dota 2, Brotato et FINAL FANTASY VII EVER
  CRISIS restent `excluded` : aucune modification de masquage ne doit les faire
  reapparaitre comme soluces classiques.

## Controle editorial OCTOPATH TRAVELER 0

La matrice OT0 doit conserver les cinq piliers de recherche, les compteurs
provisoires et les contradictions avant le premier fichier de soluce. Le
validateur verifie le lien `evidenceFile` de la queue ; passer l'entree en
`research` sans matrice est donc une erreur de livraison.

La publication active comprend Expedition 33, Octopath Traveler 1 et Octopath
Traveler II. OT0 reste hors publication tant que sa matrice le classe en
`research`.

## Passe de rédaction OT0 — archive non publiée

Le premier TXT OT0 peut être relu dans `public/guides/` pendant sa construction,
mais il reste hors catalogue tant que la matrice et l'appendice 454/454 ne sont
pas validés. Il ne doit donc pas être copié dans `dist/client/guides`, ajouté au
service worker ou accessible par un paramètre `guide`.

Le contrôle local accepte ce brouillon uniquement avec ses 454 entrées
numérotées et sa checklist Steam à 37 cases ; cela ne l'autorise toujours pas
à devenir une fiche visible.

La passe éditoriale suivante doit aussi conserver les huit clés ornées avec
leurs vrais types et emplacements. La Bow Crest est à East Cyphlo Banks ; un
placeholder dans ce bloc bloque la revue `reviewed`, même si le compteur 454/454
est correct.

La même règle s'applique au roster : le TXT doit conserver 36 personnages et 57
récits secondaires nommés, dont H'aanit, The Monster Arena, Greatest Expectations
et Unnatural Tremors. Tant que ces compteurs éditoriaux ne sont pas relus, le fichier
reste hors catalogue et hors publication.
Les cinq fragments de lettre doivent eux aussi être localisables, avec Atlasdam
traité comme une récompense d'action et non comme un coffre supplémentaire.

### Passe de contrôle 6 — coffres bleus OT0

- La fiche OT0 conserve une checklist de 44 coffres bleus, avec identifiants du
  registre et ordre de rattrapage après l'Église de Wishvale rang 3.
- Cette checklist facilite la navigation mais ne change pas la publication :
  OT0 reste archivé, invisible et absent du cache offline tant que la revue
  écran par écran n'est pas terminée.

### Passe de contrôle 7 — index cartographique OT0

- La fiche conserve un index de 37 cartes de zones avec les URLs de la source,
  pour aider à retrouver les coffres dont le texte ne donne pas de direction.
- L'index ne rend pas OT0 publiable à lui seul : les zones non couvertes et la
  relecture écran par écran restent explicitement hors du seuil final.

### Passe de contrôle 8 — index étendu OT0

- Les zones absentes des 37 cartes directes renvoient désormais vers l'index
  Game8 des cartes, sans modifier le statut archive et invisible d'OT0.
- Cette source externe aide à retrouver une salle, mais ne remplace pas la
  vérification éditoriale avant une future publication.

### Passe de contrôle 9 — combat OT0

- Le brouillon OT0 contient un dossier de 31 fiches de boss avec des renvois
  depuis la route principale ; cette couche améliore la jouabilité sans rendre
  le fichier visible ni l'ajouter au cache offline.
- Le validateur exige le dossier, plusieurs renvois et les fiches structurantes
  de la campagne. Les compteurs de contenu restent indépendants des lignes de
  stratégie.
- La passe reste éditoriale : la publication attend encore la relecture des
  gardiens élites, des zones et des 454 entrées dans une sauvegarde réelle.

### Passe de contrôle 10 — repères de coffres OT0

- Une première boucle de 27 lignes numérotées possède désormais un repère de
  salle, de direction, d'étage ou de gardien lorsqu'il est confirmé par une
  source de zone.
- Le validateur contrôle ces identifiants enrichis et bloque le retour silencieux
  au texte générique « aucun repère additionnel ».
- Cette amélioration ne rend pas OT0 publiable : les lignes restantes, les
  cartes, les élites et la relecture en jeu restent à auditer avant toute mise en
  visibilité.

### Passe de contrôle 11 — deuxième boucle de repères OT0

- Le registre compte maintenant 52 lignes enrichies par une direction, une salle,
  un étage, un côté de carte ou un gardien sourcé.
- Les nouveaux repères couvrent notamment Snowbloom/Subterranean Snow Ruins,
  Knights Ardante Garrison, Emberglow Slopes, Auguste's Villa et le début de la
  route de Tytos.
- Le statut archive/invisible reste obligatoire : les lignes encore génériques
  et la relecture réelle des zones ne sont pas remplacées par ces progrès.

### Passe de contrôle 12 — Coastlands OT0

- Dix lignes du finale Coastlands disposent désormais d'un repère de plage,
  d'entrée, de grotte, d'embranchement ou d'élite.
- Le dossier continue de signaler séparément les coffres bleus et les coffres en
  mer ; aucun chemin n'est inventé pour les lignes #133 à #138.
- OT0 reste archivé et invisible pendant la poursuite de la couverture des zones.

### Passe de contrôle 13 — Cliftlands OT0

- Vingt-trois lignes de la première traversée de Cliftlands sont désormais
  navigables par fourche, pente, maison, pont, monument, cul-de-sac ou élite.
- Les coffres bleus et les lignes déjà documentées restent séparés du nouveau
  lot ; le registre 454 ne change pas.
- Geist Canyon et les sections non sourcées restent à auditer avant publication.

## Passe de contrôle 14 — clôture éditoriale du registre OT0

- Les 454 entrées du TXT portent maintenant un repère de route, de pièce,
  d'étage, de gardien ou de collecte ; le placeholder de repère est interdit.
- Le compteur 454/454 reste indépendant des 44 coffres bleus, des 31 fiches
  boss et des 37 succès Steam. Les cartes restent des aides visuelles et ne sont
  pas transformées en preuve de test écran par écran.
- Le lot n'est clôturé qu'après build, préflight strict, audits et smoke tests.
  Les changements sont regroupés dans un seul commit final poussé.

## Lot OT2 — fiche reconstruite et publication active

- `octopath-traveler-2` est désormais dans `active`, avec la carte `octopath-2`
  dans `app/page.tsx` et son TXT dans `docs/site-publication.json`.
- Le contrôle de contenu impose 33 succès Steam, 67 Side Stories, 30 Records,
  7 Battle-Tested, 16 EX Skills, 69 lieux, 632 coffres et 237 objets caches.
- Les lignes `[COFFRE]` `#001`-`#632` et `H001`-`H237` sont comptées par des
  registres indépendants. Elles doivent rester localisables par région et
  sous-zone ; un compteur global ne suffit pas.
- Le pipeline de clôture est : validation stricte du catalogue et des guides,
  build, preflight strict, audit qualité, smoke tests, verification du diff,
  puis un unique commit poussé. La publication suit ce même commit.

## Correctif retour bibliothèque - 13 août 2026

- Le dernier guide ouvert reste le point de reprise visuel, mais l'index du hero
  est toujours construit depuis les guides publiés.
- Une mémoire locale contenant une seule fiche ne doit jamais réduire l'accueil
  à une seule soluce ; le retour doit laisser toutes les cartes et la recherche
  disponibles.
- Le smoke test vérifie la séparation entre `heroGuides` et l'historique local.

## Refonte lecteur - audit de lisibilité - 13 août 2026

- Le TXT reste la source éditoriale intacte ; la passe ne supprime ni étape, ni
  coffre, ni succès, ni paragraphe. Seule la couche de lecture est refondue.
- Le parseur distingue désormais les vrais titres des étapes numérotées : `10.`
  ne peut plus être rendu comme un chapitre géant uniquement parce qu'il contient
  deux chiffres.
- Le sommaire conserve les sections navigables, tandis que chaque étape reste
  dans le corps avec son numéro, son texte, ses marqueurs et son ancre.
- Le mobile place le document avant la navigation secondaire et replie le sommaire
  jusqu'à ouverture explicite. Les captures et mesures doivent contrôler cette
  hiérarchie avant le build, le préflight et le commit unique.

## Correctif lecteur - sequences vides - 14 aout 2026

- Toute passe de lecteur doit verifier que les niveaux `#`, `##` et `###` ne
  sont pas aplatis en une seule hierarchie visuelle.
- Un titre sans contenu descendant ne doit ni produire une sequence vide ni
  apparaitre dans le sommaire ; le TXT reste la source intacte.
- Le strict guardrail des guides visibles est lance avec le build, le preflight,
  l'audit qualite et les smoke tests avant l'unique commit de cloture.

## Sommaire hierarchique - 14 aout 2026

- Une refonte du lecteur doit verifier la hierarchie reelle de chaque guide
  visible : sections, sous-sections, zones et etapes ne sont pas interchangeables.
- Les groupes longs sont repliables, leurs compteurs restent lisibles et chaque
  entree conserve une ancre vers le contenu exact.
- Le lot se ferme par validation du catalogue, build, preflight, audit qualite,
  lint et smoke tests, puis un unique commit poussé.

## Acces local apres chaque commit - 14 aout 2026

- Apres chaque commit d'interface, ouvrir `APERCU_LOCAL.cmd` et controler la
  version sur `http://localhost:3000/` avant toute publication Cloudflare.
- L'adresse et le port sont fixes afin de garder un favori navigateur permanent.
- Le build, le preflight, l'audit, le lint et les smoke tests restent obligatoires
  ; le serveur local ne les remplace pas.

## Regression lecteur Cloudflare - 14 aout 2026

- Une verification de publication doit tester l'accueil et une URL directe de
  fiche, par exemple `/?guide=octopath`.
- Le lecteur capture `event.currentTarget.open` avant le setter React ; un
  `event.currentTarget.open` lu dans l'updater peut devenir `null.open` et faire
  tomber toute la page avec l'ecran "This page couldnt load".
- Cette correction est couverte par le validateur source, les smoke tests et le
  test local avant le commit final. Les TXT et leur copie Pages restent inchanges.

## Regle active de livraison - commit et push

- Pour chaque demande de modification terminee : validations obligatoires,
  commit unique, puis push sur la branche de travail.
- Les questions, pauses, diagnostics en lecture seule et taches bloquees ne
  creent ni commit vide ni push.
- Une ancienne URL de preview Cloudflare reste immuable ; le push declenche une
  nouvelle publication lorsque l integration GitHub est active.

## Rendu lisible des tableaux - 14 aout 2026

- Les tableaux presents dans un TXT sont une structure de lecture, pas du texte
  a concatener : le lecteur conserve leurs en-tetes et chacune de leurs lignes.
- Le desktop affiche des colonnes et le mobile des cartes etiquetees ; cette
  adaptation ne supprime aucune information et n ecrit jamais dans le TXT.
- Avant publication, verifier une fiche qui contient effectivement un tableau,
  notamment `/?guide=octopath`, a 390 px et sur desktop, puis relancer la chaine
  complete de validations avant le commit et le push.

## Semantique du parcours - 14 aout 2026

- Avant de publier une refonte du lecteur, verifier que les sequences ne
  regroupent que la route jouable et que le titre du guide ne compte pas.
- Les informations annexes restent dans la meme fiche, mais apparaissent dans
  une categorie distincte de dossiers de reference du sommaire.
- Le controle final doit confirmer cette separation sur OT1, OT2 et Expedition
  33, puis build, preflight, audit, lint, smoke tests, commit et push.

## Workflow canonique - toujours integrer les demandes - 14 aout 2026

Toute demande utilisateur devient une tache suivie jusqu a sa vraie destination.
Le travail ne se limite pas a noter une intention :

- un nouveau jeu est ajoute au catalogue et a la queue avec son statut ;
- un guide est ajoute a son TXT, sa fiche, ses registres, ses donnees de
  publication et son rendu ;
- un succes, coffre, objet, icone, annexe ou correction est integre a la source
  et verifie dans l interface ;
- si l element n est pas encore verifie, il reste present en `planned`,
  `research`, `archive-rebuild` ou `hold`, jamais efface par omission ;
- une fiche retiree de l accueil reste preservee dans l archive et ne redevient
  visible qu apres une cloture complete.

## Workflow editorial - soluce premium complete

1. Fixer le perimetre : route chronologique exhaustive, 100 % du jeu et des
   succes Steam, spoilers autorises, contenus optionnels et conditions de
   rattrapage.
2. Lire au moins cinq familles de sources independantes, conserver une matrice
   de preuves, resoudre les contradictions et rediger une route originale.
3. Relever les noms de succes sur la page Steam francaise officielle. Les
   intitulés sont conserves sans traduction litterale dans
   `docs/steam-achievements-fr.json`, puis compares ligne par ligne au TXT.
4. Structurer la fiche sans perte : sequences pour la route jouable uniquement,
   dossiers de reference pour alertes, checklists, compteurs, registres et
   inventaires ; `[COFFRE]` est le marqueur commun des coffres et objets a
   trouver.
5. Controler la completude des lieux, coffres, objets, quetes, missables,
   combats, solutions, fins et succes. Un compteur sans emplacement ni
   condition exploitable ne vaut pas une soluce complete.

## Workflow technique de cloture

- Lancer validation catalogue + guides, build, preflight strict, audit qualite,
  lint, smoke tests et controle du diff.
- Ouvrir `APERCU_LOCAL.cmd` et verifier la fiche sur desktop et mobile, ainsi
  que les URL directes `?guide=...`.
- La version du site augmente de `0.01` au commit. Apres une modification
  terminee : commit unique puis push. Les questions, pauses, diagnostics en
  lecture seule et blocages externes ne produisent ni commit vide ni push.

## Workflow de lecture - route nette et annexes repliables - 14 aout 2026

- Avant publication, verifier que la couverture porte le titre une seule fois
  et que le corps commence par une hierarchie de lecture claire.
- La route jouable reste ouverte et centrale. Les regles, alertes globales,
  sauvegardes, inventaires, compteurs et checklists sont regroupes dans
  `AVANT DE COMMENCER` ou `DOSSIERS DE REFERENCE`, fermes par defaut.
- La recherche doit retrouver tous les blocs du TXT dans leur ordre source,
  meme lorsqu elle traverse plusieurs dossiers ; aucune information editoriale
  ne peut etre retiree pour simplifier l interface.
- La verification finale ouvre une fiche reelle sur desktop et 390 px, controle
  les deux panneaux, une recherche, le sommaire, l absence de sequence vide et
  l absence de debordement avant le commit, le push et le deploiement.

## Workflow de navigation - retour fiable - 14 aout 2026

- Toute modification du lecteur doit tester le cycle fiche -> `Toutes les
  soluces` -> bibliotheque -> fiche suivante.
- Le test mesure la visibilite effective de la bibliotheque apres retour :
  cartes presentes, section `#guides` affichee, opacite active et scroll amene
  au sommaire. Compter les elements dans le DOM ne valide pas le rendu.
- Le bouton precedent du navigateur doit produire le meme resultat et conserver
  les filtres, la recherche et la lettre A-Z quand ils etaient actifs.

## Workflow de lecture - orientation continue - 14 aout 2026

- Chaque sequence de la route est rendue dans une carte visuelle distincte ;
  les blocs du TXT restent dans leur ordre et leur contenu n est pas reecrit.
- La carte correspondant a la position reelle du lecteur recoit un accent
  visuel ; cette indication aide a se reperer sans remplacer le sommaire.
- La verification finale controle au moins une sequence courte, une sequence
  avec sous-sections, un tableau, la recherche et le rendu 390 px avant build,
  commit, push et deploiement.

- Sur une fiche longue, verifier que la barre fixe affiche la sequence en cours
  ou a suivre et sa position dans le parcours.
- Faire defiler au moins deux sequences et controler que le sommaire change de
  surbrillance sur la sequence et la sous-section correspondantes.
- Verifier desktop et 390 px, ainsi que la recherche : les repères d orientation
  ne doivent ni deborder, ni masquer le texte, ni modifier l ordre editorial.
