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
];

function scrollToReader(id: string, setSelectedId: (value: string) => void) {
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
    setLoading(true);
    setSearch("");

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
          <span>3 guides disponibles</span>
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
          <div className="board-number">03</div>
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
          <strong>03</strong>
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
                onClick={() => scrollToReader(guide.id, setSelectedId)}
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
