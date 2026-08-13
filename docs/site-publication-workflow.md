# Workflow de publication temporaire Game Note

## Regle active

Pendant la reconstruction des guides, `docs/site-publication.json` est la
source unique du lot visible. Il contient les deux identifiants et les deux
fichiers actuellement autorises : Expedition 33 et Octopath Traveler 1.

`public/guides/` reste l'archive de travail complete. Un fichier archive ne
doit toutefois pas etre copie dans `dist/client/guides/`, ajoute au service
worker, ou rendu accessible par l'index tant qu'il n'est pas dans la liste de
publication temporaire.

La file editoriale `docs/guide-rebuild-queue.json` est distincte de la liste de
publication. Elle enregistre les deux references actives, les fiches a refaire
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
de 0,01 a chaque commit, sans pousser automatiquement vers le depot distant.

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
- OCTOPATH TRAVELER 0 est passe en `research` avec son AppID, ses 37 succes et
  `docs/guide-research/octopath-traveler-0-evidence.md`, mais sans faux TXT,
  carte ou URL avant la validation de la matrice.
- Dota Underlords, Rocket League, Dota 2, Brotato et FINAL FANTASY VII EVER
  CRISIS restent `excluded` : aucune modification de masquage ne doit les faire
  reapparaitre comme soluces classiques.

## Controle editorial OCTOPATH TRAVELER 0

La matrice OT0 doit conserver les cinq piliers de recherche, les compteurs
provisoires et les contradictions avant le premier fichier de soluce. Le
validateur verifie le lien `evidenceFile` de la queue ; passer l'entree en
`research` sans matrice est donc une erreur de livraison.

La publication temporaire reste inchangée : seuls Expedition 33 et Octopath
Traveler 1 sont visibles, et les modifications d'interface déjà présentes
dans le dépôt ne doivent pas être mélangées à ce lot éditorial.

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
