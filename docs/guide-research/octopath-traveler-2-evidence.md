# Matrice de preuve — Octopath Traveler II

Passe de reconstruction : 13 août 2026

Ce fichier documente les contrôles utilisés pour la fiche publiée
`public/guides/octopath-traveler-2.txt`. Il accompagne la carte `octopath-2`
et la publication du TXT dans `docs/site-publication.json`.

## Périmètre contrôlé

- 33 succès Steam officiels.
- 8 histoires individuelles, 4 Crossed Paths en 2 actes, et le chapitre final.
- 67 Side Stories, dont `The Traveler's Bag` et `A Gate Between Worlds`.
- 30 Gramophone Records.
- 7 pièces Battle-Tested.
- 16 EX Skills, 8 jobs secondaires, 4 jobs avancés.
- 69 repères de lieux sur la carte.
- 632 coffres et 237 objets cachés, comptés séparément des succès.

## Cinq piliers de recoupement

| Pilier | Source | Usage dans la fiche | Limite conservée |
| --- | --- | --- | --- |
| Steam | [liste officielle des succès](https://steamcommunity.com/stats/1971650/achievements) | noms, descriptions et compteur 33/33 | ne décrit pas les coffres ni les solutions de quêtes |
| Quêtes | [RPG Site — 67 Side Stories](https://www.rpgsite.net/feature/13868-octopath-traveler-ii-side-quests-guide-walkthrough-for-all-side-stories) | déclencheurs, étapes, récompenses et prérequis | les variantes de Path Action doivent rester indiquées |
| Carte et zones | [RPG Soluce — lieux, coffres et niveaux](https://www.rpgsoluce.com/soluces/ps5/octopath-traveler-2/monde/zones.htm) | 69 lieux, zones, autels, ports et volumes de coffres | une carte de zone n'est pas une preuve d'ouverture en jeu |
| Route détaillée | [Neoseeker — walkthrough](https://www.neoseeker.com/octopath-traveler-ii/walkthrough) et [Game8 — guides de zones](https://game8.co/games/Octopath-Traveler-2) | routes de donjons, conditions de combats, coffres gardés et objets clés | certaines pages sont difficiles à extraire automatiquement, d'où le contrôle par matrice |
| Inventaire | [matrice communautaire des ressources](https://docs.google.com/spreadsheets/d/1ujgl9WjfhevFsHI_IoRyUeRygv8fX3PXRT9-v1EO42c/edit?usp=sharing) | décompte 632 coffres, 237 objets cachés, noms et sous-zones | matrice de contrôle, pas une source officielle ; elle ne remplace pas les directions de route |

Sources complémentaires utilisées pour les couches ciblées :

- [Gamer Journalist — 30 Gramophone Records](https://gamerjournalist.com/all-gramophone-record-locations-in-octopath-traveler-2/)
- [Neoseeker — Battle-Tested equipment](https://www.neoseeker.com/octopath-traveler-ii/walkthrough/All_Battle-Tested_Equipment_Locations)
- [Game8 — Gate of Finis et ses coffres](https://game8.co/games/Octopath-Traveler-2/archives/407292)

## Règle de comptage

Le registre `#001` à `#632` compte une fois chaque cellule de coffre de la
matrice, y compris lorsque deux coffres ont le même contenu. Le registre
`H001` à `H237` compte séparément les cellules d'objets cachés. Une récompense
de quête, un achat, une arme rouillée ou un Record ne peut pas être ajouté à
l'un de ces deux compteurs.

Chaque ligne de coffre contient au minimum la région, la sous-zone, le numéro
local dans la sous-zone et le contenu. Les conditions visibles dans la matrice
(`Guarded`, `Fight`, `Sidequest`, verrou de chapitre) sont conservées dans le
contenu de la ligne. Les lignes d'objets cachés gardent le même repère de zone
mais restent un compteur séparé.

## Contrôles automatisés attendus

Le validateur strict doit refuser la passe si :

- un identifiant de coffre manque, est dupliqué ou ne va pas de `#001` à `#632` ;
- un identifiant d'objet caché manque, est dupliqué ou ne va pas de `H001` à `H237` ;
- un coffre n'a pas `Emplacement :` et son numéro local ;
- le TXT réintroduit `SANS SPOILER`, une ligne tronquée ou le placeholder
  `aucun repère additionnel` ;
- les registres de 67 Side Stories, 30 Records, 7 Battle-Tested, 33 succès ou
  69 lieux ne correspondent plus à leurs sections.

La fiche reste soumise à ses contrôles de contenu après publication. Le commit
de cette passe est unique et local ; aucun push distant n'est implicite.
