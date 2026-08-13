"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GuideReader from "./GuideReader";
import { SITE_VERSION } from "./site-version";

type Guide = {
  id: string;
  steamAppId: number;
  artworkUrl?: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  count: string;
  file: string;
  accent: string;
  tag: string;
  description: string;
  highlight: string;
  meta: string[];
};

const guides: Guide[] = [
  {
    id: "expedition-33",
    steamAppId: 1903340,
    title: "Expedition 33",
    eyebrow: "Clair Obscur",
    subtitle: "Route chronologique complète, spoilers autorisés et 55 succès Steam.",
    count: "55 succès",
    file: "expedition-33.txt",
    accent: "coral",
    tag: "Nouveau guide",
    description:
      "Route par actes, missables, choix finaux, journaux, disques, Nevrons et nettoyage 100 %.",
    highlight:
      "À surveiller : le Mime et le disque du prologue, la Vieille Clé, Lettre à Maelle et Truth.",
    meta: ["55/55 Steam", "49 journaux / 33 disques", "Spoilers autorisés"],
  },
  {
    id: "final-fantasy-vii-2013",
    steamAppId: 39140,
    title: "FINAL FANTASY VII (2013)",
    eyebrow: "Final Fantasy",
    subtitle: "Les 36 succes et les grandes fenetres dans l'ordre.",
    count: "36 succes",
    file: "final-fantasy-vii-2013.txt",
    accent: "gold",
    tag: "Guide marathon",
    description:
      "Castellans, tresors, stands de tir, armes, Professional, restrictions et records.",
    highlight:
      "A surveiller : les requetes du marchand, les 16 Castellans et les runs S+.",
    meta: ["36/36 Steam", "16 chapitres", "Sans spoiler"],
  },
  {
    id: "resident-evil-5",
    steamAppId: 21690,
    title: "Resident Evil 5",
    eyebrow: "CAPCOM",
    subtitle: "Campagne, DLC et cooperation jusqu'au 100 %.",
    count: "70 succes",
    file: "resident-evil-5.txt",
    accent: "coral",
    tag: "DLC et coop",
    description:
      "Emblemes, tresors, armes, Professional, Lost in Nightmares, Reunion et Versus.",
    highlight:
      "A surveiller : les 30 emblemes, les ameliorations et la disponibilite des modes en ligne.",
    meta: ["70/70 Steam", "4 DLC", "Coop a verifier"],
  },
  {
    id: "resident-evil-6",
    steamAppId: 221040,
    title: "Resident Evil 6",
    eyebrow: "CAPCOM",
    subtitle: "Quatre campagnes, competences et Professional.",
    count: "70 succes",
    file: "resident-evil-6.txt",
    accent: "blue",
    tag: "Puzzle 100 %",
    description:
      "Ordre des chambres, six cartes avancees et trois niveaux de medailles.",
    highlight:
      "A surveiller : radios, cameras, salles avancees et medailles des defis.",
    meta: ["15/15 Steam", "Hors ligne", "Sans spoiler"],
  },
  {
    id: "portal-2",
    steamAppId: 620,
    title: "Portal 2",
    eyebrow: "Valve",
    subtitle: "Solo puis cinq parcours cooperatifs dans l'ordre.",
    count: "51 succes",
    file: "portal-2.txt",
    accent: "coral",
    tag: "Solo + coop",
    description:
      "Chambres, objets caches, gestes, contraintes de cubes et succes en ligne.",
    highlight:
      "A surveiller : partenaire debutant pour Professor Portal et sessions d'actions.",
    meta: ["51/51 Steam", "Coop en ligne", "Sans spoiler"],
  },
  {
    id: "bioshock-remastered",
    steamAppId: 409710,
    title: "BioShock Remastered",
    eyebrow: "2K Games",
    subtitle: "Rapture, recherches, petites soeurs et Challenge Rooms.",
    count: "65 succes",
    file: "bioshock-remastered.txt",
    accent: "coral",
    tag: "Guide complet",
    description:
      "Campagne, hacks, recherches, inventions, tonics, fins et trois Challenge Rooms.",
    highlight:
      "A surveiller : petites soeurs, recherche par zone, chambre optionnelle et saves de difficulte.",
    meta: ["65/65 Steam", "DLC inclus", "Sans spoiler"],
  },
  {
    id: "bioshock-2-remastered",
    steamAppId: 409720,
    title: "BioShock 2 Remastered",
    eyebrow: "2K Games",
    subtitle: "Rapture, ADAM, Protector Trials et Minerva's Den.",
    count: "53 succes",
    file: "bioshock-2-remastered.txt",
    accent: "blue",
    tag: "Campagne + DLC",
    description:
      "Petites soeurs, recherche, armes, difficulte, Trials et Vacuum Bots.",
    highlight:
      "A surveiller : Vita-Chambers, recherches, 36 etoiles des Trials et 10 Vacuum Bots.",
    meta: ["53/53 Steam", "DLC inclus", "Sans spoiler"],
  },
  {
    id: "black-mesa",
    steamAppId: 362890,
    title: "Black Mesa",
    eyebrow: "Crowbar Collective",
    subtitle: "Campagne complete, Xen, caches et actions techniques.",
    count: "50 succes",
    file: "black-mesa.txt",
    accent: "coral",
    tag: "Campagne FPS",
    description:
      "Route chronologique pour les scientifiques, caches, armes et objectifs Xen.",
    highlight:
      "A surveiller : pacifisme, stealth, chrono, choix de fin et objectifs de Xen.",
    meta: ["50/50 Steam", "Solo", "Sans spoiler"],
  },
  {
    id: "jotun-valhalla-edition",
    steamAppId: 323580,
    title: "Jotun: Valhalla Edition",
    eyebrow: "Thunder Lotus",
    subtitle: "Boss, sanctuaires, pommes et Valhalla Mode.",
    count: "36 succes",
    file: "jotun-valhalla-edition.txt",
    accent: "blue",
    tag: "Boss rush",
    description:
      "Exploration puis routes dediees pour les combats parfaits, temps et pouvoirs.",
    highlight:
      "A surveiller : essais sans pouvoir, parfaits, contre-la-montre et Valhalla.",
    meta: ["36/36 Steam", "Hors ligne", "Sans spoiler"],
  },
  {
    id: "little-nightmares-ii",
    steamAppId: 860510,
    title: "Little Nightmares II",
    eyebrow: "Tarsier Studios",
    subtitle: "Cinq chapitres, chapeaux, glitches et actions cachees.",
    count: "35 succes",
    file: "little-nightmares-ii.txt",
    accent: "coral",
    tag: "Collectibles",
    description:
      "Route sans spoiler pour les collectes et les interactions de chaque chapitre.",
    highlight:
      "A surveiller : chapeaux, glitches et actions uniques avant chaque transition.",
    meta: ["35/35 Steam", "Hors ligne", "Sans spoiler"],
  },
  {
    id: "type-0",
    steamAppId: 340170,
    title: "Final Fantasy Type-0 HD",
    eyebrow: "Final Fantasy",
    subtitle: "Une partie organisée jusqu’au 100 % Steam.",
    count: "49 succès",
    file: "final-fantasy-type-0-hd.txt",
    accent: "blue",
    tag: "Route anti-missables",
    description:
      "Le parcours chapitre par chapitre avec les Eidolons, les villes, les Moogles, les Chocobos et les compteurs.",
    highlight:
      "À surveiller : le dernier grand créneau libre avant la deuxième mission du chapitre 7.",
    meta: ["49/49 Steam", "6 Eidolons", "13 Moogles"],
  },
  {
    id: "octopath",
    steamAppId: 921570,
    title: "Octopath Traveler",
    eyebrow: "Octopath Traveler 1",
    subtitle: "Une route chronologique pour ne rien laisser derrière.",
    count: "100 % Steam",
    file: "octopath-traveler-1.txt",
    accent: "gold",
    tag: "Guide fondateur",
    description:
      "Les chapitres dans un ordre confortable, les personnages, les quêtes secondaires, les boss et les succès.",
    highlight:
      "À surveiller : les quêtes secondaires et les combats optionnels à faire avant la fin.",
    meta: ["Route chronologique", "100 % Steam", "Sans spoiler"],
  },
  {
    id: "octopath-2",
    steamAppId: 1971650,
    title: "Octopath Traveler II",
    eyebrow: "Octopath Traveler",
    subtitle: "Les huit routes, dans un ordre propre et lisible.",
    count: "33 succès",
    file: "octopath-traveler-2.txt",
    accent: "gold",
    tag: "Guide complet",
    description:
      "Chapitres, Crossed Paths, jobs avancés, équipements Battle-Tested et nettoyage final.",
    highlight:
      "À surveiller : les actions de ville, les jobs avancés et le boss optionnel final.",
    meta: ["33/33 Steam", "8 voyageurs", "Sans spoiler"],
  },
  {
    id: "after-years",
    steamAppId: 346830,
    title: "Final Fantasy IV: The After Years",
    eyebrow: "Final Fantasy",
    subtitle: "Les contes dans l’ordre conseillé, sans révéler l’histoire.",
    count: "50 succès",
    file: "final-fantasy-iv-the-after-years.txt",
    accent: "blue",
    tag: "Route des épisodes",
    description:
      "Ordre des contes, bandes, donjons de défi, objets rares et nettoyage Steam.",
    highlight:
      "À surveiller : l’ordre des contes, les bandes et les donjons de défi.",
    meta: ["50/50 Steam", "Contes complets", "Sans spoiler"],
  },
  {
    id: "divided-reigns",
    steamAppId: 1139160,
    title: "Divided Reigns",
    eyebrow: "RPG indépendant",
    subtitle: "Une progression complète avec les quatre difficultés.",
    count: "40 succès",
    file: "divided-reigns.txt",
    accent: "coral",
    tag: "Route intégrale",
    description:
      "Actes, bounties, villes libérées, attaques maîtrisées et tombeau optionnel.",
    highlight:
      "À surveiller : les deux réponses de l’enquête et les compteurs d’attaques.",
    meta: ["40/40 Steam", "4 difficultés", "Sans spoiler"],
  },
  {
    id: "hellblade",
    steamAppId: 414340,
    title: "Hellblade: Senua’s Sacrifice",
    eyebrow: "Ninja Theory",
    subtitle: "La campagne et les 44 lorestones dans le même parcours.",
    count: "14 succès",
    file: "hellblade-senuas-sacrifice.txt",
    accent: "blue",
    tag: "Collectibles guidés",
    description:
      "Ordre des chapitres, pierres de savoir et vérification du seul succès à collectionner.",
    highlight:
      "À surveiller : les lorestones avant de quitter chaque chapitre.",
    meta: ["14/14 Steam", "44 lorestones", "Sans spoiler"],
  },
  {
    id: "rdr2",
    steamAppId: 1174180,
    title: "Red Dead Redemption 2",
    eyebrow: "Rockstar Games",
    subtitle: "Histoire, 100 % interne et Red Dead Online séparés.",
    count: "51 succès",
    file: "red-dead-redemption-2.txt",
    accent: "coral",
    tag: "Guide marathon",
    description:
      "Chapitres, activités de camp, compendium, médailles d’or et 18 succès Online.",
    highlight:
      "À surveiller : les activités de camp, les demandes et les missions d’honneur.",
    meta: ["51/51 Steam", "100 % interne", "Sans spoiler"],
  },
  {
    id: "breath-of-fire-iv",
    steamAppId: 4249150,
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4249150/426a889a2d4ec776dc4d87530dadd659ffa393a6/header.jpg?t=1784878197",
    title: "Breath of Fire IV",
    eyebrow: "Capcom",
    subtitle: "La campagne complète et le contenu optionnel, sans faux succès.",
    count: "0 succès Steam",
    file: "breath-of-fire-iv.txt",
    accent: "gold",
    tag: "Contenu complet",
    description:
      "Route, maîtres, dragons, village des fées, pêche, mini-jeux et sauvegarde claire.",
    highlight:
      "À surveiller : Una, les Treasure Balls, les fées et les techniques de maîtres.",
    meta: ["0 succès Steam", "100 % contenu", "Sans spoiler"],
  },
  {
    id: "titan-quest-anniversary-edition",
    steamAppId: 475150,
    title: "Titan Quest Anniversary Edition",
    eyebrow: "Iron Lore",
    subtitle: "Les trois difficultés et les trois DLC dans une seule route.",
    count: "115 succès",
    file: "titan-quest-anniversary-edition.txt",
    accent: "blue",
    tag: "Guide XXL",
    description:
      "Campagnes, classes Legendary, zéro mort, coopératif, Ragnarok, Atlantis et Eternal Embers.",
    highlight:
      "À surveiller : les DLC, les personnages zéro mort et les maîtrises Legendary.",
    meta: ["115/115 Steam", "3 DLC", "Sans spoiler"],
  },
  {
    id: "jedi-survivor",
    steamAppId: 1774580,
    title: "STAR WARS Jedi: Survivor",
    eyebrow: "Star Wars",
    subtitle: "Planètes, collectibles et 53 succès dans le bon ordre.",
    count: "53 succès",
    file: "star-wars-jedi-survivor.txt",
    accent: "coral",
    tag: "Nettoyage post-jeu",
    description:
      "Chambres Jedi, Failles, primes, holotactiques, poissons, jardin et scans.",
    highlight:
      "À surveiller : les assistances de compagnons avant la dernière séquence.",
    meta: ["53/53 Steam", "100 % zones", "Sans spoiler"],
  },
  {
    id: "chrono-trigger",
    steamAppId: 613830,
    title: "CHRONO TRIGGER",
    eyebrow: "Square Enix",
    subtitle: "Les 13 fins et leurs fenêtres de Nouvelle Partie +.",
    count: "13 succès",
    file: "chrono-trigger.txt",
    accent: "gold",
    tag: "Fins guidées",
    description:
      "Route principale, fins, objets clés et nettoyage NG+ sans exposer les événements.",
    highlight:
      "À surveiller : les fenêtres de fin et les sauvegardes avant le dernier combat.",
    meta: ["13/13 Steam", "13 fins", "Sans spoiler"],
  },
  {
    id: "chrono-cross",
    steamAppId: 1133760,
    title: "CHRONO CROSS",
    eyebrow: "The Radical Dreamers Edition",
    subtitle: "Techniques, cadres, NG+ et personnages, sans spoiler.",
    count: "37 succès",
    file: "chrono-cross-the-radical-dreamers-edition.txt",
    accent: "blue",
    tag: "Route multi-parties",
    description:
      "Les techniques uniques, 15 cadres, les fins NG+, Mastermune et le recrutement complet.",
    highlight:
      "À surveiller : Kid, Razzly, les cadres à fenêtre courte et les trois parcours.",
    meta: ["37/37 Steam", "15 cadres", "Sans spoiler"],
  },
  {
    id: "grandia-ii",
    steamAppId: 330390,
    title: "GRANDIA II HD Remaster",
    eyebrow: "Grandia",
    subtitle: "Une partie propre jusqu’au dernier succès manquable.",
    count: "36 succès",
    file: "grandia-ii-hd-remaster.txt",
    accent: "coral",
    tag: "Route HD",
    description:
      "Anniversary Edition, objets rares, boss optionnels, difficulté Hard et Hut of Trials.",
    highlight:
      "À surveiller : Exorcism Bow, Melfice avec Ryudo seul et la branche Hard.",
    meta: ["36/36 Steam", "Hard requis", "Sans spoiler"],
  },
  {
    id: "ori",
    steamAppId: 1057090,
    title: "Ori and the Will of the Wisps",
    eyebrow: "Moon Studios",
    subtitle: "Exploration, quêtes et runs à contrainte dans le même plan.",
    count: "37 succès",
    file: "ori-and-the-will-of-the-wisps.txt",
    accent: "gold",
    tag: "100 % exploration",
    description:
      "Zones, sanctuaires, courses, fragments, quêtes, combats et runs dédiés.",
    highlight:
      "À surveiller : les objectifs de temps, de difficulté et les sauvegardes de sécurité.",
    meta: ["37/37 Steam", "100 % zones", "Sans spoiler"],
  },
  {
    id: "gris",
    steamAppId: 683320,
    title: "GRIS",
    eyebrow: "Nomada Studio",
    subtitle: "Une route courte avec les 28 mementos bien placés.",
    count: "17 succès",
    file: "gris.txt",
    accent: "blue",
    tag: "Guide contemplatif",
    description:
      "Les cinq chapitres, mementos, animaux et statues, sans expliquer les images.",
    highlight:
      "À surveiller : les mementos de chaque chapitre avant de changer de zone.",
    meta: ["17/17 Steam", "28 mementos", "Sans spoiler"],
  },
  {
    id: "resident-evil-0",
    steamAppId: 339340,
    title: "Resident Evil 0",
    eyebrow: "Resident Evil",
    subtitle: "La route des 47 succès, modes bonus et armes.",
    count: "47 succès",
    file: "resident-evil-0.txt",
    accent: "coral",
    tag: "Nouveau guide",
    description:
      "Campagne, fichiers, Leech Hunter, Wesker Mode, rangs et contraintes dans l'ordre utile.",
    highlight:
      "À surveiller : les fichiers, les armes et les runs Leech Hunter / Wesker.",
    meta: ["47/47 Steam", "Leech Hunter", "Sans spoiler"],
  },
  {
    id: "resident-evil-revelations-2",
    steamAppId: 287290,
    title: "Resident Evil Revelations 2",
    eyebrow: "Resident Evil",
    subtitle: "Épisodes, médailles et Raid Mode sans spoiler.",
    count: "43 succès",
    file: "resident-evil-revelations-2.txt",
    accent: "blue",
    tag: "Nouveau guide",
    description:
      "Les quatre épisodes, les deux routes, les médailles, les modes alternatifs et le Raid.",
    highlight:
      "À surveiller : les médailles, le couteau, les routes et les modes Countdown / Invisible.",
    meta: ["43/43 Steam", "Médailles", "Raid Mode"],
  },
  {
    id: "resident-evil-revelations",
    steamAppId: 222480,
    title: "Resident Evil Revelations",
    eyebrow: "Resident Evil",
    subtitle: "Campagne, 30 empreintes et Raid Mode dans le même parcours.",
    count: "50 succès",
    file: "resident-evil-revelations.txt",
    accent: "gold",
    tag: "Nouveau guide",
    description:
      "Épisodes, scans, empreintes de main, difficultés, Ghost Ship et bonus Raid.",
    highlight:
      "À surveiller : les 30 empreintes sans sélection de chapitre et les extractions de campagne.",
    meta: ["50/50 Steam", "30 empreintes", "Raid Mode"],
  },
  {
    id: "assassins-creed-rogue",
    steamAppId: 311560,
    title: "Assassin's Creed Rogue",
    eyebrow: "Assassin's Creed",
    subtitle: "Campagne, carte et défis Abstergo dans l’ordre.",
    count: "46 succès",
    file: "assassins-creed-rogue.txt",
    accent: "coral",
    tag: "Nouveau guide",
    description:
      "Synchronisation complète, QG, forts, ordinateurs, navires et collectibles.",
    highlight:
      "À surveiller : les 35 défis Abstergo, les 20 ordinateurs et les compteurs navals.",
    meta: ["46/46 Steam", "35 défis", "Sans online"],
  },
  {
    id: "a-plague-tale-innocence",
    steamAppId: 752590,
    title: "A Plague Tale: Innocence",
    eyebrow: "Asobo Studio",
    subtitle: "La campagne et les 50 collectibles sans spoiler.",
    count: "35 succès",
    file: "a-plague-tale-innocence.txt",
    accent: "blue",
    tag: "Nouveau guide",
    description:
      "Chapitres, cadeaux, curiosités, fleurs, chariots d’alchimiste et actions spécifiques.",
    highlight:
      "À surveiller : les actions de chapitre et les collectibles à reprendre par sélection.",
    meta: ["35/35 Steam", "50 collectibles", "Sans spoiler"],
  },
  {
    id: "inside",
    steamAppId: 304430,
    title: "INSIDE",
    eyebrow: "Playdead",
    subtitle: "Les 14 orbes cachées dans un parcours propre.",
    count: "14 succès",
    file: "inside.txt",
    accent: "gold",
    tag: "Nouveau guide",
    description:
      "Chaque orb dans l’ordre, avec la dernière réservée au nettoyage final.",
    highlight:
      "À surveiller : la quatorzième orb ne devient accessible qu’après les treize premières.",
    meta: ["14/14 Steam", "14 orbes", "Sans spoiler"],
  },
  {
    id: "final-fantasy-viii-remastered",
    steamAppId: 1026680,
    title: "FINAL FANTASY VIII - REMASTERED",
    eyebrow: "Final Fantasy",
    subtitle: "G-Forces, cartes et missables dans l'ordre des disques.",
    count: "34 succès",
    file: "final-fantasy-viii-remastered.txt",
    accent: "blue",
    tag: "Nouveau guide",
    description:
      "Junctions, Timber Maniacs, Club de cartes, Doomtrain, UFO, Omega et compteurs.",
    highlight:
      "À surveiller : les extractions de G-Forces, les cartes et le bateau des SeeD blancs.",
    meta: ["34/34 Steam", "16 G-Forces", "Anti-missables"],
  },
  {
    id: "streets-of-rage-4",
    steamAppId: 985890,
    title: "Streets of Rage 4",
    eyebrow: "Dotemu",
    subtitle: "Stages, personnages, rangs et DLC Mr. X Nightmare.",
    count: "45 succès",
    file: "streets-of-rage-4.txt",
    accent: "coral",
    tag: "Nouveau guide",
    description:
      "Actions des 12 stages, combos, All Clear, bornes rétro, Arcade et Survival.",
    highlight:
      "À surveiller : les campagnes solo par personnage et les mouvements alternatifs du DLC.",
    meta: ["45/45 Steam", "Mr. X Nightmare", "Sans spoiler"],
  },
  {
    id: "final-fantasy-ix",
    steamAppId: 377840,
    title: "FINAL FANTASY IX",
    eyebrow: "Final Fantasy",
    subtitle: "La route des 85 succes, ATE et missables.",
    count: "85 succes",
    file: "final-fantasy-ix.txt",
    accent: "blue",
    tag: "Nouveau guide",
    description:
      "Disques, ATE, Tetra Master, Chocobo, grenouilles, monstres amicaux et run Excalibur II.",
    highlight:
      "A surveiller : 79 ATE, les quatre Moonstones, 1 000 sauts et la run sous 12 heures.",
    meta: ["85/85 Steam", "2 parcours", "Sans spoiler"],
  },
  {
    id: "final-fantasy-x-x-2-hd-remaster",
    steamAppId: 359870,
    title: "FINAL FANTASY X/X-2 HD Remaster",
    eyebrow: "Final Fantasy",
    subtitle: "Les deux jeux et les 69 succes sur une route controlee.",
    count: "69 succes",
    file: "final-fantasy-x-x-2-hd-remaster.txt",
    accent: "coral",
    tag: "Double parcours",
    description:
      "Primers, Aeons, Blitzball, armes celestes, pourcentage X-2, dresspheres et tour optionnelle.",
    highlight:
      "A surveiller : les Cloisters, 200 eclairs et le compteur 100 % de X-2.",
    meta: ["69/69 Steam", "FFX + X-2", "Sans spoiler"],
  },
  {
    id: "final-fantasy-xii-the-zodiac-age",
    steamAppId: 595520,
    title: "FINAL FANTASY XII THE ZODIAC AGE",
    eyebrow: "Final Fantasy",
    subtitle: "Chasses, cartes, jobs et Bestiaire jusqu'au 100 %.",
    count: "41 succes",
    file: "final-fantasy-xii-the-zodiac-age.txt",
    accent: "blue",
    tag: "Nouveau guide",
    description:
      "Les 12 jobs, les Espers, les 100 Trials, les Magies, Technicks, Concurrences et le Bestiaire.",
    highlight:
      "A surveiller : les cartes des zones uniques, le Bestiaire et les chasses optionnelles.",
    meta: ["41/41 Steam", "100 Trials", "Sans spoiler"],
  },
  {
    id: "final-fantasy-xv-windows-edition",
    steamAppId: 637650,
    title: "FINAL FANTASY XV WINDOWS EDITION",
    eyebrow: "Final Fantasy",
    subtitle: "Jeu principal, Royal, episodes et Comrades.",
    count: "97 succes",
    file: "final-fantasy-xv-windows-edition.txt",
    accent: "gold",
    tag: "Guide marathon",
    description:
      "Quetes, chasses, activites, Datalog, Royal Pack, quatre episodes et controle du mode Comrades.",
    highlight:
      "A surveiller : les 80 quetes, les documents, les scores Royal et la disponibilite de Comrades.",
    meta: ["97/97 Steam", "DLC inclus", "Online a verifier"],
  },
  {
    id: "a-plague-tale-requiem",
    steamAppId: 1182900,
    title: "A Plague Tale: Requiem",
    eyebrow: "Asobo Studio",
    subtitle: "Chapitres, collectibles et 35 succes sans spoiler.",
    count: "35 succes",
    file: "a-plague-tale-requiem.txt",
    accent: "coral",
    tag: "Nouveau guide",
    description:
      "Souvenirs, herbier, coffres secrets, objets du sanctuaire, actions de fenetre et competences.",
    highlight:
      "A surveiller : les couteaux des coffres, les cones, les couronnes et Old protector.",
    meta: ["35/35 Steam", "21 souvenirs", "Sans spoiler"],
  },
  {
    id: "final-fantasy-vii-rebirth",
    steamAppId: 2909400,
    title: "FINAL FANTASY VII REBIRTH",
    eyebrow: "Final Fantasy",
    subtitle: "Les 14 chapitres et le nettoyage 100 % sans spoiler.",
    count: "61 succes",
    file: "final-fantasy-vii-rebirth.txt",
    accent: "gold",
    tag: "Nouveau guide",
    description:
      "Regions, intel, quetes, Queen's Blood, piano, chocobos, Gold Saucer et defis de Chadley.",
    highlight:
      "A surveiller : l'affinite du chapitre 12, les mini-jeux et le Difficile.",
    meta: ["61/61 Steam", "14 chapitres", "Sans spoiler"],
  },
  {
    id: "fable-anniversary",
    steamAppId: 288470,
    title: "Fable Anniversary",
    eyebrow: "Lionhead Studios",
    subtitle: "La campagne et The Lost Chapters dans le bon ordre.",
    count: "50 succes",
    file: "fable-anniversary.txt",
    accent: "blue",
    tag: "Route anti-missables",
    description:
      "Cles d'argent, portes demon, armes legendaires, poupees, livres, peche et quetes.",
    highlight:
      "A surveiller : la chaine du maire et la porte de Necropolis qui consomme les cles.",
    meta: ["50/50 Steam", "30 cles", "Sans spoiler"],
  },
  {
    id: "fallout-new-vegas",
    steamAppId: 22380,
    title: "Fallout: New Vegas",
    eyebrow: "Bethesda / Obsidian",
    subtitle: "Mojave, DLC et quatre voies de fin sous controle.",
    count: "75 succes",
    file: "fallout-new-vegas.txt",
    accent: "coral",
    tag: "Guide marathon",
    description:
      "Quetes, compagnons, factions, casinos, Caravan, Hardcore, DLC et defis d'armes.",
    highlight:
      "A surveiller : la sauvegarde de carrefour des factions et le mode Hardcore.",
    meta: ["75/75 Steam", "4 DLC", "Sans spoiler"],
  },
  {
    id: "forspoken",
    steamAppId: 1680880,
    title: "Forspoken",
    eyebrow: "Square Enix",
    subtitle: "Campagne, sorts et Athia au complet sans spoiler.",
    count: "53 succes",
    file: "forspoken.txt",
    accent: "blue",
    tag: "Nettoyage post-jeu",
    description:
      "Detours, monuments, fontaines, labyrinthes, familiers, archives et equipements.",
    highlight:
      "A surveiller : revenir dans les regions apres chaque nouveau pouvoir.",
    meta: ["53/53 Steam", "4 ecoles", "Sans spoiler"],
  },
  {
    id: "the-witcher-2-assassins-of-kings",
    steamAppId: 20920,
    title: "The Witcher 2",
    eyebrow: "CD PROJEKT RED",
    subtitle: "Les deux voies et Insane sans perdre les missables.",
    count: "52 succes",
    file: "the-witcher-2-assassins-of-kings.txt",
    accent: "coral",
    tag: "Deux parcours",
    description:
      "Roche, Iorveth, quetes, trolls, nids, Arena, poker, alchimie et difficulte Insane.",
    highlight:
      "A surveiller : la sauvegarde avant la branche du chapitre 2 et les quetes de chapitre.",
    meta: ["52/52 Steam", "2 voies", "Sans spoiler"],
  },
  {
    id: "resident-evil-hd-remaster",
    steamAppId: 304240,
    title: "Resident Evil",
    eyebrow: "CAPCOM",
    subtitle: "Jill, Chris et les modes bonus dans le bon ordre.",
    count: "44 succes",
    file: "resident-evil-hd-remaster.txt",
    accent: "coral",
    tag: "Multiple runs",
    description:
      "Fouilles, armes, fichiers, fins, Real Survival, Invisible Enemy et One Dangerous Zombie.",
    highlight:
      "A surveiller : les choix de sauvetage et la collecte avant de bruler une salle.",
    meta: ["44/44 Steam", "Jill + Chris", "Sans spoiler"],
  },
  {
    id: "resident-evil-2",
    steamAppId: 883710,
    title: "Resident Evil 2",
    eyebrow: "CAPCOM",
    subtitle: "Les quatre scenarios et les records sans spoiler.",
    count: "44 succes",
    file: "resident-evil-2-remake.txt",
    accent: "blue",
    tag: "Scenarios A/B",
    description:
      "Leon, Claire, Mr. Raccoon, fichiers, Hardcore, S+, 4th Survivor et Tofu.",
    highlight:
      "A surveiller : les fichiers propres aux scenarios et les rubans de la run S+.",
    meta: ["44/44 Steam", "15 Mr. Raccoon", "Sans spoiler"],
  },
  {
    id: "resident-evil-3",
    steamAppId: 952060,
    title: "Resident Evil 3",
    eyebrow: "CAPCOM",
    subtitle: "Campagne, 20 Charlie Dolls et Inferno.",
    count: "32 succes",
    file: "resident-evil-3-remake.txt",
    accent: "coral",
    tag: "Records et difficulte",
    description:
      "Fichiers, armes, fabrications, esquives, boutique, rangs et quatre niveaux de defi.",
    highlight:
      "A surveiller : les Charlie Dolls et les sauvegardes avant les sequences de fuite.",
    meta: ["32/32 Steam", "20 Charlie Dolls", "Sans spoiler"],
  },
  {
    id: "resident-evil-4",
    steamAppId: 2050650,
    title: "Resident Evil 4",
    eyebrow: "CAPCOM",
    subtitle: "16 chapitres, requetes et S+ sans spoiler.",
    count: "46 succes",
    file: "resident-evil-4-remake.txt",
    accent: "gold",
    tag: "Guide marathon",
    description:
      "Castellans, tresors, stands de tir, armes, Professional, restrictions et records.",
    highlight:
      "A surveiller : les requetes du marchand, les 16 Castellans et les runs S+.",
    meta: ["46/46 Steam", "16 chapitres", "Sans spoiler"],
  },
  {
    id: "resident-evil-7",
    steamAppId: 418370,
    title: "Resident Evil 7 biohazard",
    eyebrow: "CAPCOM",
    subtitle: "Campagne, DLC et modes difficiles sans spoiler.",
    count: "58 succes",
    file: "resident-evil-7-biohazard.txt",
    accent: "coral",
    tag: "Guide DLC",
    description:
      "Fichiers, Mr. Everywhere, Madhouse, Not a Hero, End of Zoe, Banned Footage et modes score.",
    highlight:
      "A surveiller : les pieces selon la difficulte et les runs 4 h/sans soin/sans coffre.",
    meta: ["58/58 Steam", "DLC inclus", "Sans spoiler"],
  },
  {
    id: "resident-evil-village",
    steamAppId: 1196590,
    title: "Resident Evil Village",
    eyebrow: "CAPCOM",
    subtitle: "Village, Mercenaries et Winters' Expansion.",
    count: "56 succes",
    file: "resident-evil-village.txt",
    accent: "gold",
    tag: "Guide DLC",
    description:
      "Chevres, fenetres, toilettes, tresors, recettes, Village of Shadows et Shadows of Rose.",
    highlight:
      "A surveiller : les 20 Chevres, les records Mercenaries et les six succes DLC.",
    meta: ["56/56 Steam", "20 Chevres", "DLC inclus"],
  },
  {
    id: "batman-arkham-asylum",
    steamAppId: 35140,
    title: "Batman: Arkham Asylum",
    eyebrow: "Rocksteady",
    subtitle: "Campagne, Riddler et cartes de defi GOTY.",
    count: "47 succes",
    file: "batman-arkham-asylum.txt",
    accent: "blue",
    tag: "Collectibles et defis",
    description:
      "Gadgets, trophees, enigmes, combats, Predator, Freeflow et 100 % de l'ile.",
    highlight:
      "A surveiller : les 24 medailles de chaque famille et les retours apres chaque gadget.",
    meta: ["47/47 Steam", "24 + 24 medailles", "Sans spoiler"],
  },
  {
    id: "beyond-two-souls",
    steamAppId: 960990,
    title: "Beyond: Two Souls",
    eyebrow: "Quantic Dream",
    subtitle: "Deux parcours, bonus et fins sans spoiler.",
    count: "45 succes",
    file: "beyond-two-souls.txt",
    accent: "coral",
    tag: "Deux parcours",
    description:
      "Bonus, choix, fins, furtivite, combat, possession et mode Duo.",
    highlight:
      "A surveiller : la liste des bonus par chapitre et la reprise avant chaque choix.",
    meta: ["45/45 Steam", "Solo + Duo", "Sans spoiler"],
  },
  {
    id: "detroit-become-human",
    steamAppId: 1222140,
    title: "Detroit: Become Human",
    eyebrow: "Quantic Dream",
    subtitle: "Flowchart, magazines et branches sous controle.",
    count: "48 succes",
    file: "detroit-become-human.txt",
    accent: "gold",
    tag: "Flowchart 100 %",
    description:
      "Parcours protege, reprises de chapitre, relations, magazines et fins.",
    highlight:
      "A surveiller : jouer chaque reprise jusqu'a la fin du chapitre pour enregistrer la Flowchart.",
    meta: ["48/48 Steam", "Flowchart", "Sans spoiler"],
  },
  {
    id: "dishonored",
    steamAppId: 205100,
    title: "Dishonored",
    eyebrow: "Arkane Studios",
    subtitle: "Ghost, chaos, DLC et City Trials dans le bon ordre.",
    count: "80 succes",
    file: "dishonored.txt",
    accent: "coral",
    tag: "Deux parcours",
    description:
      "Clean Hands, Ghost, pouvoirs, runes, bone charms, DLC narratifs et defis.",
    highlight:
      "A surveiller : ne pas melanger la sauvegarde Low Chaos avec la run High Chaos.",
    meta: ["80/80 Steam", "2 DLC", "Sans spoiler"],
  },
  {
    id: "tomb-raider-2013",
    steamAppId: 203160,
    title: "Tomb Raider (2013)",
    eyebrow: "Crystal Dynamics",
    subtitle: "Campagne, collecte et multijoueur dans le bon ordre.",
    count: "50 succes",
    file: "tomb-raider-2013.txt",
    accent: "coral",
    tag: "Solo + online",
    description:
      "Zones, tombeaux, defis, armes, competences et les 20 succes multijoueur.",
    highlight:
      "A surveiller : les actions de dynamite, tyrolienne et les matchs classes.",
    meta: ["50/50 Steam", "20 online", "Sans spoiler"],
  },
  {
    id: "rise-of-the-tomb-raider",
    steamAppId: 391220,
    title: "Rise of the Tomb Raider",
    eyebrow: "Crystal Dynamics",
    subtitle: "Campagne, DLC, score et Endurance en cooperation.",
    count: "143 succes",
    file: "rise-of-the-tomb-raider.txt",
    accent: "blue",
    tag: "Guide XXL",
    description:
      "Hubs, tombeaux, Baba Yaga, Blood Ties, cartes, Endurance et 19 objectifs coop.",
    highlight:
      "A surveiller : les scores, Extreme Survivor et l'Endurance coop.",
    meta: ["143/143 Steam", "19 coop", "DLC inclus"],
  },
  {
    id: "shadow-of-the-tomb-raider",
    steamAppId: 750920,
    title: "Shadow of the Tomb Raider",
    eyebrow: "Definitive Edition",
    subtitle: "100 % des zones, difficultes et sept tombeaux DLC.",
    count: "99 succes",
    file: "shadow-of-the-tomb-raider.txt",
    accent: "gold",
    tag: "DLC et difficulte",
    description:
      "Missions, collections, actions rares, New Game+ et Deadly Obsession.",
    highlight:
      "A surveiller : les actions ennemies avant la fin et les quatre difficultes.",
    meta: ["99/99 Steam", "7 tombeaux DLC", "Sans spoiler"],
  },
  {
    id: "hogwarts-legacy",
    steamAppId: 990080,
    title: "Hogwarts Legacy",
    eyebrow: "Avalanche Software",
    subtitle: "Collections, missions et quatre maisons sans spoiler.",
    count: "45 succes",
    file: "hogwarts-legacy.txt",
    accent: "blue",
    tag: "Route 100 %",
    description:
      "Sorts, talents, Merlin, Demiguise, collections, elevage et mini-routes de maisons.",
    highlight:
      "A surveiller : les quatre succes de maison jusqu'a Jackdaw's Rest.",
    meta: ["45/45 Steam", "4 maisons", "Sans spoiler"],
  },
  {
    id: "marvels-guardians-of-the-galaxy",
    steamAppId: 1088850,
    title: "Marvel's Guardians of the Galaxy",
    eyebrow: "Eidos-Montreal",
    subtitle: "16 chapitres, collectibles et capacites en continu.",
    count: "59 succes",
    file: "marvels-guardians-of-the-galaxy.txt",
    accent: "coral",
    tag: "Collectibles et combat",
    description:
      "Tenues, objets de Gardiens, archives, compendium, capacites et actions de combat.",
    highlight:
      "A surveiller : la sauvegarde continue, les objets de chapitre et l'amende du chapitre 6.",
    meta: ["59/59 Steam", "Hors ligne", "Sans spoiler"],
  },
  {
    id: "assassins-creed-origins",
    steamAppId: 582160,
    title: "Assassin's Creed Origins",
    eyebrow: "Ubisoft Montreal",
    subtitle: "Egypte, lieux, arena et deux DLC dans l'ordre.",
    count: "67 succes",
    file: "assassins-creed-origins.txt",
    accent: "gold",
    tag: "Guide DLC",
    description:
      "Carte, papyrus, cercles, arena, hippodrome, Phylakes et compteurs speciaux.",
    highlight:
      "A surveiller : les 100 trinkets, Overdesign et les fenetres de DLC.",
    meta: ["67/67 Steam", "2 DLC", "Sans spoiler"],
  },
  {
    id: "assassins-creed-odyssey",
    steamAppId: 812140,
    title: "Assassin's Creed Odyssey",
    eyebrow: "Ubisoft Quebec",
    subtitle: "Grece, culte, navire et DLC en parcours complet.",
    count: "93 succes",
    file: "assassins-creed-odyssey.txt",
    accent: "blue",
    tag: "Guide XXL",
    description:
      "Regions, choix, mercenaires, Adrestia, Lost Tales et deux arcs DLC.",
    highlight:
      "A surveiller : les choix de relation, les sous-regions et les trois episodes.",
    meta: ["93/93 Steam", "DLC inclus", "Sans spoiler"],
  },
  {
    id: "assassins-creed-valhalla",
    steamAppId: 2208920,
    title: "Assassin's Creed Valhalla",
    eyebrow: "Ubisoft Montreal",
    subtitle: "Angleterre, colonie et tous les modes DLC.",
    count: "92 succes",
    file: "assassins-creed-valhalla.txt",
    accent: "coral",
    tag: "Guide marathon",
    description:
      "Territoires, Ordre, raids, Orlog, peche, Mastery, Irlande, Francia et Ragnarok.",
    highlight:
      "A surveiller : les actions speciales, les modes et les cartes DLC.",
    meta: ["92/92 Steam", "DLC + modes", "Sans spoiler"],
  },
  {
    id: "half-life",
    steamAppId: 70,
    title: "Half-Life",
    eyebrow: "Valve",
    subtitle: "Campagne originale, chapitres et caches dans l'ordre.",
    count: "0 succes Steam",
    file: "half-life.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Parcours solo complet et transparent pour l'edition Steam sans succes.",
    highlight:
      "A savoir : 0 succes Steam sur l'AppID visible, donc aucune promesse artificielle de 100 %.",
    meta: ["0 succes Steam", "Solo", "Sans spoiler"],
  },
  {
    id: "half-life-2",
    steamAppId: 220,
    title: "Half-Life 2",
    eyebrow: "Valve",
    subtitle: "Jeu de base, Episodes One et Two, caches et actions uniques.",
    count: "69 succes",
    file: "half-life-2.txt",
    accent: "blue",
    tag: "Campagne + episodes",
    description:
      "Caches Lambda, citoyens, vehicules, gnome, defenses et runs dediees.",
    highlight:
      "A surveiller : Ravenholm, citoyens, caches radar, gnome et succes sans combat.",
    meta: ["69/69 Steam", "Episodes inclus", "Sans spoiler"],
  },
  {
    id: "half-life-alyx",
    steamAppId: 546560,
    title: "Half-Life: Alyx",
    eyebrow: "Valve VR",
    subtitle: "Campagne VR, armes, fouille et objets interactifs.",
    count: "42 succes",
    file: "half-life-alyx.txt",
    accent: "coral",
    tag: "Guide VR",
    description:
      "Route sans spoiler pour les 42 succes, le gnome, les bouteilles et les armes.",
    highlight:
      "A surveiller : gnome, resines, bouteilles, geiger et sauvegardes d'interaction.",
    meta: ["42/42 Steam", "VR solo", "Sans spoiler"],
  },
  {
    id: "portal",
    steamAppId: 400,
    title: "Portal",
    eyebrow: "Valve",
    subtitle: "Campagne, salles avancees, defis et radios.",
    count: "15 succes",
    file: "portal.txt",
    accent: "blue",
    tag: "Puzzle 100 %",
    description:
      "Ordre des chambres, six cartes avancees et trois niveaux de medailles.",
    highlight:
      "A surveiller : radios, cameras, salles avancees et medailles des defis.",
    meta: ["15/15 Steam", "Hors ligne", "Sans spoiler"],
  },
  {
    id: "limbo",
    steamAppId: 48000,
    title: "LIMBO",
    eyebrow: "Playdead",
    subtitle: "Oeufs caches, DING! et run sans mort dans l'ordre.",
    count: "13 succes",
    file: "limbo.txt",
    accent: "blue",
    tag: "Guide sans spoiler",
    description:
      "Route des 13 oeufs, detours de puzzles et run No Point in Dying separee.",
    highlight:
      "A surveiller : les oeufs doivent etre valides avant DING!, puis la run sans mort se fait seule.",
    meta: ["13/13 Steam", "Hors ligne", "Sans spoiler"],
  },
  {
    id: "metro-2033",
    steamAppId: 43110,
    title: "Metro 2033",
    eyebrow: "4A Games",
    subtitle: "Stations, caches, armes et deux routes Ranger.",
    count: "48 succes",
    file: "metro-2033.txt",
    accent: "coral",
    tag: "FPS chronologique",
    description:
      "Guide de l'edition originale avec moral points, cartouches dorees, Frontline et Ranger.",
    highlight:
      "A surveiller : les quatre stations de cartouches et les choix de Frontline avant la sortie.",
    meta: ["48/48 Steam", "Edition originale", "Sans spoiler"],
  },
  {
    id: "fear-2-project-origin",
    steamAppId: 16450,
    title: "F.E.A.R. 2: Project Origin",
    eyebrow: "Monolith",
    subtitle: "Campagne, Intel et Reflex Injectors sans faux succes.",
    count: "0 succes Steam",
    file: "fear-2-project-origin.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route des 14 missions, 76 Intel et 13 Reflex Injectors pour l'edition Steam visible.",
    highlight:
      "A surveiller : guide transparent classe special, car cette edition n'expose pas de succes Steam.",
    meta: ["0/0 Steam", "76 Intel", "Sans spoiler"],
  },
  {
    id: "call-of-juarez-gunslinger",
    steamAppId: 204450,
    title: "Call of Juarez: Gunslinger",
    eyebrow: "Techland",
    subtitle: "Story, Nuggets, difficulte, Arcade et Duels.",
    count: "26 succes",
    file: "call-of-juarez-gunslinger.txt",
    accent: "coral",
    tag: "Campagne + arcade",
    description:
      "Route des 14 missions, 54 Nuggets et nettoyage des competences et modes annexes.",
    highlight:
      "A surveiller : les Nuggets par mission et les objectifs Arcade/True West apres la campagne.",
    meta: ["26/26 Steam", "54 Nuggets", "Sans spoiler"],
  },
  {
    id: "call-of-juarez-bound-in-blood",
    steamAppId: 21980,
    title: "Call of Juarez: Bound in Blood",
    eyebrow: "Techland",
    subtitle: "Campagne, secrets et difficultes sans faux succes.",
    count: "0 succes Steam",
    file: "call-of-juarez-bound-in-blood.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route des 15 chapitres, 89 secrets et des deux personnages jouables.",
    highlight:
      "A surveiller : guide special transparent, car l'edition Steam visible n'expose pas de succes.",
    meta: ["0/0 Steam", "89 secrets", "Sans spoiler"],
  },
  {
    id: "call-of-juarez",
    steamAppId: 3020,
    title: "Call of Juarez",
    eyebrow: "Techland",
    subtitle: "Prologue, episodes, secrets et difficultes dans l'ordre.",
    count: "0 succes Steam",
    file: "call-of-juarez.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route du prologue, des 15 episodes, des 40 secrets et des missions bonus.",
    highlight:
      "A surveiller : guide special transparent, sans inventer un compteur de succes Steam absent.",
    meta: ["0/0 Steam", "40 secrets", "Sans spoiler"],
  },
  {
    id: "fear-3",
    steamAppId: 21100,
    title: "F.E.A.R. 3",
    eyebrow: "Day 1 Studios",
    subtitle: "Intervalles, Alma Dolls, scores, INSANE et coop.",
    count: "50 succes",
    file: "fear-3.txt",
    accent: "coral",
    tag: "Campagne + coop",
    description:
      "Route des 8 intervalles, dolls aleatoires, defis de score et modes Contractions/Soul King.",
    highlight:
      "A surveiller : une doll par intervalle, les scores et les succes en ligne sont separes.",
    meta: ["50/50 Steam", "8 Alma Dolls", "Sans spoiler"],
  },
  {
    id: "rage",
    steamAppId: 9200,
    title: "RAGE",
    eyebrow: "id Software",
    subtitle: "Campagne, cartes, schematics, courses et The Scorchers.",
    count: "60 succes",
    file: "rage.txt",
    accent: "gold",
    tag: "Guide XXL",
    description:
      "54 cartes, 19 schematics, 18 sauts, mini-jeux, point de non-retour et DLC.",
    highlight:
      "A surveiller : The Well et Authority Prison, puis 100 % avant Assault on Authority Bridge.",
    meta: ["60/60 Steam", "DLC inclus", "Sans spoiler"],
  },
  {
    id: "aliens-vs-predator",
    steamAppId: 10680,
    title: "Aliens vs. Predator",
    eyebrow: "Rebellion",
    subtitle: "Trois campagnes, trois collectibles et Nightmare.",
    count: "50 succes",
    file: "aliens-vs-predator.txt",
    accent: "blue",
    tag: "Trois campagnes",
    description:
      "Marine, Alien et Predator avec 67 diaries, 50 Royal Jelly et 45 Trophy Belts.",
    highlight:
      "A surveiller : les dix succes ranked sont un gate multijoueur et ne sont pas masques.",
    meta: ["50/50 Steam", "45 belts", "Sans spoiler"],
  },
  {
    id: "dying-light",
    steamAppId: 239140,
    title: "Dying Light",
    eyebrow: "Techland",
    subtitle: "Harran, The Following, Bozak, Parkour Fever et Hellraid.",
    count: "78 succes",
    file: "dying-light.txt",
    accent: "coral",
    tag: "Campagne + DLC",
    description:
      "Quetes, zones sures, 67 textes, quarantaine, buggy, coop et extensions.",
    highlight:
      "A surveiller : les textes apres l'histoire, les zones de quarantaine et les succes coop.",
    meta: ["78/78 Steam", "DLC inclus", "Sans spoiler"],
  },
  {
    id: "dark-sector",
    steamAppId: 29900,
    title: "Dark Sector",
    eyebrow: "Digital Extremes",
    subtitle: "Campagne en 10 chapitres et 37 weapon upgrades.",
    count: "0 succes Steam",
    file: "dark-sector.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route de campagne, Black Markets, rubles et 37 upgrades dans une seule sauvegarde.",
    highlight:
      "A surveiller : les upgrades 11, 16 et 20 sont a prendre avant la transition de zone.",
    meta: ["0/0 Steam", "37 upgrades", "Sans spoiler"],
  },
  {
    id: "mirrors-edge",
    steamAppId: 17410,
    title: "Mirror's Edge",
    eyebrow: "DICE",
    subtitle: "Prologue, neuf chapitres, Runner Bags et Time Trials.",
    count: "0 succes Steam",
    file: "mirrors-edge.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route du mode Story, 30 Runner Bags, checkpoints et DLC Pure Time Trials.",
    highlight:
      "A surveiller : trois sacs par niveau ; les Time Trials et le DLC restent separes.",
    meta: ["0/0 Steam", "30 Runner Bags", "Sans spoiler"],
  },
  {
    id: "bioshock",
    steamAppId: 7670,
    title: "BioShock",
    eyebrow: "2K Boston",
    subtitle: "Rapture, 122 Audio Diaries et 12 Power to the People.",
    count: "0 succes Steam",
    file: "bioshock.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route originale de Rapture, missables, recherches, plasmids et tonics.",
    highlight:
      "A surveiller : 5 diaries definitivement missables dans Welcome to Rapture et Central Control.",
    meta: ["0/0 Steam", "122 diaries", "Sans spoiler"],
  },
  {
    id: "strife",
    steamAppId: 317040,
    title: "Strife: Veteran Edition",
    eyebrow: "Night Dive Studios",
    subtitle: "Missions, secrets, trois conclusions, Bloodbath et multi.",
    count: "20 succes",
    file: "strife.txt",
    accent: "gold",
    tag: "Campagne + online",
    description:
      "Route 100 % Steam, 16 secrets, trois talismans et branches de fin.",
    highlight:
      "A surveiller : preserve une sauvegarde avant la branche finale et le mode Capture the Chalice.",
    meta: ["20/20 Steam", "3 fins", "Sans spoiler"],
  },
  {
    id: "bioshock-2",
    steamAppId: 8850,
    title: "BioShock 2",
    eyebrow: "2K Marin",
    subtitle: "Campagne, Protector Trials, Minerva's Den et multi.",
    count: "68 succes",
    file: "bioshock-2.txt",
    accent: "coral",
    tag: "Guide XXL",
    description:
      "Route solo, recherches, Little Sisters, DLC, trials et succes multijoueur.",
    highlight:
      "A surveiller : la run sans Vita-Chambers, les 10 Vacuum Bots et le gate online.",
    meta: ["68/68 Steam", "DLC inclus", "Online separe"],
  },
  {
    id: "tomb-raider-i-1996",
    steamAppId: 224960,
    title: "Tomb Raider I (1996)",
    eyebrow: "Core Design",
    subtitle: "15 niveaux, 45 secrets et Unfinished Business separe.",
    count: "0 succes Steam",
    file: "tomb-raider-i-1996.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route de la campagne originale, secrets par niveau et extension separee.",
    highlight:
      "A surveiller : 45/45 secrets, statistiques de fin de niveau et dernier secret de Great Pyramid.",
    meta: ["0/0 Steam", "45 secrets", "Sans spoiler"],
  },
  {
    id: "tomb-raider-ii-1997",
    steamAppId: 225300,
    title: "Tomb Raider II (1997)",
    eyebrow: "Core Design",
    subtitle: "18 niveaux, 48 dragons et Golden Mask optionnel.",
    count: "0 succes Steam",
    file: "tomb-raider-ii-1997.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route campagne, dragons secrets, demolitions, vehicules et extension Gold.",
    highlight:
      "A surveiller : dragon de Bartoli's Hideout avant demolition et 48/48 au total.",
    meta: ["0/0 Steam", "48 dragons", "Sans spoiler"],
  },
  {
    id: "tomb-raider-iii-1998",
    steamAppId: 225320,
    title: "Tomb Raider III (1998)",
    eyebrow: "Core Design",
    subtitle: "19 niveaux, 59 secrets et All Hallows.",
    count: "0 succes Steam",
    file: "tomb-raider-iii-1998.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route fixe des cinq regions, branches de collecte et bonus All Hallows.",
    highlight:
      "A surveiller : Coastal Village, Lud's Gate et le seuil 59/59 pour All Hallows.",
    meta: ["0/0 Steam", "59 secrets", "Sans spoiler"],
  },
  {
    id: "blood-omen-2",
    steamAppId: 242960,
    title: "Blood Omen 2: Legacy of Kain",
    eyebrow: "Crystal Dynamics",
    subtitle: "11 chapitres, Dark Gifts et coffers.",
    count: "0 succes Steam",
    file: "blood-omen-2.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route solo, coffers de lore, Weapon Power Chests et portes de glyphes.",
    highlight:
      "A surveiller : les Weapon Power Chests renforcent l'arme temporairement.",
    meta: ["0/0 Steam", "11 chapitres", "Sans spoiler"],
  },
  {
    id: "legend-of-mysteria",
    steamAppId: 407230,
    title: "Legend of Mysteria RPG",
    eyebrow: "Labyrinthine",
    subtitle: "Enquete, disguises, enigmes et 6 succes.",
    count: "6 succes",
    file: "legend-of-mysteria.txt",
    accent: "coral",
    tag: "Guide enigmes",
    description:
      "Route complete du JRPG, preuves, vetements, objets de quete et fin correcte.",
    highlight:
      "A surveiller : le Tomb of Elements, les deux Carnival Potions et le dossier final.",
    meta: ["6/6 Steam", "Solo", "Sans spoiler"],
  },
  {
    id: "the-last-remnant",
    steamAppId: 23310,
    title: "The Last Remnant",
    eyebrow: "Square Enix",
    subtitle: "Campagne, 68 quetes et Ancient Ruins.",
    count: "0 succes Steam",
    file: "the-last-remnant.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route chronologique PC, quetes missables, leaders uniques et True Conqueror.",
    highlight:
      "A surveiller : le nettoyage avant Nest of Eagles, Duke of Ghor et The Fallen.",
    meta: ["0/0 Steam", "68 quetes", "Sans spoiler"],
  },
  {
    id: "legendary",
    steamAppId: 16730,
    title: "Legendary",
    eyebrow: "Spark Unlimited",
    subtitle: "6 arcs, PDA et campagne solo.",
    count: "0 succes Steam",
    file: "legendary.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route de campagne, armes, objectifs, messages et pickups PDA sans spoiler.",
    highlight:
      "A surveiller : les pickups locaux avant chaque changement d'arc.",
    meta: ["0/0 Steam", "6 arcs", "Sans spoiler"],
  },
  {
    id: "penumbra-overture",
    steamAppId: 22180,
    title: "Penumbra: Overture",
    eyebrow: "Frictional Games",
    subtitle: "Mine, enigmes physiques et 4 chapitres.",
    count: "0 succes Steam",
    file: "penumbra-overture.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route de la mine, objets de puzzle, artefacts et notes sans spoiler.",
    highlight:
      "A surveiller : sauvegardes sur artefacts, briquet, gaz et fuse avant les zones fermees.",
    meta: ["0/0 Steam", "4 chapitres", "Sans spoiler"],
  },
  {
    id: "penumbra-black-plague",
    steamAppId: 22120,
    title: "Penumbra: Black Plague",
    eyebrow: "Frictional Games",
    subtitle: "Shelter, recherches et 10 artefacts.",
    count: "0 succes Steam",
    file: "penumbra-black-plague.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route du Shelter, stealth, cartes, notes et collectibles sans spoiler.",
    highlight:
      "A surveiller : 10/10 artefacts, cartes d'acces et documents avant les changements de secteur.",
    meta: ["0/0 Steam", "10 artefacts", "Sans spoiler"],
  },
  {
    id: "penumbra-requiem",
    steamAppId: 22140,
    title: "Penumbra: Requiem",
    eyebrow: "Frictional Games",
    subtitle: "9 niveaux de puzzles physiques.",
    count: "0 succes Steam",
    file: "penumbra-requiem.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Epilogue puzzle, cubes, pression, gravite et artefacts sans spoiler.",
    highlight:
      "A surveiller : les 9 niveaux et les artefacts avant chaque sortie.",
    meta: ["0/0 Steam", "9 niveaux", "Sans spoiler"],
  },
  {
    id: "doom-3-resurrection-of-evil",
    steamAppId: 9070,
    title: "DOOM 3: Resurrection of Evil",
    eyebrow: "id Software / Nerve Software",
    subtitle: "12 niveaux, PDAs et Artifact.",
    count: "0 succes Steam",
    file: "doom-3-resurrection-of-evil.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route de l'extension, PDAs, codes, armes et pouvoirs de l'Artifact sans spoiler.",
    highlight:
      "A surveiller : les PDAs, les powercells et les codes 769, 428 et 714.",
    meta: ["0/0 Steam", "12 niveaux", "Sans spoiler"],
  },
  {
    id: "painkiller-redemption",
    steamAppId: 65560,
    title: "Painkiller: Redemption",
    eyebrow: "Eggtooth Team",
    subtitle: "8 niveaux et Tarot Noir.",
    count: "0 succes Steam",
    file: "painkiller-redemption.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route des niveaux, secrets, objets sacres et six cartes du Tarot Noir.",
    highlight:
      "A surveiller : les conditions de cartes a la fin des six premiers niveaux.",
    meta: ["0/0 Steam", "8 niveaux", "Sans spoiler"],
  },
  {
    id: "legacy-of-kain-soul-reaver",
    steamAppId: 224920,
    title: "Legacy of Kain: Soul Reaver",
    eyebrow: "Crystal Dynamics",
    subtitle: "15 parties, 6 glyphes et 14 ameliorations.",
    count: "0 succes Steam",
    file: "legacy-of-kain-soul-reaver.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route de Raziel, glyphes, portails et ameliorations sans spoiler.",
    highlight:
      "A surveiller : les retours apres phase, escalade, Force et nage.",
    meta: ["0/0 Steam", "6 glyphes", "Sans spoiler"],
  },
  {
    id: "legacy-of-kain-soul-reaver-2",
    steamAppId: 224940,
    title: "Legacy of Kain: Soul Reaver 2",
    eyebrow: "Crystal Dynamics",
    subtitle: "20 sections et 4 forges de Reaver.",
    count: "0 succes Steam",
    file: "legacy-of-kain-soul-reaver-2.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route lineaire, forges, fonts et retours temporels sans spoiler.",
    highlight:
      "A surveiller : les Dark, Light, Air et Fire Forges.",
    meta: ["0/0 Steam", "20 sections", "Sans spoiler"],
  },
  {
    id: "legacy-of-kain-defiance",
    steamAppId: 224300,
    title: "Legacy of Kain: Defiance",
    eyebrow: "Crystal Dynamics",
    subtitle: "13 chapitres, Kain et Raziel.",
    count: "0 succes Steam",
    file: "legacy-of-kain-defiance.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route alternee Kain/Raziel, pouvoirs et enigmes sans spoiler.",
    highlight:
      "A surveiller : les recharges, les portes de Reaver et les bonus de hauteur.",
    meta: ["0/0 Steam", "13 chapitres", "Sans spoiler"],
  },
  {
    id: "fallout",
    steamAppId: 38400,
    title: "Fallout",
    eyebrow: "Black Isle Studios",
    subtitle: "15 etapes, puce d'eau et delai maitrise.",
    count: "0 succes Steam",
    file: "fallout.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route des villes, compagnons, Glow et zones finales sans spoiler.",
    highlight:
      "A surveiller : le delai de la puce d'eau et les sauvegardes de factions.",
    meta: ["0/0 Steam", "15 etapes", "Sans spoiler"],
  },
  {
    id: "fallout-2",
    steamAppId: 38410,
    title: "Fallout 2",
    eyebrow: "Black Isle Studios",
    subtitle: "20 etapes, GECK et branches de factions.",
    count: "0 succes Steam",
    file: "fallout-2.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route des villes, quetes, compagnons, tanker et Enclave sans spoiler.",
    highlight:
      "A surveiller : Ghost Farm, New Reno et les objets du tanker.",
    meta: ["0/0 Steam", "20 etapes", "Sans spoiler"],
  },
  {
    id: "fallout-tactics",
    steamAppId: 38420,
    title: "Fallout Tactics",
    eyebrow: "Micro Forté",
    subtitle: "21 missions et objectifs optionnels.",
    count: "0 succes Steam",
    file: "fallout-tactics.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route des bunkers, recrues, vehicules et objectifs sans spoiler.",
    highlight:
      "A surveiller : Peoria, Quincy, St. Louis et les extractions.",
    meta: ["0/0 Steam", "21 missions", "Sans spoiler"],
  },
  {
    id: "fable-the-lost-chapters",
    steamAppId: 204030,
    title: "Fable: The Lost Chapters",
    eyebrow: "Lionhead Studios",
    subtitle: "30 cles, 15 portes demon et l'extension complete.",
    count: "0 succes Steam",
    file: "fable-the-lost-chapters.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route d'Albion, objets, portes et The Lost Chapters sans spoiler.",
    highlight:
      "A surveiller : le maire, Necropolis et les coffres avant la porte finale.",
    meta: ["0/0 Steam", "30 cles", "Sans spoiler"],
  },
  {
    id: "fable-iii",
    steamAppId: 105400,
    title: "Fable III",
    eyebrow: "Lionhead Studios",
    subtitle: "50 gnomes, 50 cles et la royaute sous controle.",
    count: "0 succes Steam",
    file: "fable-iii.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route royale, quetes, collectables, biens et DLC sans spoiler.",
    highlight:
      "A surveiller : Aurora, la tresorerie et le compte a rebours royal.",
    meta: ["0/0 Steam", "50 gnomes", "Sans spoiler"],
  },
  {
    id: "the-witcher-enhanced-edition",
    steamAppId: 20900,
    title: "The Witcher: Enhanced Edition",
    eyebrow: "CD PROJEKT RED",
    subtitle: "5 chapitres, contrats et 2 modules officiels.",
    count: "0 succes Steam",
    file: "the-witcher-enhanced-edition.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Route des chapitres, quetes, contrats, alchimie et modules sans spoiler.",
    highlight:
      "A surveiller : les transitions de chapitre et les branches de faction.",
    meta: ["0/0 Steam", "5 chapitres", "Sans spoiler"],
  },
  {
    id: "assassins-creed",
    steamAppId: 15100,
    title: "Assassin's Creed",
    eyebrow: "Ubisoft Montreal",
    subtitle: "420 drapeaux, 60 Templiers et la campagne complete.",
    count: "0 succes Steam",
    file: "assassins-creed.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route Director's Cut, investigations, citoyens, points et nettoyage du Royaume.",
    highlight:
      "A surveiller : 420 drapeaux, 60 Templiers et les investigations de chaque quartier.",
    meta: ["0/0 Steam", "420 drapeaux", "Sans spoiler"],
  },
  {
    id: "assassins-creed-ii",
    steamAppId: 33230,
    title: "Assassin's Creed II",
    eyebrow: "Ubisoft Montreal",
    subtitle: "100 plumes, 20 glyphes et les sequences PC dans l'ordre.",
    count: "0 succes Steam",
    file: "assassins-creed-ii.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Route d'Ezio, villa, Codex, tombeaux, glyphes et contenus des sequences 12 et 13.",
    highlight:
      "A surveiller : les plumes sans carte, les six sceaux et le passage avant la sequence 14.",
    meta: ["0/0 Steam", "100 plumes", "Sans spoiler"],
  },
  {
    id: "assassins-creed-brotherhood",
    steamAppId: 48190,
    title: "Assassin's Creed Brotherhood",
    eyebrow: "Ubisoft Montreal",
    subtitle: "Rome, 101 drapeaux et synchronisation complete.",
    count: "0 succes Steam",
    file: "assassins-creed-brotherhood.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Tours, guildes, recrues, six repaires, machines de Leonardo et contenu solo PC.",
    highlight:
      "A surveiller : les 18 drapeaux des repaires, les defis de guilde et les contraintes DNA.",
    meta: ["0/0 Steam", "101 drapeaux", "Sans spoiler"],
  },
  {
    id: "assassins-creed-revelations",
    steamAppId: 201870,
    title: "Assassin's Creed Revelations",
    eyebrow: "Ubisoft Montreal",
    subtitle: "48 succes, fragments et Lost Archive dans le bon ordre.",
    count: "48 succes Steam",
    file: "assassins-creed-revelations.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Neuf sequences, Desmond, bombes, factions, 100 fragments et DLC a verifier.",
    highlight:
      "A surveiller : les 48 succes incluent Lost Archive ; verifie sa licence avant le 100 %.",
    meta: ["48/48 Steam", "100 fragments", "DLC a verifier"],
  },
  {
    id: "stalker-shadow-of-chernobyl",
    steamAppId: 4500,
    title: "S.T.A.L.K.E.R.: Shadow of Chernobyl",
    eyebrow: "GSC Game World",
    subtitle: "Zone, missions, artefacts et armes uniques dans l'ordre.",
    count: "0 succes Steam",
    file: "stalker-shadow-of-chernobyl.txt",
    accent: "coral",
    tag: "Guide special",
    description:
      "Campagne complete de l'edition originale, avec le parcours Enhanced en reference.",
    highlight:
      "A surveiller : AppID original a 0/0 succes ; la checklist utile porte sur la campagne et les objets.",
    meta: ["0/0 Steam", "Enhanced 44", "Sans spoiler"],
  },
  {
    id: "stalker-shadow-of-chornobyl-enhanced",
    steamAppId: 2427410,
    title: "S.T.A.L.K.E.R.: Shadow of Chornobyl - Enhanced Edition",
    eyebrow: "GSC Game World",
    subtitle: "44 succes Steam, missables et sauvegardes de bifurcation.",
    count: "44 succes Steam",
    file: "stalker-shadow-of-chornobyl-enhanced.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route complete, artefacts, armes uniques, compteurs, Arena et fins sans spoiler.",
    highlight:
      "A surveiller : Tolik, Kruglov, les artefacts de plage, le Brain Scorcher et le nettoyage avant le final.",
    meta: ["44/44 Steam", "Original inclus", "Sans spoiler"],
  },
  {
    id: "stalker-clear-sky",
    steamAppId: 20510,
    title: "S.T.A.L.K.E.R.: Clear Sky",
    eyebrow: "GSC Game World",
    subtitle: "Marais, factions, flash drives et campagne originale.",
    count: "0 succes Steam",
    file: "stalker-clear-sky.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Route complete de l'edition originale, objets uniques et branches de factions.",
    highlight:
      "A surveiller : AppID original a 0/0 succes ; conserve les memes sauvegardes de securite.",
    meta: ["0/0 Steam", "Enhanced 43", "Sans spoiler"],
  },
  {
    id: "stalker-clear-sky-enhanced",
    steamAppId: 2427420,
    title: "S.T.A.L.K.E.R.: Clear Sky - Enhanced Edition",
    eyebrow: "GSC Game World",
    subtitle: "43 succes Steam, factions et 18 flash drives dans l'ordre.",
    count: "43 succes Steam",
    file: "stalker-clear-sky-enhanced.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Marais, artefacts sensibles, armes uniques, factions, Limansk et difficulte.",
    highlight:
      "A surveiller : Stone Blood, Gun Baron, les flash drives et la sauvegarde avant le pont vers Limansk.",
    meta: ["43/43 Steam", "18 flash drives", "Sans spoiler"],
  },
  {
    id: "stalker-call-of-pripyat",
    steamAppId: 41700,
    title: "S.T.A.L.K.E.R.: Call of Pripyat",
    eyebrow: "GSC Game World",
    subtitle: "Zaton, Jupiter, Pripyat et les caches a armes.",
    count: "0 succes Steam",
    file: "stalker-call-of-pripyat.txt",
    accent: "gold",
    tag: "Guide special",
    description:
      "Campagne originale, outils, detecteurs, artefacts, factions et evacuation.",
    highlight:
      "A surveiller : AppID original a 0/0 succes ; suis les memes alertes de missables.",
    meta: ["0/0 Steam", "Enhanced 47", "Sans spoiler"],
  },
  {
    id: "stalker-call-of-pripyat-enhanced",
    steamAppId: 2427430,
    title: "S.T.A.L.K.E.R.: Call of Prypiat - Enhanced Edition",
    eyebrow: "GSC Game World",
    subtitle: "47 succes Steam, quetes, caches et deux conclusions.",
    count: "47 succes Steam",
    file: "stalker-call-of-pripyat-enhanced.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route complete, Flint, outils, detecteurs, factions, documents X-8 et evacuations.",
    highlight:
      "A surveiller : Pinocchio avant Courier of Justice, les caches de Zaton et la sauvegarde avant Kindergarten.",
    meta: ["47/47 Steam", "6 outils", "Sans spoiler"],
  },
  {
    id: "borderlands-2",
    steamAppId: 49520,
    title: "Borderlands 2",
    eyebrow: "Gearbox Software",
    subtitle: "Pandore, campagne, defis et cinq DLC dans l'ordre.",
    count: "75 succes Steam",
    file: "borderlands-2.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route complete, missions secondaires, lieux, classes, raids et cinq DLC sans spoiler.",
    highlight:
      "A surveiller : Did It All, les choix Tiny Tina et Commander Lilith, Haderax et les actions de classe.",
    meta: ["75/75 Steam", "5 DLC", "Coop a verifier"],
  },
  {
    id: "borderlands-goty",
    steamAppId: 8980,
    title: "Borderlands Game of the Year",
    eyebrow: "Gearbox Software",
    subtitle: "Pandora et les quatre extensions dans l'ordre.",
    count: "80 succes Steam",
    file: "borderlands-goty.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route de la campagne, missions, quatre DLC, arenas, collectibles et Crawmerax sans spoiler.",
    highlight:
      "A surveiller : les missions coop, les kits Claptrap, les grandes arenas et le niveau 61.",
    meta: ["80/80 Steam", "4 DLC", "Coop requis"],
  },
  {
    id: "borderlands-goty-enhanced",
    steamAppId: 729040,
    title: "Borderlands Game of the Year Enhanced",
    eyebrow: "Gearbox Software",
    subtitle: "Pandora Enhanced, quatre DLC et 80 succes dans l'ordre.",
    count: "80 succes Steam",
    file: "borderlands-goty-enhanced.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Fiche Enhanced autonome, route complete, collectibles, arenas et Crawmerax sans spoiler.",
    highlight:
      "A surveiller : AppID Enhanced distinct, les kits Claptrap, les missions coop et le niveau 61.",
    meta: ["80/80 Steam", "4 DLC", "Enhanced"],
  },
  {
    id: "borderlands-the-pre-sequel",
    steamAppId: 261640,
    title: "Borderlands: The Pre-Sequel",
    eyebrow: "2K Australia / Gearbox",
    subtitle: "Elpis, missions, Grinder et DLC dans l'ordre.",
    count: "63 succes Steam",
    file: "borderlands-the-pre-sequel.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route complete, missions secondaires, lieux, classes, coop et trois DLC sans spoiler.",
    highlight:
      "A surveiller : Who You Gonna Call?, Guardian Guardian, Wheely Fast et les missions de lancement.",
    meta: ["63/63 Steam", "3 DLC", "3 missables"],
  },
  {
    id: "star-wars-jedi-fallen-order",
    steamAppId: 1172380,
    title: "STAR WARS Jedi: Fallen Order",
    eyebrow: "Respawn Entertainment",
    subtitle: "Campagne, planètes, combats et collectibles dans l'ordre.",
    count: "39 succes Steam",
    file: "star-wars-jedi-fallen-order.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route complete, cartes BD-1, coffres, secrets, scans, graines, stims et combats sans spoiler.",
    highlight:
      "A surveiller : retours sur les planetes, cartes a 100 %, terrarium, donnees BD-1 et creatures legendaires.",
    meta: ["39/39 Steam", "Collectibles", "Sans spoiler"],
  },
  {
    id: "star-wars-knights-of-the-old-republic",
    steamAppId: 32370,
    title: "STAR WARS: Knights of the Old Republic",
    eyebrow: "BioWare / LucasArts",
    subtitle: "Campagne, mondes, compagnons et cartes stellaires dans l'ordre.",
    count: "0 succes Steam",
    file: "star-wars-knights-of-the-old-republic.txt",
    accent: "blue",
    tag: "Guide special",
    description:
      "Soluce complete transparente : l'AppID Steam n'expose pas de succes, mais tous les contenus sont suivis.",
    highlight:
      "A surveiller : sauvegardes de branche, quetes de compagnons, cartes stellaires, swoop et pazaak.",
    meta: ["0/0 Steam", "Solo", "Sans spoiler"],
  },
  {
    id: "star-wars-knights-of-the-old-republic-ii",
    steamAppId: 208580,
    title: "STAR WARS: Knights of the Old Republic II",
    eyebrow: "Obsidian Entertainment",
    subtitle: "57 succes, compagnons, mondes et branches dans l'ordre.",
    count: "57 succes Steam",
    file: "star-wars-knights-of-the-old-republic-ii.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route lumineuse et obscure, competences, compagnons, factions, pazaak et 57 succes sans spoiler.",
    highlight:
      "A surveiller : deux sauvegardes de branche, Khoonda, Onderon, compagnons et pouvoirs des deux orientations.",
    meta: ["57/57 Steam", "2 campagnes conseillees", "Branches"],
  },
  {
    id: "command-and-conquer-remastered-collection",
    steamAppId: 1213210,
    title: "Command & Conquer Remastered Collection",
    eyebrow: "Petroglyph / EA",
    subtitle: "Tiberian Dawn, Red Alert et bonus dans l'ordre.",
    count: "33 succes Steam",
    file: "command-and-conquer-remastered-collection.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route complete des campagnes, extensions, missions bonus, galeries, escarmouche et objectifs cumulatifs.",
    highlight:
      "A surveiller : les missions bonus, les objectifs de faction, les galeries et les objectifs multiplayer.",
    meta: ["33/33 Steam", "2 campagnes", "Multiplayer"],
  },
  {
    id: "doom-3-bfg-edition",
    steamAppId: 208200,
    title: "DOOM 3: BFG Edition",
    eyebrow: "id Software / Bethesda",
    subtitle: "DOOM 3, extensions et classiques dans l'ordre.",
    count: "65 succes Steam",
    file: "doom-3-bfg-edition.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route des trois campagnes, classiques, secrets, PDAs, casiers, difficultes et multiplayer.",
    highlight:
      "A surveiller : les six succes multiplayer, les secrets de niveau, les PDAs et les objets de campagne.",
    meta: ["65/65 Steam", "3 campagnes", "Multiplayer"],
  },
  {
    id: "duke-nukem-forever",
    steamAppId: 57900,
    title: "Duke Nukem Forever",
    eyebrow: "Gearbox Software / 2K",
    subtitle: "Campagne, collectibles et DLC dans l'ordre.",
    count: "62 succes Steam",
    file: "duke-nukem-forever.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route complete de la campagne, des compteurs, des mini-jeux, des collectibles et des 12 succes DLC.",
    highlight:
      "A surveiller : le pistolet dore, les recompenses Ego, les casques, les messages, les calendriers et les quatre difficultes.",
    meta: ["50/50 base", "12 DLC", "Solo"],
  },
  {
    id: "back-4-blood",
    steamAppId: 924970,
    title: "Back 4 Blood",
    eyebrow: "Turtle Rock Studios / Warner Bros.",
    subtitle: "Actes, DLC et modes coop dans l'ordre.",
    count: "93 succes Steam",
    file: "back-4-blood.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route complete des actes 1 a 6, secrets, difficultes, trois extensions et modes online.",
    highlight:
      "A surveiller : les runs Nightmare/No Hope, les secrets, Swarm, Trial of the Worm et la cooperation.",
    meta: ["93/93 Steam", "3 DLC", "Online"],
  },
  {
    id: "left-4-dead",
    steamAppId: 500,
    title: "Left 4 Dead",
    eyebrow: "Valve",
    subtitle: "Campagnes, Survival et Versus dans l'ordre.",
    count: "73 succes Steam",
    file: "left-4-dead.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route des campagnes, Crash Course, The Sacrifice, Expert, medailles et objectifs Infected.",
    highlight:
      "A surveiller : les runs sans degats, les quatre campagnes Expert et les objectifs Versus.",
    meta: ["73/73 Steam", "6 campagnes", "Online"],
  },
  {
    id: "left-4-dead-2",
    steamAppId: 550,
    title: "Left 4 Dead 2",
    eyebrow: "Valve",
    subtitle: "Campagnes, extensions et modes online dans l'ordre.",
    count: "101 succes Steam",
    file: "left-4-dead-2.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route des neuf campagnes, Expert Realism, Survival, Scavenge, Versus et evenements.",
    highlight:
      "A surveiller : Good Guy Nick, Ghost of Christmas Present, les medailles et The Last Stand.",
    meta: ["101/101 Steam", "9 campagnes", "Online"],
  },
  {
    id: "castle-crashers",
    steamAppId: 204360,
    title: "Castle Crashers",
    eyebrow: "The Behemoth",
    subtitle: "Campagne, Animal Orbs et coop dans l'ordre.",
    count: "12 succes Steam",
    file: "castle-crashers.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route de la campagne, des 28 Animal Orbs, des runs propres, du multijoueur et d'Arena.",
    highlight:
      "A surveiller : Conscientious Objector, Animal Handler, les quatre joueurs et les 40 victoires Arena.",
    meta: ["12/12 Steam", "28 Animal Orbs", "Coop / Arena"],
  },
  {
    id: "magicka",
    steamAppId: 42910,
    title: "Magicka",
    eyebrow: "Arrowhead Game Studios / Paradox Interactive",
    subtitle: "Campagne, DLC et evenements dans l'ordre.",
    count: "88 succes Steam",
    file: "magicka.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route Adventure, quetes, Magicks, secrets, Challenges, Versus et tous les DLC.",
    highlight:
      "A surveiller : le speedrun, les runs sans mort, la Cruise de sept jours et les evenements Steam.",
    meta: ["88/88 Steam", "DLC", "Coop / Versus"],
  },
  {
    id: "magicka-2",
    steamAppId: 238370,
    title: "Magicka 2",
    eyebrow: "Pieces Interactive / Paradox Interactive",
    subtitle: "Campagne, difficultes et Challenges dans l'ordre.",
    count: "47 succes Steam",
    file: "magicka-2.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route du Prologue, campagne, Veterans, Dark Altars, objectifs de decor et trois paliers de difficulte.",
    highlight:
      "A surveiller : les deux runs des Veterans, les torches, les Challenges et Bananas.",
    meta: ["47/47 Steam", "3 difficultes", "Coop"],
  },
  {
    id: "trine",
    steamAppId: 35700,
    title: "Trine Enchanted Edition",
    eyebrow: "Frozenbyte",
    subtitle: "Campagne, secrets et collecte dans l'ordre.",
    count: "33 succes Steam",
    file: "trine.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route des 15 niveaux, de l'Experience, des coffres secrets, des runs Hard et des objectifs de heros.",
    highlight:
      "A surveiller : Tower of Sarek sans mort, la collecte complete et le lancement de l'Enchanted Edition.",
    meta: ["33/33 Steam", "15 niveaux", "Solo / Coop"],
  },
  {
    id: "trine-2",
    steamAppId: 35720,
    title: "Trine 2: Complete Story",
    eyebrow: "Frozenbyte",
    subtitle: "Campagne, Goblin Menace et collectibles dans l'ordre.",
    count: "97 succes Steam",
    file: "trine-2.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route des 18 niveaux, Experience, coffres, objectifs physiques et runs Hard Hardcore.",
    highlight:
      "A surveiller : les deux collections, les trois heros en solo et les paliers Hardcore des deux campagnes.",
    meta: ["97/97 Steam", "18 niveaux", "Hardcore"],
  },
  {
    id: "we-were-here",
    steamAppId: 582500,
    title: "We Were Here",
    eyebrow: "Total Mayhem Games",
    subtitle: "Escape coop, deux roles et Perfect Play dans l'ordre.",
    count: "26 succes Steam",
    file: "we-were-here.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route des salles, rotation des roles, Perfect Play, run sans mort et conditions de fin.",
    highlight:
      "A surveiller : le micro, les huit Perfect Play, les deux roles et la run complete sans mort.",
    meta: ["26/26 Steam", "2 joueurs", "Micro / Online"],
  },
  {
    id: "lara-croft-temple-of-osiris",
    steamAppId: 289690,
    title: "Lara Croft and the Temple of Osiris",
    eyebrow: "Crystal Dynamics / Square Enix",
    subtitle: "Campagne, tombes et defis dans l'ordre.",
    count: "40 succes Steam",
    file: "lara-croft-temple-of-osiris.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route des tombes, defis de temps, cranes rouges, scores, canopic jars et cooperation.",
    highlight:
      "A surveiller : les familles de defis, les classements multijoueur et les quatre joueurs.",
    meta: ["40/40 Steam", "Challenge Tombs", "Coop 4 joueurs"],
  },
  {
    id: "overcooked-all-you-can-eat",
    steamAppId: 1243830,
    title: "Overcooked! All You Can Eat",
    eyebrow: "Team17 / Ghost Town Games",
    subtitle: "Deux campagnes, bonus et coop dans l'ordre.",
    count: "42 succes Steam",
    file: "overcooked-all-you-can-eat.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route des deux jeux, Ever Peckish Rises, Arcade, Versus et configurations de chefs.",
    highlight:
      "A surveiller : les quatre chefs, les cuisines Classic, les emotes et les chiens Kevin.",
    meta: ["42/42 Steam", "200+ niveaux", "Coop 4 joueurs"],
  },
  {
    id: "sniper-elite-nazi-zombie-army",
    steamAppId: 227100,
    title: "Sniper Elite: Nazi Zombie Army",
    eyebrow: "Rebellion",
    subtitle: "Campagne, collectibles et coop dans l'ordre.",
    count: "26 succes Steam",
    file: "sniper-elite-nazi-zombie-army.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route des cinq chapitres, bouteilles de sang, lingots d'or et objectifs a quatre.",
    highlight:
      "A surveiller : les explosions de masse, la campagne Elite a quatre et la possession de deux jeux Nazi Zombie Army.",
    meta: ["26/26 Steam", "5 chapitres", "Coop 4 joueurs"],
  },
  {
    id: "the-forest",
    steamAppId: 242760,
    title: "The Forest",
    eyebrow: "Endnight Games",
    subtitle: "Survie, caves et collection dans l'ordre.",
    count: "45 succes Steam",
    file: "the-forest.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route des caves, passagers, cassettes, pieces de robot, artisanat et defis de survie.",
    highlight:
      "A surveiller : Vegan, Pacifist, Bad father, les actions de fin et les objectifs cooperatifs.",
    meta: ["45/45 Steam", "Caves et collectibles", "Solo / Coop"],
  },
  {
    id: "sons-of-the-forest",
    steamAppId: 1326470,
    title: "Sons Of The Forest",
    eyebrow: "Endnight Games",
    subtitle: "Campagne, caves et collections dans l'ordre.",
    count: "32 succes Steam",
    file: "sons-of-the-forest.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route des outils, bunkers, armes, blueprints, notes, compagnons et deux branches de fin.",
    highlight:
      "A surveiller : les NPC amicaux, les 50 notes, les blueprints, les montres et les deux fins.",
    meta: ["32/32 Steam", "Collections", "Solo / Coop"],
  },
  {
    id: "green-hell",
    steamAppId: 815370,
    title: "Green Hell",
    eyebrow: "Creepy Jar",
    subtitle: "Story, survie et Spirits of Amazonia dans l'ordre.",
    count: "68 succes Steam",
    file: "green-hell.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route du tutoriel, Story, cartes, maladies, difficultes, villages et contenu Spirits of Amazonia.",
    highlight:
      "A surveiller : les deux fins, Green Hell, Vegan, Pacifist et les compteurs de tribus.",
    meta: ["68/68 Steam", "Story + DLC", "Sans spoiler"],
  },
  {
    id: "stronghold-hd",
    steamAppId: 40950,
    title: "Stronghold HD",
    eyebrow: "Firefly Studios",
    subtitle: "Campagnes, economie et sieges dans l'ordre.",
    count: "0 succes Steam",
    file: "stronghold-hd.txt",
    accent: "gold",
    tag: "Soluce speciale",
    description:
      "Route de la campagne, de l'economie, des sieges, du Free Build et de l'escarmouche.",
    highlight:
      "A surveiller : cet AppID n'expose pas de succes Steam ; la fiche reste une soluce de campagne transparente.",
    meta: ["0/0 Steam", "Campagne classique", "Solo / Multi"],
  },
  {
    id: "stronghold-3",
    steamAppId: 47400,
    title: "Stronghold 3 Gold",
    eyebrow: "Firefly Studios",
    subtitle: "Trois campagnes et sieges historiques dans l'ordre.",
    count: "0 succes Steam",
    file: "stronghold-3.txt",
    accent: "coral",
    tag: "Soluce speciale",
    description:
      "Route des campagnes economique, principale et Blackstaff, puis des sieges et du sandbox.",
    highlight:
      "A surveiller : cet AppID n'expose pas de succes Steam ; les DLC et modes sont separes de la campagne.",
    meta: ["0/0 Steam", "3 campagnes", "Sieges historiques"],
  },
  {
    id: "stronghold-crusader-2",
    steamAppId: 232890,
    title: "Stronghold Crusader 2",
    eyebrow: "Firefly Studios",
    subtitle: "Campagnes, trails et DLC dans l'ordre.",
    count: "81 succes Steam",
    file: "stronghold-crusader-2.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route des campagnes, trails, quatre DLC, farms, Workshop et parties multijoueur.",
    highlight:
      "A surveiller : les objectifs Hard, les contraintes de trails, les quatre DLC et les victoires reseau.",
    meta: ["81/81 Steam", "4 DLC", "Solo / Multi"],
  },
  {
    id: "stronghold-warlords",
    steamAppId: 907650,
    title: "Stronghold: Warlords",
    eyebrow: "Firefly Studios",
    subtitle: "Campagnes, warlords et trails dans l'ordre.",
    count: "102 succes Steam",
    file: "stronghold-warlords.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route des neuf campagnes, warlords, trails, DLC, farms et escarmouches techniques.",
    highlight:
      "A surveiller : les runs sans poulets, les campagnes Hard/Extreme et les parties personnalisees.",
    meta: ["102/102 Steam", "9 campagnes", "DLC et trails"],
  },
  {
    id: "dead-island",
    steamAppId: 91310,
    title: "Dead Island",
    eyebrow: "Techland",
    subtitle: "Campagne, cooperation et farms dans l'ordre.",
    count: "48 succes Steam",
    file: "dead-island.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route des quatre actes, collectibles, armes, combats, niveaux et cooperation.",
    highlight:
      "A surveiller : les partenaires cooperatifs, les quatre personnages, les 120 collectibles et les farms de combat.",
    meta: ["48/48 Steam", "4 actes", "Coop et collectibles"],
  },
  {
    id: "oddworld-abes-oddysee",
    steamAppId: 15700,
    title: "Oddworld: Abe's Oddysee",
    eyebrow: "Oddworld Inhabitants",
    subtitle: "Campagne, Mudokons et passages secrets dans l'ordre.",
    count: "0 succes Steam",
    file: "oddworld-abes-oddysee.txt",
    accent: "gold",
    tag: "Soluce speciale",
    description:
      "Route de campagne, sauvetage des Mudokons, chants, puits de voyage et zones secretes.",
    highlight:
      "A surveiller : cet AppID n'expose pas de succes Steam ; la fiche suit la completion de campagne sans faux 100 %.",
    meta: ["0/0 Steam", "Campagne", "Mudokons"],
  },
  {
    id: "oddworld-new-n-tasty",
    steamAppId: 314660,
    title: "Oddworld: New 'n' Tasty!",
    eyebrow: "Oddworld Inhabitants",
    subtitle: "Mudokons, runs de difficulte et objectifs caches dans l'ordre.",
    count: "35 succes Steam",
    file: "oddworld-new-n-tasty.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route des 35 succes, sauvetages, entrees secretes, combats et runs Easy, Normal et Hard.",
    highlight:
      "A surveiller : les sauvegardes de difficulte, le run sans detection, les 99 kills et le temps de 3 heures.",
    meta: ["35/35 Steam", "Mudokons", "Runs multiples"],
  },
  {
    id: "oddworld-soulstorm",
    steamAppId: 619390,
    title: "Oddworld: Soulstorm Enhanced Edition",
    eyebrow: "Oddworld Inhabitants",
    subtitle: "Quarma, Mudokons, recettes et badges dans l'ordre.",
    count: "32 succes Steam",
    file: "oddworld-soulstorm.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route des 32 succes, campagnes Quarma, crafting, recettes, badges et runs sans mort.",
    highlight:
      "A surveiller : les branches GOOD/BAD, les 1000 Mudokons, les badges platine et le run sans mort.",
    meta: ["32/32 Steam", "Quarma", "Badges et runs"],
  },
  {
    id: "grim-dawn",
    steamAppId: 219990,
    title: "Grim Dawn",
    eyebrow: "Crate Entertainment",
    subtitle: "Campagnes, extensions et endgame dans l'ordre.",
    count: "234 succes Steam",
    file: "grim-dawn.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route de Cairn, factions, shrines, difficultes, Hardcore, Crucible, Shattered Realm et Asterkarn.",
    highlight:
      "A surveiller : les factions contradictoires, Veteran sous niveau 11, Hardcore, Nemesis, Crucible et Ascendant.",
    meta: ["234/234 Steam", "3 extensions", "Hardcore / Endgame"],
  },
  {
    id: "the-witcher-3-wild-hunt",
    steamAppId: 292030,
    title: "The Witcher 3: Wild Hunt",
    eyebrow: "CD PROJEKT RED",
    subtitle: "Campagne, Gwent et extensions dans l'ordre.",
    count: "78 succes Steam",
    file: "the-witcher-3-wild-hunt.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route de la campagne, decisions, Gwent, contrats, equipements, Death March et deux extensions.",
    highlight:
      "A surveiller : les cartes de Gwent, les compagnons, les quetes de poings, les courses et les sauvegardes de decisions.",
    meta: ["78/78 Steam", "2 extensions", "Gwent / Death March"],
  },
  {
    id: "the-escapists-2",
    steamAppId: 641990,
    title: "The Escapists 2",
    eyebrow: "Team17",
    subtitle: "Prisons, escapes et defis dans l'ordre.",
    count: "58 succes Steam",
    file: "the-escapists-2.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route des prisons, escapes uniques, crafting, statistiques, quetes et objectifs multijoueur.",
    highlight:
      "A surveiller : les sept escapes classiques, les routes solo/multi, les quotas de metiers et le Versus en ligne.",
    meta: ["58/58 Steam", "Prisons", "Solo / Multi"],
  },
  {
    id: "sega-mega-drive-genesis-classics",
    steamAppId: 34270,
    title: "SEGA Mega Drive & Genesis Classics",
    eyebrow: "SEGA",
    subtitle: "Jeux classiques, objectifs et challenges dans l'ordre.",
    count: "25 succes Steam",
    file: "sega-mega-drive-genesis-classics.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route du hub, des jeux individuels, des scores, des vies, des challenges et du nettoyage final.",
    highlight:
      "A surveiller : les Chaos Emeralds, les vies, la magie, les runs sans continue et les challenges du hub.",
    meta: ["25/25 Steam", "25 classiques", "Challenges"],
  },
  {
    id: "age-of-empires-ii-2013",
    steamAppId: 221380,
    title: "Age of Empires II (2013)",
    eyebrow: "Skybox / Forgotten Empires",
    subtitle: "Campagnes, civilisations et farms dans l'ordre.",
    count: "294 succes Steam",
    file: "age-of-empires-ii-2013.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description:
      "Route des campagnes HD, scenarios, victoires de civilisations, parties online, cartes et farms.",
    highlight:
      "A surveiller : les paliers online, les civilisations, les MVP, les scenarios et les farms de batiments.",
    meta: ["294/294 Steam", "Campagnes HD", "Online / Escarmouche"],
  },
  {
    id: "company-of-heroes-2",
    steamAppId: 231430,
    title: "Company of Heroes 2",
    eyebrow: "Relic Entertainment",
    subtitle: "Campagne, Theater of War et online dans l'ordre.",
    count: "452 succes Steam",
    file: "company-of-heroes-2.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route de la campagne sovietique, Theater of War, escarmouches, automatch et farms d'unites.",
    highlight:
      "A surveiller : les difficultes, les scenarios, les parties online, les grades et les constructions en serie.",
    meta: ["452/452 Steam", "Theater of War", "Online / IA"],
  },
  {
    id: "company-of-heroes",
    steamAppId: 228200,
    title: "Company of Heroes",
    eyebrow: "Relic Entertainment",
    subtitle: "Campagnes et missions dans l'ordre.",
    count: "0 succes Steam",
    file: "company-of-heroes.txt",
    accent: "blue",
    tag: "Soluce speciale",
    description:
      "Route de la campagne de base et des contenus installes, avec objectifs secondaires et skirmish.",
    highlight:
      "A surveiller : cet AppID n'expose pas de succes Steam ; la completion est suivie par campagnes et missions.",
    meta: ["0/0 Steam", "Campagne", "Skirmish / Coop"],
  },
  {
    id: "commandos-behind-enemy-lines",
    steamAppId: 6800,
    title: "Commandos: Behind Enemy Lines",
    eyebrow: "Pyro Studios",
    subtitle: "20 missions et extractions dans l'ordre.",
    count: "0 succes Steam",
    file: "commandos-behind-enemy-lines.txt",
    accent: "gold",
    tag: "Soluce speciale",
    description:
      "Route des missions, six commandos, objectifs, alarmes et extractions sans faux compteur Steam.",
    highlight:
      "A surveiller : cet AppID n'expose pas de succes Steam ; les medailles et temps restent des objectifs manuels.",
    meta: ["0/0 Steam", "20 missions", "Infiltration"],
  },
  {
    id: "commandos-beyond-the-call-of-duty",
    steamAppId: 6810,
    title: "Commandos: Beyond the Call of Duty",
    eyebrow: "Pyro Studios",
    subtitle: "Campagne additionnelle et missions dans l'ordre.",
    count: "0 succes Steam",
    file: "commandos-beyond-the-call-of-duty.txt",
    accent: "coral",
    tag: "Soluce speciale",
    description:
      "Route des missions additionnelles, infiltration, objectifs et extractions sans compteur Steam.",
    highlight:
      "A surveiller : 0 succes Steam sur l'AppID ; la fiche suit la campagne et les bonus de mission.",
    meta: ["0/0 Steam", "Campagne", "Mission replay"],
  },
  {
    id: "commandos-2-men-of-courage",
    steamAppId: 6830,
    title: "Commandos 2: Men of Courage",
    eyebrow: "Pyro Studios",
    subtitle: "Campagnes, personnages et bonus dans l'ordre.",
    count: "0 succes Steam",
    file: "commandos-2-men-of-courage.txt",
    accent: "blue",
    tag: "Soluce speciale",
    description:
      "Route des missions, six specialites, objectifs secondaires, cartes bonus et extraction complete.",
    highlight:
      "A surveiller : l'AppID n'expose pas de succes Steam ; les objectifs de campagne sont suivis manuellement.",
    meta: ["0/0 Steam", "Campagne", "Bonus"],
  },
  {
    id: "commandos-3-destination-berlin",
    steamAppId: 6840,
    title: "Commandos 3: Destination Berlin",
    eyebrow: "Pyro Studios",
    subtitle: "Operations, objectifs et scores dans l'ordre.",
    count: "0 succes Steam",
    file: "commandos-3-destination-berlin.txt",
    accent: "coral",
    tag: "Soluce speciale",
    description:
      "Route de campagne, operations, objectifs optionnels, extractions et modes additionnels.",
    highlight:
      "A surveiller : 0 succes Steam sur l'AppID ; la completion vise missions, bonus et scores.",
    meta: ["0/0 Steam", "Operations", "Scores"],
  },
  {
    id: "homefront",
    steamAppId: 55100,
    title: "Homefront",
    eyebrow: "Kaos Studios / THQ",
    subtitle: "Campagne, News Pickups et online dans l'ordre.",
    count: "47 succes Steam",
    file: "homefront.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route des sept chapitres, des 61 News Pickups, des runs Iron Man et Guerrilla et du multijoueur.",
    highlight:
      "A surveiller : les deux passages du chapitre 3, les runs sans checkpoint, les SAM trucks et les challenges online.",
    meta: ["47/47 Steam", "7 chapitres", "Solo / Multi"],
  },
  {
    id: "max-payne-3",
    steamAppId: 204100,
    title: "Max Payne 3",
    eyebrow: "Rockstar Games",
    subtitle: "Campagne, difficultes et multijoueur dans l'ordre.",
    count: "67 succes Steam",
    file: "max-payne-3.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description:
      "Route des trois parties, armes dorees, indices, modes solo, quatre difficultes et nettoyage online.",
    highlight:
      "A surveiller : la visee libre, les collectibles par chapitre, New York Minute et les conditions de cartes online.",
    meta: ["67/67 Steam", "Campagne", "Multijoueur"],
  },
  {
    id: "mortal-kombat-x",
    steamAppId: 307780,
    title: "Mortal Kombat X",
    eyebrow: "NetherRealm Studios",
    subtitle: "Story, Krypte, Tours et factions dans l'ordre.",
    count: "73 succes Steam",
    file: "mortal-kombat-x.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description:
      "Route du tutoriel, Story Mode, Krypt, Tours, personnages, variantes, factions et online.",
    highlight:
      "A surveiller : les Tours vivantes, les cinq factions, les personnages Kombat Pack 2 et les series online.",
    meta: ["73/73 Steam", "Story + Tours", "Online"],
  },
  {
    id: "far-cry-2",
    steamAppId: 19900,
    title: "Far Cry 2",
    eyebrow: "Ubisoft Montreal",
    subtitle: "Campagne, factions et exploration dans l'ordre.",
    count: "0 succes Steam",
    file: "far-cry-2.txt",
    accent: "gold",
    tag: "Soluce speciale",
    description:
      "Route de campagne, missions de faction, buddies, diamants, bandes, planques et armes.",
    highlight:
      "A surveiller : cet AppID n'expose pas de succes Steam ; la completion est suivie manuellement par activites.",
    meta: ["0/0 Steam", "Campagne", "Exploration"],
  },
  {
    id: "grandia-hd-remaster",
    steamAppId: 1034860,
    title: "GRANDIA HD Remaster",
    eyebrow: "Game Arts",
    subtitle: "Le voyage complet, dans l'ordre et sans spoiler.",
    count: "36 succes",
    file: "grandia-hd-remaster.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description: "Route RPG, compagnons, mana eggs, techniques, objets et succes dans le bon ordre.",
    highlight: "A surveiller : les objectifs de combat et les zones optionnelles avant les points de non-retour.",
    meta: ["36/36 Steam", "RPG", "Sans spoiler"],
  },
  {
    id: "destiny-warriors-rpg",
    steamAppId: 399790,
    title: "Destiny Warriors RPG",
    eyebrow: "RPG",
    subtitle: "Une route courte et claire jusqu'au dernier succes.",
    count: "6 succes",
    file: "destiny-warriors-rpg.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description: "Progression, quetes, combats et nettoyage des succes dans l'ordre logique.",
    highlight: "A surveiller : les interactions secondaires a faire avant la fin de la campagne.",
    meta: ["6/6 Steam", "RPG", "Sans spoiler"],
  },
  {
    id: "greyfox-rpg",
    steamAppId: 341310,
    title: "Greyfox RPG",
    eyebrow: "RPG independant",
    subtitle: "Campagne, quetes et succes sans detour inutile.",
    count: "16 succes",
    file: "greyfox-rpg.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description: "Route chronologique, quetes annexes, combats et checklist des 16 succes.",
    highlight: "A surveiller : les quetes a terminer avant les changements de zone.",
    meta: ["16/16 Steam", "RPG", "Sans spoiler"],
  },
  {
    id: "secret-of-magia",
    steamAppId: 396160,
    title: "Secret Of Magia",
    eyebrow: "RPG independant",
    subtitle: "Le parcours complet et les cinq succes dans l'ordre.",
    count: "5 succes",
    file: "secret-of-magia.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description: "Progression, boss, equipement et objectifs annexes sans spoiler narratif.",
    highlight: "A surveiller : les quelques actions facultatives avant les dernieres zones.",
    meta: ["5/5 Steam", "RPG", "Sans spoiler"],
  },
  {
    id: "sonic-the-hedgehog-4-episode-i",
    steamAppId: 202530,
    title: "SONIC THE HEDGEHOG 4 Episode I",
    eyebrow: "SEGA",
    subtitle: "Episodes, etoiles rouges, medailles et Super Sonic.",
    count: "12 succes",
    file: "sonic-the-hedgehog-4-episode-i.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description: "Route des actes, stages bonus, etoiles rouges, boss et objectifs de score.",
    highlight: "A surveiller : les etoiles rouges et les conditions des stages bonus avant la fin.",
    meta: ["12/12 Steam", "Plateforme", "Sans spoiler"],
  },
  {
    id: "sonic-the-hedgehog-4-episode-ii",
    steamAppId: 203650,
    title: "SONIC THE HEDGEHOG 4 Episode II",
    eyebrow: "SEGA",
    subtitle: "La route des actes, de Tails et des stages bonus.",
    count: "12 succes",
    file: "sonic-the-hedgehog-4-episode-ii.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description: "Actes, anneaux rouges, stages bonus, boss et objectifs a deux joueurs.",
    highlight: "A surveiller : les anneaux rouges et les routes de Tails dans chaque acte.",
    meta: ["12/12 Steam", "Plateforme", "Sans spoiler"],
  },
  {
    id: "arizona-sunshine-vr-legacy",
    steamAppId: 342180,
    title: "Arizona Sunshine VR Legacy",
    eyebrow: "Vertigo Games",
    subtitle: "Campagne VR, collectibles, armes et cooperation.",
    count: "48 succes",
    file: "arizona-sunshine-vr-legacy.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description: "Route des niveaux, armes, collectibles, difficultes et objectifs cooperatifs.",
    highlight: "A surveiller : les objets de niveau et les conditions de difficulte avant le nettoyage final.",
    meta: ["48/48 Steam", "VR", "Coop"],
  },
  {
    id: "live-a-live",
    steamAppId: 2014380,
    title: "LIVE A LIVE",
    eyebrow: "SQUARE ENIX",
    subtitle: "Les scenarios, le dernier chapitre et les succes dans l'ordre.",
    count: "48 succes",
    file: "live-a-live.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description: "Ordre conseille des scenarios, objectifs de combat, objets et checklist finale.",
    highlight: "A surveiller : les actions propres a chaque scenario et le nettoyage avant le chapitre final.",
    meta: ["48/48 Steam", "RPG", "Sans spoiler"],
  },
  {
    id: "final-fantasy-xvi",
    steamAppId: 2515020,
    title: "FINAL FANTASY XVI",
    eyebrow: "Final Fantasy",
    subtitle: "Campagne, New Game+ et les deux extensions dans l'ordre.",
    count: "69 succes",
    file: "final-fantasy-xvi.txt",
    accent: "blue",
    tag: "DLC et New Game+",
    description: "Route de campagne, chronolithes, chasse, objets, Rising Tide et Echoes of the Fallen.",
    highlight: "A surveiller : les achats, les quetes secondaires et les conditions de Final Fantasy Mode.",
    meta: ["69/69 Steam", "2 DLC", "Sans spoiler"],
  },
  {
    id: "baldurs-gate-3",
    steamAppId: 1086940,
    title: "Baldur's Gate 3",
    eyebrow: "Larian Studios",
    subtitle: "Actes, quetes, compagnons, fins et succes sans spoiler.",
    count: "54 succes",
    file: "baldurs-gate-3.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description: "Route par actes, compagnons, romances, combats, choix et nettoyage des 54 succes.",
    highlight: "A surveiller : les quetes de compagnons, les choix de fin et les sauvegardes de securite.",
    meta: ["54/54 Steam", "RPG", "Choix a proteger"],
  },
  {
    id: "brink",
    steamAppId: 22350,
    title: "BRINK",
    eyebrow: "Splash Damage",
    subtitle: "Campagnes, objectifs de classe et nettoyage online.",
    count: "43 succes",
    file: "brink.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description: "Route des missions Resistance et Security, classes, objectifs et conditions online.",
    highlight: "A surveiller : les objectifs de mission lies aux classes et les parties avec equipement adapte.",
    meta: ["43/43 Steam", "FPS", "Online a verifier"],
  },
  {
    id: "call-of-juarez-the-cartel",
    steamAppId: 33420,
    title: "Call of Juarez: The Cartel",
    eyebrow: "Techland",
    subtitle: "Campagne a trois personnages et succes cooperatifs.",
    count: "50 succes",
    file: "call-of-juarez-the-cartel.txt",
    accent: "gold",
    tag: "Campagne + coop",
    description: "Missions, preuves, objectifs de personnage, difficultes et route cooperative.",
    highlight: "A surveiller : les preuves et objectifs lies au personnage selectionne.",
    meta: ["50/50 Steam", "Coop", "Sans spoiler"],
  },
  {
    id: "death-stranding-directors-cut",
    steamAppId: 1850570,
    title: "DEATH STRANDING DIRECTOR'S CUT",
    eyebrow: "Kojima Productions",
    subtitle: "Commandes, installations, commandes prepper et contenu bonus.",
    count: "63 succes",
    file: "death-stranding-directors-cut.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description: "Route des episodes, prepper, routes, livraisons, combat, entrainement et bonus Director's Cut.",
    highlight: "A surveiller : les commandes uniques, les preppers et les activites a terminer avant la fin.",
    meta: ["63/63 Steam", "Director's Cut", "Sans spoiler"],
  },
  {
    id: "grand-theft-auto-iv-complete-edition",
    steamAppId: 12210,
    title: "Grand Theft Auto IV: The Complete Edition",
    eyebrow: "Rockstar Games",
    subtitle: "Niko, Episodes from Liberty City et le nettoyage online.",
    count: "55 succes",
    file: "grand-theft-auto-iv-complete-edition.txt",
    accent: "blue",
    tag: "Campagne + DLC",
    description: "Histoire, missions secondaires, activites, pigeons, sauts, deux episodes et multijoueur.",
    highlight: "A surveiller : les choix de missions, les activites de progression et les conditions online.",
    meta: ["55/55 Steam", "2 episodes", "Online"],
  },
  {
    id: "hellblade-ii-senuas-saga",
    steamAppId: 2461850,
    title: "Hellblade II: Senua's Saga",
    eyebrow: "Ninja Theory",
    subtitle: "Les chapitres, visages caches et piliers dans l'ordre.",
    count: "12 succes",
    file: "hellblade-ii-senuas-saga.txt",
    accent: "coral",
    tag: "Guide 100 % Steam",
    description: "Route lineaire, visages caches, piliers de savoir et objectifs de combat.",
    highlight: "A surveiller : les collectes de chaque chapitre avant de franchir la transition suivante.",
    meta: ["12/12 Steam", "Campagne", "Sans spoiler"],
  },
  {
    id: "hellblade-senuas-sacrifice-vr-edition",
    steamAppId: 747350,
    title: "Hellblade: Senua's Sacrifice VR Edition",
    eyebrow: "Ninja Theory",
    subtitle: "Campagne VR, visages, runes et objectifs dans l'ordre.",
    count: "14 succes",
    file: "hellblade-senuas-sacrifice-vr-edition.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description: "Route des chapitres, visages caches, portes runiques et conditions de difficulte.",
    highlight: "A surveiller : les visages et les interactions de runes avant chaque sortie de zone.",
    meta: ["14/14 Steam", "VR", "Sans spoiler"],
  },
  {
    id: "ori-and-the-blind-forest",
    steamAppId: 261570,
    title: "Ori and the Blind Forest",
    eyebrow: "Moon Studios",
    subtitle: "Carte, capacites, secrets et succes dans l'ordre.",
    count: "50 succes",
    file: "ori-and-the-blind-forest.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description: "Route des arbres, cellules, secrets, aptitudes, difficultes et runs a contraintes.",
    highlight: "A surveiller : les zones verrouillees, les objectifs de run et les sauvegardes manuelles.",
    meta: ["50/50 Steam", "Plateforme", "Sans spoiler"],
  },
  {
    id: "ori-and-the-blind-forest-definitive-edition",
    steamAppId: 387290,
    title: "Ori and the Blind Forest: Definitive Edition",
    eyebrow: "Moon Studios",
    subtitle: "Campagne, DLC, secrets et checklist definitive.",
    count: "57 succes",
    file: "ori-and-the-blind-forest-definitive-edition.txt",
    accent: "coral",
    tag: "Edition definitive",
    description: "Route complete avec Black Root Burrows, Lost Grove, secrets, capacites et difficultes.",
    highlight: "A surveiller : les zones optionnelles et les objectifs de run avant le nettoyage final.",
    meta: ["57/57 Steam", "DLC inclus", "Sans spoiler"],
  },
  {
    id: "payday-the-heist",
    steamAppId: 24240,
    title: "PAYDAY: The Heist",
    eyebrow: "OVERKILL",
    subtitle: "Braquages, classes, difficultes et objectifs d'equipe.",
    count: "56 succes",
    file: "payday-the-heist.txt",
    accent: "gold",
    tag: "Guide 100 % Steam",
    description: "Ordre des braquages, roles, objectifs speciaux, difficultes et conditions cooperatives.",
    highlight: "A surveiller : les contraintes de classe et les objectifs qui demandent une equipe coordonnee.",
    meta: ["56/56 Steam", "Coop", "Difficulte"],
  },
  {
    id: "rv-there-yet",
    steamAppId: 3949040,
    title: "RV There Yet?",
    eyebrow: "Dujamster",
    subtitle: "Parcours coop, equipements, evenements et 96 succes.",
    count: "96 succes",
    file: "rv-there-yet.txt",
    accent: "coral",
    tag: "Coop evolutive",
    description: "Route du trajet, objets, roles, situations de groupe et checklist des succes actuels.",
    highlight: "A surveiller : le jeu evolue encore ; le compteur Steam est a reverifier apres chaque mise a jour.",
    meta: ["96/96 Steam", "Coop", "A reverifier"],
  },
  {
    id: "warhammer-vermintide-2",
    steamAppId: 552500,
    title: "Warhammer: Vermintide 2",
    eyebrow: "Fatshark",
    subtitle: "Campagne, heros, difficultes et objectifs cooperatifs.",
    count: "26 succes",
    file: "warhammer-vermintide-2.txt",
    accent: "blue",
    tag: "Guide 100 % Steam",
    description: "Ordre des missions, heros, talents, conditions de difficulte et objectifs de groupe.",
    highlight: "A surveiller : les compositions d'equipe, les niveaux de difficulte et les objectifs de mission.",
    meta: ["26/26 Steam", "Coop", "Difficulte"],
  },
  {
    id: "battlefield-bad-company-2",
    steamAppId: 24960,
    title: "Battlefield: Bad Company 2",
    eyebrow: "DICE / EA",
    subtitle: "Soluce speciale de campagne, sans compteur Steam.",
    count: "0 succes Steam",
    file: "battlefield-bad-company-2.txt",
    accent: "coral",
    tag: "Soluce speciale",
    description: "Missions de campagne, armes, collectes et objectifs secondaires suivis manuellement.",
    highlight: "A surveiller : l'AppID Steam n'expose pas de succes ; la progression est documentee sans faux 100 %.",
    meta: ["0/0 Steam", "Campagne", "Sans spoiler"],
  },
  {
    id: "call-of-duty-2003",
    steamAppId: 2620,
    title: "Call of Duty (2003)",
    eyebrow: "Infinity Ward",
    subtitle: "Les trois campagnes historiques dans l'ordre.",
    count: "0 succes Steam",
    file: "call-of-duty-2003.txt",
    accent: "gold",
    tag: "Soluce speciale",
    description: "Route chronologique des campagnes, missions et objectifs sans compteur Steam invente.",
    highlight: "A surveiller : l'AppID Steam ne fournit aucun succes ; la completion est suivie par campagne.",
    meta: ["0/0 Steam", "3 campagnes", "Sans spoiler"],
  },
  {
    id: "crysis",
    steamAppId: 17300,
    title: "Crysis",
    eyebrow: "Crytek",
    subtitle: "Campagne, armes et objectifs sans succes Steam.",
    count: "0 succes Steam",
    file: "crysis.txt",
    accent: "blue",
    tag: "Soluce speciale",
    description: "Route des missions, objectifs secondaires, equipement et difficultes de campagne.",
    highlight: "A surveiller : l'AppID original n'expose pas de succes Steam ; suivi manuel transparent.",
    meta: ["0/0 Steam", "Campagne", "Sans spoiler"],
  },
  {
    id: "crysis-warhead",
    steamAppId: 17330,
    title: "Crysis Warhead",
    eyebrow: "Crytek",
    subtitle: "La campagne de Psycho dans l'ordre.",
    count: "0 succes Steam",
    file: "crysis-warhead.txt",
    accent: "coral",
    tag: "Soluce speciale",
    description: "Missions, objectifs secondaires, arsenal et progression de campagne sans faux succes.",
    highlight: "A surveiller : aucune statistique de succes Steam sur l'AppID ; progression suivie par mission.",
    meta: ["0/0 Steam", "Campagne", "Sans spoiler"],
  },
  {
    id: "crysis-2-maximum-edition",
    steamAppId: 108800,
    title: "Crysis 2 - Maximum Edition",
    eyebrow: "Crytek",
    subtitle: "Campagne, collectibles et equipement dans l'ordre.",
    count: "0 succes Steam",
    file: "crysis-2-maximum-edition.txt",
    accent: "gold",
    tag: "Soluce speciale",
    description: "Route de campagne, collectibles, armes et objectifs de difficulte sans compteur Steam.",
    highlight: "A surveiller : l'AppID n'expose pas de succes Steam ; completion manuelle des objectifs.",
    meta: ["0/0 Steam", "Campagne", "Sans spoiler"],
  },
  {
    id: "doom-3-original",
    steamAppId: 9050,
    title: "DOOM 3 (version originale)",
    eyebrow: "id Software",
    subtitle: "Campagne, PDA, codes et niveaux dans l'ordre.",
    count: "0 succes Steam",
    file: "doom-3-original.txt",
    accent: "coral",
    tag: "Soluce speciale",
    description: "Route de campagne, PDA, codes, armes et objectifs annexes sans faux 100 % Steam.",
    highlight: "A surveiller : cette version originale n'expose pas de succes Steam ; suivi manuel transparent.",
    meta: ["0/0 Steam", "Campagne", "Sans spoiler"],
  },
];

