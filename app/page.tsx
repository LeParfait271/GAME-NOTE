"use client";

import { useEffect, useMemo, useState } from "react";

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
    subtitle: "La route complète, sans révéler l’histoire.",
    count: "55 succès",
    file: "expedition-33.txt",
    accent: "coral",
    tag: "Le plus récent",
    description:
      "Une progression par actes avec les missables, les relations, les journaux, les disques et les zones optionnelles.",
    highlight:
      "À surveiller : le prologue, les relations et plusieurs scènes de camp.",
    meta: ["55/55 Steam", "49 journaux", "33 disques"],
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
    id: "titan-quest",
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
    id: "final-fantasy-vii-2013",
    steamAppId: 39140,
    title: "FINAL FANTASY VII (2013)",
    eyebrow: "Final Fantasy",
    subtitle: "Les 36 succes et les grandes fenetres dans l'ordre.",
    count: "36 succes",
    file: "final-fantasy-vii-2013.txt",
    accent: "gold",
    tag: "Nouveau guide",
    description:
      "Personnages optionnels, limites, Huge Materia, chocobos, Materias maitres et armes du nettoyage.",
    highlight:
      "A surveiller : Yuffie, Vincent, Great Gospel, Bahamut Zero et Excalibur des chocobos.",
    meta: ["36/36 Steam", "2 personnages optionnels", "Sans spoiler"],
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
];

