"use client";

import { useEffect, useMemo, useState, type RefObject } from "react";

type ReaderGuide = {
  steamAppId: number;
  artworkUrl?: string;
  title: string;
  subtitle: string;
  count: string;
  file: string;
  accent: string;
  tag: string;
  description: string;
  highlight: string;
  meta: string[];
};

type GuideBlock = {
  id: string;
  kind: "heading" | "subheading" | "paragraph" | "bullet" | "check";
  text: string;
  checkIndex?: number;
};

type GuideReaderProps = {
  selected: ReaderGuide;
  search: string;
  setSearch: (value: string) => void;
  guideSearchRef: RefObject<HTMLInputElement | null>;
};

const normalizeGuideText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");

const guideHeaderUrl = (appId: number) =>
  `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

const makeBlockId = (text: string, index: number) => {
  const slug = normalizeGuideText(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54);
  return `guide-${index}-${slug || "section"}`;
};

const isUppercaseHeading = (value: string) => {
  const letters = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "");
  return (
    letters.length > 2 &&
    letters === letters.toLocaleUpperCase("fr") &&
    value.length <= 110
  );
};

const isNamedHeading = (value: string) =>
  /^(?:partie|chapitre|acte|épisode|episode|route|ordre|objectif|périmètre|perimetre|garde-fous|garde fous|missables|conditions|checklist|vérification|verification|nettoyage|préparation|preparation|prologue|épilogue|epilogue|campagne|post-game|post game|dlc|succès|succes|fin)\b/i.test(
    value,
  );

const parseGuide = (text: string): GuideBlock[] => {
  const blocks: GuideBlock[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let checkIndex = 0;
  let finalChecklistMode = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    const value = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (value) {
      blocks.push({
        id: makeBlockId(value, blocks.length),
        kind: "paragraph",
        text: value,
      });
    }
    paragraph = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || /^[-=_]{6,}$/.test(line)) {
      flushParagraph();
      continue;
    }

    const markdownHeading = line.match(/^#{1,3}\s+(.+)$/);
    if (markdownHeading) {
      flushParagraph();
      blocks.push({
        id: makeBlockId(markdownHeading[1], blocks.length),
        kind: "heading",
        text: markdownHeading[1].trim(),
      });
      continue;
    }

    const checklist = line.match(/^(?:[-*]\s*)?\[\s*\]\s+(.+)$/);
    if (checklist && finalChecklistMode) {
      flushParagraph();
      blocks.push({
        id: makeBlockId(checklist[1], blocks.length),
        kind: "check",
        text: checklist[1].trim(),
        checkIndex: checkIndex++,
      });
      continue;
    }

    const bullet = line.match(/^(?:[-*•])\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      blocks.push({
        id: makeBlockId(bullet[1], blocks.length),
        kind: "bullet",
        text: bullet[1].trim(),
      });
      continue;
    }

    const headingText = line.replace(/^\d+(?:\.\d+)*[.)]\s+/, "").trim();
    const numberedHeading = /^\d+(?:\.\d+)*[.)]\s+/.test(line);
    const heading =
      numberedHeading || isUppercaseHeading(line) || isNamedHeading(line);

    if (heading && line.length <= 120) {
      flushParagraph();
      if (/(?:checklist|liste complete)/i.test(line)) {
        finalChecklistMode = true;
      } else if (
        finalChecklistMode &&
        /^(?:verification|sources|fin du guide)\b/i.test(line)
      ) {
        finalChecklistMode = false;
      }
      blocks.push({
        id: makeBlockId(line, blocks.length),
        kind: numberedHeading ? "subheading" : "heading",
        text: numberedHeading ? `${line.match(/^\d+(?:\.\d+)*[.)]/)?.[0] ?? ""} ${headingText}` : line,
      });
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
};

const readChecklist = (guideId: string): Record<number, boolean> => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = JSON.parse(
      window.localStorage.getItem(`game-note-checklist-${guideId}`) ?? "{}",
    );
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
};

const formatText = (text: string) =>
  text
    .replace(/^\*\*(.+)\*\*$/, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`(.+?)`/g, "$1");

export default function GuideReader({
  selected,
  search,
  setSearch,
  guideSearchRef,
}: GuideReaderProps) {
  const [guideText, setGuideText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setChecked(readChecklist(selected.file));
  }, [selected.file]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch(`/guides/${selected.file}`, {
      signal: controller.signal,
      cache: "default",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Guide indisponible");
        }
        return response.text();
      })
      .then((text) => setGuideText(text))
      .catch((reason: Error) => {
        if (reason.name !== "AbortError") {
          setGuideText("");
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [selected.file]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const blocks = useMemo(() => parseGuide(guideText), [guideText]);
  const checklist = useMemo(
    () => blocks.filter((block) => block.kind === "check"),
    [blocks],
  );
  const query = normalizeGuideText(search.trim());
  const visibleBlocks = useMemo(() => {
    if (!query) {
      return blocks;
    }

    return blocks.filter((block) =>
      normalizeGuideText(block.text).includes(query),
    );
  }, [blocks, query]);
  const outline = useMemo(
    () =>
      blocks.filter(
        (block) => block.kind === "heading" || block.kind === "subheading",
      ),
    [blocks],
  );
  const completed = checklist.filter(
    (block) => block.checkIndex !== undefined && checked[block.checkIndex],
  ).length;

  const toggleCheck = (index: number) => {
    setChecked((current) => {
      const next = { ...current, [index]: !current[index] };
      try {
        window.localStorage.setItem(
          `game-note-checklist-${selected.file}`,
          JSON.stringify(next),
        );
      } catch {
        // The guide remains usable if local storage is unavailable.
      }
      return next;
    });
  };

  return (
    <>
      <div className="reader-cover">
        <div className="reader-cover-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selected.artworkUrl ?? guideHeaderUrl(selected.steamAppId)}
            alt={`Illustration officielle de ${selected.title}`}
            width={460}
              height={215}
            />
          <span className={`reader-cover-accent reader-cover-accent-${selected.accent}`} />
          <span className="reader-cover-art-label">GAME NOTE · ROUTE</span>
        </div>
        <div className="reader-cover-copy">
          <a className="reader-backlink" href="#guides">← Bibliothèque</a>
          <p className="kicker">FICHE DE ROUTE · {selected.count}</p>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <div className="reader-badges">
            {selected.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="reader-cover-alert">
          <span className="reader-alert-mark" aria-hidden="true">!</span>
            <div>
              <strong>À surveiller</strong>
              <p>{selected.highlight}</p>
              <span className="reader-alert-note">À vérifier avant de continuer</span>
            </div>
          </div>
        </div>

      <div className="reader-tools">
        <div className="reader-tools-copy">
          <label htmlFor="guide-search">Rechercher dans la fiche</label>
          <span className="reader-tools-hint">Touche / pour aller directement ici</span>
        </div>
        <div className="search-wrap">
          <span aria-hidden="true">⌕</span>
          <input
            id="guide-search"
            ref={guideSearchRef}
            type="search"
            placeholder="ex. succès, coffre, chapitre, missable..."
            value={search}
            aria-keyshortcuts="/"
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
        <span className="result-count" aria-live="polite">
          {query
            ? `${visibleBlocks.length} bloc${visibleBlocks.length > 1 ? "s" : ""} trouvé${visibleBlocks.length > 1 ? "s" : ""}`
            : checklist.length
              ? `${checklist.length} étapes à cocher`
              : "Lecture complète"}
        </span>
      </div>

      {loading ? (
        <div className="reader-paper reader-loading" role="status">
          Ouverture de la fiche…
        </div>
      ) : error ? (
        <div className="reader-paper reader-error" role="alert">
          <strong>Cette fiche n’est pas disponible pour le moment.</strong>
          <p>Le téléchargement reste disponible dès que le fichier est accessible.</p>
          <a className="button button-outline" href={`/guides/${selected.file}`} download>
            Télécharger la version hors ligne ↓
          </a>
        </div>
      ) : (
        <div className="reader-layout">
          <aside className="reader-sidebar" aria-label="Sommaire de la fiche">
            <div className="reader-sidebar-card">
              <p className="sidebar-kicker">SOMMAIRE</p>
              <nav className="reader-outline">
                {outline.length > 0 ? (
                  outline.map((block) => (
                    <a
                      className={block.kind === "subheading" ? "is-subheading" : ""}
                      href={`#${block.id}`}
                      key={block.id}
                    >
                      {formatText(block.text)}
                    </a>
                  ))
                ) : (
                  <span className="reader-outline-empty">Le sommaire sera enrichi avec la prochaine révision.</span>
                )}
              </nav>
            </div>
            <div className="reader-progress-card">
              <div className="progress-heading">
                <span>PROGRESSION SUR CET APPAREIL</span>
                <strong>{completed}/{checklist.length}</strong>
              </div>
              <div className="progress-track" aria-hidden="true">
                <span style={{ width: `${checklist.length ? (completed / checklist.length) * 100 : 0}%` }} />
              </div>
              <p>Les cases cochées restent privées et locales.</p>
            </div>
            <a className="reader-download" href={`/guides/${selected.file}`} download>
              Télécharger en TXT <span aria-hidden="true">↓</span>
            </a>
          </aside>

          <article className="reader-document" aria-label={`Fiche de route ${selected.title}`}>
            <div className="document-topline">
              <span>{selected.tag}</span>
              <span>Sans spoiler d’histoire</span>
            </div>
            {query && visibleBlocks.length === 0 ? (
              <div className="reader-empty-search">
                Aucun bloc ne contient « {search} ». Essaie un autre repère.
              </div>
            ) : null}
            {visibleBlocks.map((block) => {
              const text = formatText(block.text);
              if (block.kind === "heading") {
                return <h3 className="guide-heading" id={block.id} key={block.id}>{text}</h3>;
              }
              if (block.kind === "subheading") {
                return <h4 className="guide-subheading" id={block.id} key={block.id}>{text}</h4>;
              }
              if (block.kind === "bullet") {
                return <p className="guide-bullet" key={block.id}><span aria-hidden="true">→</span>{text}</p>;
              }
              if (block.kind === "check" && block.checkIndex !== undefined) {
                const isChecked = Boolean(checked[block.checkIndex]);
                return (
                  <label className={`guide-check ${isChecked ? "is-checked" : ""}`} key={block.id}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(block.checkIndex as number)}
                    />
                    <span className="guide-check-box" aria-hidden="true" />
                    <span>{text}</span>
                  </label>
                );
              }
              return <p className="guide-paragraph" key={block.id}>{text}</p>;
            })}
          </article>
        </div>
      )}
    </>
  );
}
