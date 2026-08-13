# Matrice de recherche — Octopath Traveler 1

Date de recoupement : 13 août 2026  
Périmètre : jeu de base PC/Steam, spoilers autorisés, route chronologique et
100 % des succès Steam.

## Méthode appliquée

La fiche n'est pas une copie d'une soluce unique. Elle est rédigée après
recoupement de cinq familles de sources, puis contrôlée contre une matrice de
complétion structurée :

1. Steam officiel : fiche du jeu et liste des 88 succès.
2. Parcours chronologique Steam : ordre des chapitres, fenêtres et nettoyage.
3. Carte interactive Steam : zones, coffres, sanctuaires, monstres et récits.
4. Tableur de complétion public : contenu des coffres, objets cachés, quêtes,
   ennemis, inventaire et équipement.
5. Guides spécialisés : solutions des 101 récits, objets cachés, ennemis,
   faiblesses, objets manquables et Galdera.

La rédaction finale est originale. Les sources servent à comparer les
compteurs, les emplacements et les fenêtres ; aucune source seule n'est
considérée comme suffisante pour déclarer la fiche complète.

## Compteurs retenus

| Élément | Valeur retenue | Contrôle intégré |
|---|---:|---|
| Succès Steam | 88 | checklist finale 88/88 |
| Chapitres | 32 | 4 chapitres pour chacun des 8 voyageurs |
| Récits annexes | 101 | solutions et récompenses dans l'annexe C |
| Sanctuaires de jobs | 12 | 8 jobs secondaires + 4 jobs avancés |
| Coffres | 734 | annexe A, par zone et contenu |
| Objets cachés | 152 | annexe B, par ville/zone et PNJ |
| Ennemis de Strategist | 381 | 371 normaux + 10 mini-boss, annexe D |
| Objets Collector | inventaire séparé | consommables, précieux, connaissances et équipement |

## Contradictions résolues

### Coffres : 721 dans l'ancien PDF contre 734 dans la matrice actuelle

Le PDF Sullla contient 721 lignes de coffres détaillées. La checklist publique
actuelle, la carte Steam et le guide chronologique convergent vers 734. Le PDF
reste donc utilisé pour les directions et la couleur du coffre uniquement quand
la zone et l'ordre concordent. Les treize lignes absentes ou divergentes du
PDF restent dans l'annexe A avec leur zone et leur contenu actuels ; elles ne
sont pas supprimées pour faire correspondre artificiellement un ancien total.

Les noms de certaines zones diffèrent aussi selon les éditions des listes
(Yvon's Birthplace/Cellar, Ruin(s) of Eld, Spectrewood Trail/Path,
Whisperwood/Wisperwood et les donjons séparés par niveau). La fiche conserve
les noms du jeu et sépare les zones lorsque la checklist actuelle les sépare.

### Strategist : 381 entrées, pas tous les boss

Le total 381 comprend les 371 ennemis normaux et les 10 mini-boss requis par
le registre de faiblesses. Les boss narratifs, les boss de récits et les quatre
sanctuaires avancés sont conservés dans un registre `[BOSS]` séparé : ils sont
nécessaires au nettoyage, mais ne doivent pas gonfler le compteur Strategist.

Les quatre entrées à traiter avec une sauvegarde de sécurité sont Meep,
Cactus Roller, Sea Birdian IV et Buccaneer I. Les faiblesses se révèlent avec
Étudier l'ennemi ; les variantes numérotées restent des entrées distinctes.

### Objets cachés : 152 et bonus temporaire

Le compteur contrôlé est 152. Zeph, Meryl, Bale et le Crest-bearing Swindler
sont signalés comme les quatre pièges récurrents. Le Herald de Lord Ciaran à
S'warkii est conservé comme bonus temporaire pour l'inventaire littéral, mais
ne remplace pas une ligne du compteur officiel 152.

### Collector et objets uniques

La matrice sépare les consommables, les objets précieux, les connaissances et
l'équipement. Les objets doivent être obtenus au moins une fois ; les objets
uniques et les récompenses de boss sont conservés jusqu'à l'apparition du
succès. Les boutiques, vols/achats de PNJ, coffres, objets cachés et
récompenses de récits sont tous couverts par la route ou l'annexe Collector.

## Livraison contrôlée

- `public/guides/octopath-traveler-1.txt` contient la route existante et les
  annexes intégrées, pas un lien externe à suivre pour obtenir les informations.
- `app/GuideReader.tsx` active les cinq marqueurs premium pour `octopath`.
- Le catalogue annonce 88/88, 734 coffres, 152 objets cachés et les spoilers
  autorisés ; l'ancienne mention « sans spoiler » est interdite pour cette
  fiche.
- `docs/site-publication.json` reste limité à Expedition 33 et Octopath 1 ;
  les anciennes fiches restent dans l'archive et invisibles sur le site.

## Sources

- Steam officiel : https://store.steampowered.com/app/921570/OCTOPATH_TRAVELER/
- Succès : https://steamcommunity.com/stats/921570/achievements
- Route chronologique : https://steamcommunity.com/sharedfiles/filedetails/?id=3612226658
- Carte : https://steamcommunity.com/sharedfiles/filedetails/?id=3729484643
- Manquables : https://steamcommunity.com/sharedfiles/filedetails/?id=1796269606
- Tableur : https://steamcommunity.com/sharedfiles/filedetails/?id=2309451625
- PDF de repères : https://sullla.com/Octopath/Octopath_Traveler_COMBINED.pdf
- Récits annexes : https://www.jeuxvideo.com/wikis-soluce-astuces/887725/liste-et-guide-des-quetes-annexes.htm
- Objets cachés : https://www.trueachievements.com/game/Octopath-Traveler/walkthrough/43
- Ennemis : https://www.trueachievements.com/game/Octopath-Traveler/walkthrough/44
- Quêtes : https://www.trueachievements.com/game/Octopath-Traveler/walkthrough/45
