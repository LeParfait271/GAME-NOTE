"use client";

import { useEffect, useMemo, useState } from "react";

type Guide = {
  id: string;
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
];

function scrollToReader(
  id: string,
  setSelectedId: (value: string) => void,
  setLoading: (value: boolean) => void,
  setSearch: (value: string) => void,
) {
  setLoading(true);
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
  const [loading, setLoading] = useState(true);

  const selected = guides.find((guide) => guide.id === selectedId) ?? guides[0];

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

  const normalizedSearch = search.trim().toLocaleLowerCase("fr");
  const matchingLines = useMemo(() => {
    if (!normalizedSearch) {
      return guideText.split(/\r?\n/).length;
    }

    return guideText
      .split(/\r?\n/)
      .filter((line) => line.toLocaleLowerCase("fr").includes(normalizedSearch))
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

        <div className="guide-grid">
          {guides.map((guide, index) => (
            <article
              className={
                "guide-card guide-card-" +
                guide.accent +
                (selected.id === guide.id ? " is-selected" : "")
              }
              key={guide.id}
            >
              <div className="card-top">
                <span className="card-index">0{index + 1}</span>
                <span className="card-tag">{guide.tag}</span>
              </div>
              <div className="card-badge" aria-hidden="true">
                {guide.title
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
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
                onClick={() =>
                  scrollToReader(guide.id, setSelectedId, setLoading, setSearch)
                }
              >
                Ouvrir la soluce <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
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