const steamHeaderUrl = (appId: number) =>
  `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

const normalizeCatalogText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");

type CatalogFilter = "all" | "steam" | "coop" | "dlc" | "offline";

const CATALOG_FILTERS: Array<{ id: CatalogFilter; label: string }> = [
  { id: "all", label: "Toutes" },
  { id: "steam", label: "Steam" },
  { id: "coop", label: "Coop / en ligne" },
  { id: "dlc", label: "DLC" },
  { id: "offline", label: "Hors ligne" },
];

const sortGuidesAlphabetically = (items: Guide[]) =>
  [...items].sort((left, right) =>
    left.title.localeCompare(right.title, "fr", { sensitivity: "base" }),
  );

const catalogLetters = Array.from(
  new Set(
    sortGuidesAlphabetically(guides).map((guide) =>
      normalizeCatalogText(guide.title).charAt(0).toUpperCase(),
    ),
  ),
).sort((left, right) => left.localeCompare(right, "fr"));

function openReader(
  id: string,
  setSelectedId: (value: string) => void,
  setSearch: (value: string) => void,
  setReaderMode: (value: boolean) => void,
  setInvalidGuideId: (value: string | null) => void,
  catalogSearch: string,
  catalogFilter: CatalogFilter,
  catalogLetter: string,
) {
  setSearch("");
  setSelectedId(id);
  setInvalidGuideId(null);
  setReaderMode(true);
  const url = new URL(window.location.href);
  url.pathname = "/";
  url.searchParams.delete("view");
  if (catalogSearch) url.searchParams.set("q", catalogSearch);
  else url.searchParams.delete("q");
  if (catalogFilter !== "all") url.searchParams.set("filter", catalogFilter);
  else url.searchParams.delete("filter");
  if (catalogLetter) url.searchParams.set("letter", catalogLetter);
  else url.searchParams.delete("letter");
  url.searchParams.set("guide", id);
  url.hash = "";
  window.history.pushState({ guide: id }, "", url);
  window.scrollTo({ top: 0, behavior: "auto" });
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(guides[0].id);
  const [search, setSearch] = useState("");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>("all");
  const [catalogLetter, setCatalogLetter] = useState("");
  const [catalogLimit, setCatalogLimit] = useState(24);
  const [isOnline, setIsOnline] = useState(true);
  const [readerMode, setReaderMode] = useState(false);
  const [invalidGuideId, setInvalidGuideId] = useState<string | null>(null);
  const [initialStateReady, setInitialStateReady] = useState(false);
  const [heroActiveId, setHeroActiveId] = useState(guides[0].id);
  const catalogSearchRef = useRef<HTMLInputElement>(null);
  const guideSearchRef = useRef<HTMLInputElement>(null);

  const selected = guides.find((guide) => guide.id === selectedId) ?? guides[0];
  const heroActive = guides.find((guide) => guide.id === heroActiveId) ?? guides[0];
  const heroGuides = guides.slice(0, 7);
  const alphabeticalGuides = useMemo(() => sortGuidesAlphabetically(guides), []);
  const selectedIndex = alphabeticalGuides.findIndex((guide) => guide.id === selected.id);
  const previousGuide = selectedIndex > 0 ? alphabeticalGuides[selectedIndex - 1] : undefined;
  const nextGuide = selectedIndex >= 0 ? alphabeticalGuides[selectedIndex + 1] : undefined;
  const catalogMatches = useMemo(() => {
    const query = normalizeCatalogText(catalogSearch.trim());

    return guides
      .filter((guide) => {
        const searchableText = [
          guide.title,
          guide.eyebrow,
          guide.subtitle,
          guide.tag,
          guide.description,
          ...guide.meta,
        ];
        const matchesSearch =
          !query || searchableText.some((value) => normalizeCatalogText(value).includes(query));
        const normalized = normalizeCatalogText(searchableText.join(" "));
        const matchesFilter =
          catalogFilter === "all" ||
          (catalogFilter === "steam" && normalized.includes("steam")) ||
          (catalogFilter === "coop" && /coop|en ligne/.test(normalized)) ||
          (catalogFilter === "dlc" && normalized.includes("dlc")) ||
          (catalogFilter === "offline" && normalized.includes("hors ligne"));

        return matchesSearch && matchesFilter;
      });
  }, [catalogFilter, catalogSearch]);
  const availableCatalogLetters = useMemo(
    () => new Set(
      catalogMatches.map((guide) => normalizeCatalogText(guide.title).charAt(0).toUpperCase()),
    ),
    [catalogMatches],
  );
  const visibleGuides = useMemo(
    () => sortGuidesAlphabetically(
      catalogMatches.filter((guide) =>
        !catalogLetter || normalizeCatalogText(guide.title).charAt(0).toUpperCase() === catalogLetter,
      ),
    ),
    [catalogLetter, catalogMatches],
  );
  const effectiveCatalogLimit = catalogLimit;
  const displayedGuides = visibleGuides.slice(0, effectiveCatalogLimit);

  // These values come from the browser and must hydrate after the static shell mounts.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const url = new URL(window.location.href);
    const requestedGuide = url.searchParams.get("guide");
    const requestedSearch = url.searchParams.get("q");
    const requestedFilter = url.searchParams.get("filter") as CatalogFilter | null;
    const requestedLetter = url.searchParams.get("letter")?.toUpperCase() ?? "";
    const validRequestedGuide = guides.find((guide) => guide.id === requestedGuide);
    setCatalogSearch(requestedSearch ?? "");
    setCatalogFilter(
      requestedFilter && CATALOG_FILTERS.some((filter) => filter.id === requestedFilter)
        ? requestedFilter
        : "all",
    );
    setCatalogLetter(catalogLetters.includes(requestedLetter) ? requestedLetter : "");
    if (validRequestedGuide) {
      setSelectedId(validRequestedGuide.id);
      setReaderMode(true);
      window.history.replaceState(
        { gameNote: "reader", guide: validRequestedGuide.id },
        "",
        window.location.href,
      );
    } else if (requestedGuide) {
      setInvalidGuideId(requestedGuide);
      setReaderMode(false);
    }
    if (url.searchParams.has("view")) {
      url.searchParams.delete("view");
      window.history.replaceState(null, "", url);
    }
    setIsOnline(window.navigator.onLine);
    setInitialStateReady(true);

    const handlePopState = () => {
      const nextUrl = new URL(window.location.href);
      const nextGuide = guides.find((guide) => guide.id === nextUrl.searchParams.get("guide"));
      setCatalogSearch(nextUrl.searchParams.get("q") ?? "");
      const nextFilter = nextUrl.searchParams.get("filter") as CatalogFilter | null;
      const nextLetter = nextUrl.searchParams.get("letter")?.toUpperCase() ?? "";
      setCatalogFilter(
        nextFilter && CATALOG_FILTERS.some((filter) => filter.id === nextFilter)
          ? nextFilter
          : "all",
      );
      setCatalogLetter(catalogLetters.includes(nextLetter) ? nextLetter : "");
      if (nextGuide) {
        setSelectedId(nextGuide.id);
        setInvalidGuideId(null);
        setReaderMode(true);
      } else {
        setInvalidGuideId(nextUrl.searchParams.get("guide"));
        setReaderMode(false);
      }
      setSearch("");
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!initialStateReady || readerMode) return;
    const url = new URL(window.location.href);
    if (catalogSearch) url.searchParams.set("q", catalogSearch);
    else url.searchParams.delete("q");
    if (catalogFilter !== "all") url.searchParams.set("filter", catalogFilter);
    else url.searchParams.delete("filter");
    if (catalogLetter) url.searchParams.set("letter", catalogLetter);
    else url.searchParams.delete("letter");
    window.history.replaceState(window.history.state, "", url);
  }, [catalogFilter, catalogLetter, catalogSearch, initialStateReady, readerMode]);

  useEffect(() => {
    const updateOnlineState = () => setIsOnline(window.navigator.onLine);
    window.addEventListener("online", updateOnlineState);
    window.addEventListener("offline", updateOnlineState);
    return () => {
      window.removeEventListener("online", updateOnlineState);
      window.removeEventListener("offline", updateOnlineState);
    };
  }, []);

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        catalogSearchRef.current?.focus();
        return;
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        guideSearchRef.current?.focus();
        return;
      }

      if (event.key === "Escape") {
        if (document.activeElement === catalogSearchRef.current) {
          setCatalogSearch("");
        }
        if (document.activeElement === guideSearchRef.current) {
          setSearch("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, []);

  const handleOpenReader = (id: string) => {
    openReader(
      id,
      setSelectedId,
      setSearch,
      setReaderMode,
      setInvalidGuideId,
      catalogSearch,
      catalogFilter,
      catalogLetter,
    );
  };

  const goToLibrary = () => {
    setReaderMode(false);
    setSearch("");
    setInvalidGuideId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("guide");
    url.hash = "guides";
    window.history.pushState({ gameNote: "library" }, "", url);
    window.requestAnimationFrame(() => {
      document.getElementById("guides")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const updateCatalogLetter = (letter: string) => {
    setCatalogLetter(letter);
    setCatalogLimit(24);
    window.requestAnimationFrame(() => {
      document.getElementById("guides")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const resetCatalog = () => {
    setCatalogSearch("");
    setCatalogFilter("all");
    setCatalogLetter("");
    setCatalogLimit(24);
  };

  const clearInvalidGuide = () => {
    goToLibrary();
  };

  return (
    <main
      className={"site-shell" + (readerMode ? " is-reader-mode" : "")}
      id="main-content"
      tabIndex={-1}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Game Note",
            url: "https://game-note.pages.dev/",
            inLanguage: "fr-FR",
            description:
              "Le carnet de route Game Note : des guides chronologiques, sans spoiler, pour garder le bon repère au bon moment.",
          }),
        }}
      />
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>
      <header className="topbar">
        <a className="brand" href={readerMode ? "/" : "#guides"} aria-label="Game Note, bibliothèque">
          <span className="brand-symbol" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo/game-note-symbol-route.png" alt="" width={1254} height={1254} />
          </span>
          <span className="brand-content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/images/logo/game-note-logo-ink-script-header.png"
              alt=""
              width={1536}
              height={540}
            />
            <small>carnet de route · sans détour</small>
          </span>
        </a>
        {!readerMode ? (
          <nav className="topbar-nav" aria-label="Navigation principale">
            <a href="#guides">Index <span>{guides.length}</span></a>
            <a href="#method">Méthode</a>
            <span className="topbar-status">Archive locale / 2026</span>
          </nav>
        ) : (
          <span className="topbar-reader-mark">Mode lecture / {selected.title}</span>
        )}
      </header>

      {!isOnline ? (
        <div className="offline-banner" role="status" aria-live="polite">
          <span aria-hidden="true">●</span>
          Hors ligne : les fiches déjà ouvertes restent accessibles.
        </div>
      ) : null}

      {invalidGuideId && !readerMode ? (
        <div className="route-error" role="alert">
          <strong>Cette route n’existe pas encore.</strong>
          <span>Le guide demandé n’a pas été trouvé dans la bibliothèque.</span>
          <button className="button button-outline" type="button" onClick={clearInvalidGuide}>
            Afficher la bibliothèque
          </button>
        </div>
      ) : null}

      {!readerMode ? <>
      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="portfolio-hero-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/banners/game-note-hero-ink-route.png"
            alt=""
            width={2400}
            height={1350}
            fetchPriority="high"
          />
          <span className="portfolio-hero-wash" />
        </div>
        <div className="portfolio-hero-topline">
          <span>GAME NOTE / FIELD MANUAL</span>
          <span>CHRONOLOGICAL GUIDES / FR</span>
          <span>NO ACCOUNT / NO DETOUR</span>
        </div>
        <div className="portfolio-hero-grid">
          <div className="portfolio-hero-copy">
            <p className="hero-kicker"><span>GAME NOTE</span><span>ARCHIVE 2026</span></p>
            <h1 id="hero-title">Une partie.<br /><em>Une route.</em><br /><span>Pas un oubli.</span></h1>
            <p className="hero-intro">
              Des guides chronologiques pour les jeux qui méritent mieux qu&apos;un onglet ouvert au hasard.
            </p>
            <div className="hero-actions">
              <a className="hero-link hero-link-primary" href="#guides">Ouvrir l&apos;index <span aria-hidden="true">↓</span></a>
              <button className="hero-link hero-link-secondary" type="button" onClick={() => handleOpenReader(heroActive.id)}>
                Lire la route à la une <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="hero-stats" aria-label="Statistiques Game Note">
              <div><strong>{guides.length}</strong><span>guides archivés</span></div>
              <div><strong>100%</strong><span>lecture locale</span></div>
              <div><strong>01</strong><span>repère à la fois</span></div>
            </div>
          </div>

          <article className={"hero-focus hero-focus-" + heroActive.accent}>
            <div className="hero-focus-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="hero-focus-art"
                src={heroActive.artworkUrl ?? steamHeaderUrl(heroActive.steamAppId)}
                alt={`Illustration de la route ${heroActive.title}`}
                width={460}
                height={215}
                onError={(event) => {
                  event.currentTarget.src = "/images/cards/game-note-card-route.png";
                }}
              />
              <span className="hero-focus-grid" aria-hidden="true" />
              <div className="hero-focus-caption">
                <p>ROUTE À LA UNE / {String(guides.indexOf(heroActive) + 1).padStart(2, "0")}</p>
                <h2>{heroActive.title}</h2>
                <span>{heroActive.eyebrow} / {heroActive.count}</span>
              </div>
            </div>
            <p className="hero-focus-note">Une fiche, un ordre, une sauvegarde de moins à regretter.</p>
          </article>

          <div className="hero-index">
            <div className="hero-index-heading"><span>INDEX / SÉLECTION</span><span>{String(heroGuides.length).padStart(2, "0")} / {String(guides.length).padStart(2, "0")}</span></div>
            <ol>
              {heroGuides.map((guide, index) => (
                <li key={guide.id}>
                  <button
                    className={heroActive.id === guide.id ? "is-active" : ""}
                    type="button"
                    onClick={() => handleOpenReader(guide.id)}
                    onFocus={() => setHeroActiveId(guide.id)}
                    onMouseEnter={() => setHeroActiveId(guide.id)}
                  >
                    <span className="hero-index-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="hero-index-copy"><strong>{guide.title}</strong><small>{guide.eyebrow} / {guide.count}</small></span>
                    <span className="hero-index-arrow" aria-hidden="true">↗</span>
                  </button>
                </li>
              ))}
            </ol>
            <a className="hero-index-more" href="#guides">Voir les {guides.length} routes <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <a className="hero-scroll" href="#method"><span>SCROLL / MÉTHODE</span><span className="hero-scroll-line" aria-hidden="true" /></a>
      </section>

      <section className="manifesto-grid" id="method" aria-label="Les repères Game Note">
        <article className="manifesto-card manifesto-card-main">
          <div className="manifesto-card-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cards/game-note-card-route.png" alt="Carte illustrée d'une route balisée" width={1536} height={1024} loading="lazy" decoding="async" />
          </div>
          <div className="manifesto-card-copy"><p>01 / ROUTE</p><h2>Le fil avant le bruit.</h2><span>Une progression lisible, les bons détours et le bon repère au bon moment.</span></div>
        </article>
        <article className="manifesto-card">
          <div className="manifesto-card-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cards/game-note-card-spoiler-safe.png" alt="Carnet protégé par un marqueur corail" width={1536} height={1024} loading="lazy" decoding="async" />
          </div>
          <div className="manifesto-card-copy"><p>02 / LECTURE</p><h2>Juste ce qu&apos;il faut.</h2><span>Les informations utiles au moment utile, sans transformer la découverte en liste froide.</span></div>
        </article>
        <article className="manifesto-strip">
          <div className="manifesto-strip-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/banners/game-note-banner-archive.png" alt="Archive illustrée Game Note" width={1920} height={640} loading="lazy" decoding="async" />
          </div>
          <div><p>THE ARCHIVE / GAME NOTE</p><span>Un carnet de route personnel, pensé pour rester calme, précis et toujours à portée de main.</span></div>
        </article>
      </section>
      <section className="section-block library-page" id="guides">
        <div className="section-heading">
          <div>
            <p className="kicker"><span>GAME NOTE</span><span>BIBLIOTHÈQUE</span></p>
            <h1>Mes soluces.</h1>
          </div>
          <p>
            Recherche un jeu, ouvre sa soluce et avance dans le bon ordre.
          </p>
        </div>

        <div className="library-tools">
          <label htmlFor="catalog-search">Trouver une soluce</label>
          <div className="catalog-search-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              id="catalog-search"
              ref={catalogSearchRef}
              type="search"
              placeholder="Ex. Resident Evil, missables, DLC…"
              value={catalogSearch}
              aria-keyshortcuts="Control+K Meta+K"
              onChange={(event) => setCatalogSearch(event.target.value)}
            />
            {catalogSearch ? (
              <button
                className="clear-search"
                type="button"
                onClick={() => setCatalogSearch("")}
                aria-label="Effacer la recherche de guides"
              >
                ×
              </button>
            ) : null}
          </div>
          <span className="catalog-count" aria-live="polite">
            <strong>{visibleGuides.length}</strong> soluce{visibleGuides.length > 1 ? "s" : ""} sur {guides.length}
            <em>A–Z</em>
          </span>
        </div>

        <nav className="catalog-index" aria-label="Index alphabétique des soluces">
          <span className="catalog-index-label">INDEX</span>
          <button
            className={!catalogLetter ? "is-active" : ""}
            type="button"
            aria-pressed={!catalogLetter}
            onClick={() => updateCatalogLetter("")}
          >
            Toutes
          </button>
          {catalogLetters.map((letter) => (
            <button
              className={catalogLetter === letter ? "is-active" : ""}
              type="button"
              aria-label={`Afficher les soluces commençant par ${letter}`}
              aria-pressed={catalogLetter === letter}
              disabled={!availableCatalogLetters.has(letter)}
              key={letter}
              onClick={() => updateCatalogLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </nav>

        <div className="library-filters" aria-label="Filtrer les soluces">
          <span>FILTRER</span>
          <div role="group" aria-label="Filtres de bibliothèque">
            {CATALOG_FILTERS.map((filter) => (
              <button
                className={catalogFilter === filter.id ? "is-active" : ""}
                type="button"
                aria-pressed={catalogFilter === filter.id}
                key={filter.id}
                onClick={() => setCatalogFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {catalogSearch || catalogFilter !== "all" || catalogLetter ? (
            <button
              className="library-reset"
              type="button"
              onClick={resetCatalog}
            >
              Réinitialiser
            </button>
          ) : null}
        </div>

        {visibleGuides.length > 0 ? (
          <div className="guide-grid">
            {displayedGuides.map((guide) => {
              const catalogPosition = visibleGuides.findIndex((item) => item.id === guide.id) + 1;
              return (
                <article
                  className={"guide-card guide-card-" + guide.accent}
                  key={guide.id}
                >
                  <div className="card-top">
                    <span className="card-index">{String(catalogPosition).padStart(2, "0")}</span>
                    <span className="card-tag">{guide.tag}</span>
                  </div>
                  <button
                    className="guide-card-open"
                    type="button"
                    aria-label={`Ouvrir la soluce ${guide.title}`}
                    onClick={() => handleOpenReader(guide.id)}
                  >
                    <div className="card-artwork">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={guide.artworkUrl ?? steamHeaderUrl(guide.steamAppId)}
                        alt={`Illustration officielle de ${guide.title}`}
                        width={460}
                        height={215}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="card-copy">
                      <p className="card-eyebrow">{guide.eyebrow}</p>
                      <h3>{guide.title}</h3>
                      <p className="card-subtitle">{guide.subtitle}</p>
                      <div className="card-meta">
                        {guide.meta.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                      <span className="card-link">
                        Ouvrir la soluce <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <strong>Aucun guide ne correspond à cette recherche.</strong>
            <p>Essaie un autre titre, une série ou un mot-clé.</p>
            <button
              className="button button-outline"
              type="button"
              onClick={resetCatalog}
            >
              Afficher les {guides.length} guides
            </button>
          </div>
        )}
        {visibleGuides.length > effectiveCatalogLimit ? (
          <div className="library-more">
            <span>{displayedGuides.length} soluces affichées sur {visibleGuides.length}</span>
            <button className="button button-outline" type="button" onClick={() => setCatalogLimit((current) => current + 24)}>
              Afficher 24 soluces de plus
            </button>
          </div>
        ) : null}
      </section>

      </> : null}

      {readerMode ? <section className="reader-section" id="reader">
          <GuideReader
            selected={selected}
            previousGuide={previousGuide}
            nextGuide={nextGuide}
            catalogPosition={selectedIndex + 1}
            catalogTotal={alphabeticalGuides.length}
            search={search}
            setSearch={setSearch}
            guideSearchRef={guideSearchRef}
            onBack={goToLibrary}
            onNavigate={handleOpenReader}
          />
      </section> : null}

      <footer className="site-footer">
        <span>Game Note · guides personnels · v{SITE_VERSION}</span>
        <a href={readerMode ? "/" : "#guides"}>Retour à la bibliothèque ↑</a>
      </footer>
    </main>
  );
}
