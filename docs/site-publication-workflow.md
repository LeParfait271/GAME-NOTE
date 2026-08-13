# Workflow de publication temporaire Game Note

## Regle active

Pendant la reconstruction des guides, `docs/site-publication.json` est la
source unique du lot visible. Il contient les deux identifiants et les deux
fichiers actuellement autorises : Expedition 33 et Octopath Traveler 1.

`public/guides/` reste l'archive de travail complete. Un fichier archive ne
doit toutefois pas etre copie dans `dist/client/guides/`, ajoute au service
worker, ou rendu accessible par l'index tant qu'il n'est pas dans la liste de
publication temporaire.

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