const steamHeaderUrl = (appId: number) =>
  `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

const normalizeCatalogText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");

function scrollToReader(
  id: string,
  setSelectedId: (value: string) => void,
  setSearch: (value: string) => void,
) {
  setSearch("");
  setSelectedId(id);
  window.requestAnimationFrame(() => {
    document.getElementById("reader")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("expedition-33");
  const [guideText, setGuideText] = useState("");
  const [search, setSearch] = useState("");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const selected = guides.find((guide) => guide.id === selectedId) ?? guides[0];
  const visibleGuides = useMemo(() => {
    const query = normalizeCatalogText(catalogSearch.trim());

    if (!query) {
      return guides;
    }

    return guides.filter((guide) =>
      [
        guide.title,
        guide.eyebrow,
        guide.subtitle,
        guide.tag,
        guide.description,
        ...guide.meta,
      ].some((value) => normalizeCatalogText(value).includes(query)),
    );
  }, [catalogSearch]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/guides/" + selected.file, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Guide indisponible");
        }
        return response.text();
      })
      .then((text) => setGuideText(text))
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setGuideText(
            "Ce guide n’a pas pu être chargé. Télécharge le fichier TXT depuis le bouton ci-dessus.",
          );
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [selected.file]);

  const normalizedSearch = normalizeCatalogText(search.trim());
  const matchingLines = useMemo(() => {
    if (!normalizedSearch) {
      return guideText.split(/\r?\n/).length;
    }

    return guideText
      .split(/\r?\n/)
      .filter((line) => normalizeCatalogText(line).includes(normalizedSearch))
      .length;
  }, [guideText, normalizedSearch]);

  const visibleText = useMemo(() => {
    if (!normalizedSearch) {
      return guideText;
    }

    return guideText
      .split(/\r?\n/)
      .filter((line) => line.toLocaleLowerCase("fr").includes(normalizedSearch))
      .join("\n");
  }, [guideText, normalizedSearch]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Game Note, accueil">
          <span className="brand-mark">GN</span>
          <span>
            <strong className="wordmark">
              <span>GAME</span>
              <em>NOTE</em>
            </strong>
            <small>guides qui vont droit au but</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Navigation principale">
          <a href="#guides">Les guides</a>
          <a href="#methode">La méthode</a>
          <a href="#reader">Lire une soluce</a>
        </nav>

        <div className="topbar-status">
          <span className="status-dot" aria-hidden="true" />
          <span>{guides.length} guides disponibles</span>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">SANS SPOILER · 100 % STEAM</p>
          <h1>
            Joue tranquille.
            <br />
            <em>Ne rate rien.</em>
          </h1>
          <p className="hero-intro">
            Des soluces chronologiques, pensées pour avancer dans le bon ordre
            et garder les succès, les quêtes et les collectibles sous contrôle.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#guides">
              Choisir un jeu <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-quiet" href="#methode">
              Comment ça marche
            </a>
          </div>
        </div>

        <div className="hero-board" aria-label="Résumé de Game Note">
          <div className="board-tape">VERSION 01 · À GARDER SOUS LA MAIN</div>
          <div className="board-topline">
            <span>CHECKLIST DE PARTIE</span>
            <span>2026</span>
          </div>
          <div className="board-number">{String(guides.length).padStart(2, "0")}</div>
          <p className="board-title">jeux suivis</p>
          <div className="board-lines">
            <span>ordre chronologique</span>
            <span>missables signalés</span>
            <span>lecture mobile</span>
          </div>
          <div className="board-stamp">
            NO
            <br />
            SPOIL
          </div>
        </div>
      </section>

      <section className="stats-row" aria-label="Chiffres clés">
        <div>
          <strong>{String(guides.length).padStart(2, "0")}</strong>
          <span>jeux dans la collection</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>objectif succès et contenu</span>
        </div>
        <div>
          <strong>01</strong>
          <span>règle : garder le bon ordre</span>
        </div>
      </section>

      <section className="section-block" id="guides">
        <div className="section-heading">
          <div>
            <p className="kicker">LA BIBLIOTHÈQUE</p>
            <h2>Choisis ton aventure.</h2>
          </div>
          <p>
            Chaque carte ouvre le guide complet. Les fichiers TXT restent
            téléchargeables pour jouer hors ligne.
          </p>
        </div>

        <div className="library-tools">
          <label htmlFor="catalog-search">Trouver un guide</label>
          <div className="catalog-search-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              id="catalog-search"
              type="search"
              placeholder="Ex. Resident Evil, RPG, collectibles..."
              value={catalogSearch}
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
            {visibleGuides.length} guide{visibleGuides.length > 1 ? "s" : ""} sur {guides.length}
          </span>
        </div>

        {visibleGuides.length > 0 ? (
          <div className="guide-grid">
            {visibleGuides.map((guide, index) => (
            <article
              className={
                "guide-card guide-card-" +
                guide.accent +
                (selected.id === guide.id ? " is-selected" : "")
              }
              key={guide.id}
            >
              <div className="card-top">
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="card-tag">{guide.tag}</span>
              </div>
              <div className="card-artwork">
                <img
                  src={guide.artworkUrl ?? steamHeaderUrl(guide.steamAppId)}
                  alt={`Illustration officielle de ${guide.title}`}
                  width={460}
                  height={215}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="card-eyebrow">{guide.eyebrow}</p>
              <h3>{guide.title}</h3>
              <p className="card-subtitle">{guide.subtitle}</p>
              <p className="card-description">{guide.description}</p>
              <div className="card-meta">
                {guide.meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <button
                className="card-link"
                type="button"
                onClick={() => {
                  if (selected.id !== guide.id) {
                    setLoading(true);
                  }
                  scrollToReader(guide.id, setSelectedId, setSearch);
                }}
              >
                Ouvrir la soluce <span aria-hidden="true">↗</span>
              </button>
            </article>
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <strong>Aucun guide ne correspond à cette recherche.</strong>
            <p>Essaie un autre titre, une série ou un mot-clé.</p>
            <button
              className="button button-outline"
              type="button"
              onClick={() => setCatalogSearch("")}
            >
              Afficher les {guides.length} guides
            </button>
          </div>
        )}
      </section>

      <section className="method-section" id="methode">
        <div className="method-heading">
          <p className="kicker">LA MÉTHODE</p>
          <h2>Un guide qui te laisse jouer.</h2>
          <p>
            Pas de roman à lire avant de commencer. Les informations
            importantes arrivent au moment où elles servent.
          </p>
        </div>
        <div className="method-grid">
          <div className="method-item">
            <span className="method-number">01</span>
            <h3>Avance dans l’ordre</h3>
            <p>Les chapitres et les retours dans les zones sont placés au bon moment.</p>
          </div>
          <div className="method-item">
            <span className="method-number">02</span>
            <h3>Repère les alertes</h3>
            <p>Les activités difficiles à récupérer plus tard sont annoncées clairement.</p>
          </div>
          <div className="method-item">
            <span className="method-number">03</span>
            <h3>Coche sans pression</h3>
            <p>Les checklists restent lisibles sur téléphone et les TXT sont toujours là.</p>
          </div>
        </div>
      </section>

      <section className="reader-section" id="reader">
        <div className="reader-header">
          <div>
            <p className="kicker">LECTEUR DE SOLUCE</p>
            <h2>{selected.title}</h2>
            <p>{selected.highlight}</p>
          </div>
          <a
            className="button button-outline"
            href={"/guides/" + selected.file}
            download
          >
            Télécharger le TXT <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="reader-tools">
          <label htmlFor="guide-search">Rechercher dans le guide</label>
          <div className="search-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              id="guide-search"
              type="search"
              placeholder="ex. succès, chapitre, missable..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search ? (
              <button
                className="clear-search"
                type="button"
                onClick={() => setSearch("")}
                aria-label="Effacer la recherche"
              >
                ×
              </button>
            ) : null}
          </div>
          <span className="result-count">
            {normalizedSearch ? (
              <>
                {matchingLines} ligne{matchingLines > 1 ? "s" : ""}
              </>
            ) : (
              "guide complet"
            )}
          </span>
        </div>

        <div className="reader-paper">
          <div className="paper-label">
            <span>{selected.count}</span>
            <span>{selected.subtitle}</span>
          </div>
          {loading ? (
            <div className="reader-loading" role="status">
              Chargement de la soluce...
            </div>
          ) : (
            <pre className="guide-text">{visibleText}</pre>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">GN</span>
          <span>
            <strong className="wordmark">
              <span>GAME</span>
              <em>NOTE</em>
            </strong>
            <small>fait pour jouer, pas pour se perdre</small>
          </span>
        </div>
        <p>Guides personnels · sans spoiler · à déployer où tu veux</p>
        <a href="#top">Retour en haut ↑</a>
      </footer>
    </main>
  );
}
