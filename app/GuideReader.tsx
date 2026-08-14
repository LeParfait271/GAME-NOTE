"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type ReaderGuide = {
  id: string;
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

type GuideMarkerKind =
  | "chest"
  | "save"
  | "missable"
  | "success"
  | "boss";

type GuideMarkerDefinition = {
  label: string;
  symbol: string;
};

const GUIDE_MARKERS: Record<GuideMarkerKind, GuideMarkerDefinition> = {
  chest: { label: "Coffre ou objet à récupérer", symbol: "▣" },
  save: { label: "Sauvegarde conseillée", symbol: "●" },
  missable: { label: "Élément manquable", symbol: "!" },
  success: { label: "Succès ou objectif", symbol: "★" },
  boss: { label: "Boss ou combat clé", symbol: "⚔" },
};

const GUIDE_MARKER_TOKENS =
  /^\s*((?:\[(?:COFFRE|SAUVEGARDE|MANQUABLE|SUCCES|BOSS)\]\s*)+)(.*)$/i;

const GUIDE_MARKER_GUIDE_IDS = new Set([
  "final-fantasy-vii-2013",
  "expedition-33",
  "octopath",
  "octopath-traveler-2",
]);
const GUIDE_COLLECTIBLE_HEADING =
  /^(?:coffres?|objets?|items?|materias?|collectibles?|recompenses?|journaux?|disques?|armes?|pictos?|gestrals?|competences?|capacites?|mimes?|petanks?)\b.*:\s*$/i;

type GuideTableData = {
  headers: string[];
  rows: string[][];
};

type GuideHeadingRole = "title" | "route" | "reference";
type GuideSectionRole = Exclude<GuideHeadingRole, "title">;

type GuideBlock = {
  id: string;
  kind: "heading" | "subheading" | "step" | "paragraph" | "bullet" | "check" | "table";
  text: string;
  headingLevel?: number;
  headingRole?: GuideHeadingRole;
  sectionRole?: GuideSectionRole;
  checkIndex?: number;
  checkScope?: "steam" | "route";
  markers?: GuideMarkerKind[];
  table?: GuideTableData;
};

type GuideOutlineGroup = {
  id: string;
  label: string;
  role: GuideSectionRole;
  anchor?: GuideBlock;
  items: GuideBlock[];
  synthetic?: boolean;
};

type GuideReaderProps = {
  selected: ReaderGuide;
  previousGuide?: ReaderGuide;
  nextGuide?: ReaderGuide;
  catalogPosition: number;
  catalogTotal: number;
  search: string;
  setSearch: (value: string) => void;
  guideSearchRef: RefObject<HTMLInputElement | null>;
  onBack: () => void;
  onNavigate: (id: string) => void;
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
  const letters = value.replace(/[^\p{L}]/gu, "");
  return (
    letters.length > 2 &&
    letters === letters.toLocaleUpperCase("fr") &&
    value.length <= 110
  );
};

const isNamedHeading = (value: string) =>
  /^\p{Lu}/u.test(value) &&
  !/:/.test(value) &&
  /^(?:partie|chapitre|acte|épisode|episode|route|ordre|objectif|garde-fous|garde fous|missables|conditions|checklist|vérification|verification|nettoyage|préparation|preparation|prologue|épilogue|epilogue|campagne|post-game|post game|dlc|succès|succes|fin|sources)\b/i.test(
    value,
  );

const isMajorGuideHeading = (value: string) =>
  /^(?:route chronologique|route\s+\d|phase\s+\d|prologue|acte\s+\d|fin de l'acte|post-game|post game|verso's drafts|annexe|objectif 100 %|verification croisee|compteurs retenus|comment lire|objectifs de la partie|compteurs a garder|sauvegardes et alertes|precautions importantes|regles de combat|route de nettoyage|lumiere, fin|choix de fin|checklist finale|nettoyage final|the journey for the dawn)\b/i.test(
    normalizeGuideText(value).replace(/^\[[^\]]+\]\s*/, ""),
  );

const isGuideReferenceHeading = (value: string) =>
  /^(?:legende|ce que signifie|choix de depart|regle a appliquer|les alertes|sauvegardes?(?: de| et)|verification|compteurs?|comment lire|objectifs?|regles de combat|precautions|sources|checklist|annexe|dossier|recits annexes|les \d+\s+recits annexes|seconde sauvegarde|route courte|tableau de verite|registre|cartes de rattrapage|controle final|inventaires? integ)\b/i.test(
    normalizeGuideText(value).replace(/^\[[^\]]+\]\s*/, ""),
  );

const isGuideRouteHeading = (value: string) =>
  /^(?:route chronologique|route\s+\d|phase\s+\d|prologue|acte\s+\d|chapitre\s+\d|fin de l'acte|post-game|post game|verso's drafts|jobs avances|preparation de la fin|porte de finis|the journey for the dawn)\b/i.test(
    normalizeGuideText(value).replace(/^\[[^\]]+\]\s*/, ""),
  );

const getGuideHeadingRole = (
  value: string,
  headingLevel: number,
  currentRole: GuideSectionRole,
  isDocumentTitle = false,
): GuideHeadingRole => {
  if (isDocumentTitle || headingLevel === 1) {
    return "title";
  }
  if (isGuideReferenceHeading(value)) {
    return "reference";
  }
  if (isGuideRouteHeading(value)) {
    return "route";
  }
  return headingLevel <= 2 ? "reference" : currentRole;
};

const uniqueGuideMarkers = (markers: GuideMarkerKind[]) =>
  Array.from(new Set(markers));

const extractGuideMarkers = (value: string) => {
  const match = value.match(GUIDE_MARKER_TOKENS);
  if (!match) {
    return { line: value, markers: [] as GuideMarkerKind[] };
  }

  const markers = (match[1].match(/\[(?:COFFRE|SAUVEGARDE|MANQUABLE|SUCCES|BOSS)\]/gi) ?? []).map((token) => {
    switch (token.slice(1, -1).toUpperCase()) {
      case "COFFRE":
        return "chest" as const;
      case "SAUVEGARDE":
        return "save" as const;
      case "MANQUABLE":
        return "missable" as const;
      case "SUCCES":
        return "success" as const;
      default:
        return "boss" as const;
    }
  });

  return {
    line: match[2].trim(),
    markers: uniqueGuideMarkers(markers),
  };
};

const splitInlineChecklistLine = (value: string) => {
  const firstCheck = value.search(/\[\s*\]\s+/);
  if (firstCheck < 0) return [value];

  const prefix = value
    .slice(0, firstCheck)
    .replace(/^\s*-\s*$/, "")
    .trim();
  const checks = value
    .slice(firstCheck)
    .split(/\s+(?=\[\s*\]\s+)/)
    .map((part) => part.replace(/[;]\s*$/, "").trim())
    .filter(Boolean);

  return prefix ? [prefix, ...checks] : checks;
};

const parseGuideTableRow = (value: string): string[] | null => {
  const trimmed = value.trim();
  if (!trimmed.includes("|")) {
    return null;
  }

  const cells = trimmed
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
  return cells.length >= 2 && cells.some(Boolean) ? cells : null;
};

const isGuideTableDivider = (value: string) => {
  const cells = parseGuideTableRow(value);
  return Boolean(
    cells?.length &&
      cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s/g, ""))),
  );
};

const inferGuideMarkers = (
  text: string,
  kind: GuideBlock["kind"],
  sectionMarker?: GuideMarkerKind,
) => {
  if (kind === "paragraph") {
    return [] as GuideMarkerKind[];
  }

  const normalized = normalizeGuideText(text);
  const markers: GuideMarkerKind[] = [];
  const negatedCollectible = /(?:aucun|aucune|pas de|sans|n['’]y a pas).*(?:coffre|objet|materia|collectible|recompense)/.test(normalized);
  const collectibleMention = /\b(?:coffres?|objets?|items?|materias?|collectibles?|recompenses?|journaux?|disques?|armes?|pictos?|teintures?|jetons?|coiffures?|tenues?|gestrals?|competences?|capacites?|mimes?|petanks?|records?|butins?|recompense)\b/.test(normalized);
  const headingCollectibleMention = /\b(?:coffres?|objets?|items?|materias?|collectibles?|recompenses?|journaux?|disques?|armes?|pictos?|teintures?|jetons?|coiffures?|tenues?|competences?|capacites?|records?|butins?|gestrals?\s+(?:perdus?|lost))\b/.test(normalized);

  if (sectionMarker === "chest" || (!negatedCollectible && (kind === "heading" || kind === "subheading" ? headingCollectibleMention : collectibleMention))) {
    markers.push("chest");
  }
  if (/\b(?:sauvegarde|sauvegarder|save)\b/.test(normalized)) {
    markers.push("save");
  }
  if (/\b(?:missable|manquable|manquables|point de non-retour)\b/.test(normalized)) {
    markers.push("missable");
  }
  if (/\b(?:succ[eè]s|achievement|troph[eè]e|trophy)\b/.test(normalized)) {
    markers.push("success");
  }
  if (/\bboss\b/.test(normalized)) {
    markers.push("boss");
  }

  return uniqueGuideMarkers(markers);
};

const getGuideSearchText = (block: GuideBlock) =>
  [
    block.text,
    ...(block.markers ?? []).map((marker) => GUIDE_MARKERS[marker].label),
  ].join(" ");

const GuideMarkerRow = ({ markers }: { markers?: GuideMarkerKind[] }) => {
  if (!markers?.length) {
    return null;
  }

  return (
    <span className="guide-marker-row">
      {markers.map((marker) => {
        const definition = GUIDE_MARKERS[marker];
        return (
          <span
            aria-label={definition.label}
            className={`guide-marker guide-marker-${marker}`}
            key={marker}
            role="img"
            title={definition.label}
          >
            {definition.symbol}
          </span>
        );
      })}
    </span>
  );
};

const parseGuide = (text: string, markersEnabled: boolean): GuideBlock[] => {
  const blocks: GuideBlock[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let paragraphMarkers: GuideMarkerKind[] = [];
  let checkIndex = 0;
  let finalChecklistMode = false;
  let sectionMarker: GuideMarkerKind | undefined;
  let lastStructuredKind: GuideBlock["kind"] | undefined;
  let currentHeadingRole: GuideSectionRole = "reference";

  const pushBlock = (
    kind: GuideBlock["kind"],
    value: string,
    explicitMarkers: GuideMarkerKind[] = [],
    blockCheckIndex?: number,
    blockCheckScope?: "steam" | "route",
    blockHeadingLevel?: number,
    blockHeadingRole?: GuideHeadingRole,
    blockTable?: GuideTableData,
  ) => {
    const markers = markersEnabled
      ? uniqueGuideMarkers([
          ...explicitMarkers,
          ...inferGuideMarkers(value, kind, sectionMarker),
        ])
      : [];
    const sectionRole = blockHeadingRole === "title"
      ? undefined
      : blockHeadingRole === "route" || blockHeadingRole === "reference"
        ? blockHeadingRole
        : currentHeadingRole;
    blocks.push({
      id: makeBlockId(value, blocks.length),
      kind,
      text: value,
      ...(blockHeadingLevel === undefined ? {} : { headingLevel: blockHeadingLevel }),
      ...(blockHeadingRole === undefined ? {} : { headingRole: blockHeadingRole }),
      ...(sectionRole === undefined ? {} : { sectionRole }),
      ...(blockCheckIndex === undefined ? {} : { checkIndex: blockCheckIndex }),
      ...(blockCheckScope === undefined ? {} : { checkScope: blockCheckScope }),
      ...(markers.length ? { markers } : {}),
      ...(blockTable === undefined ? {} : { table: blockTable }),
    });
  };

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    const value = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (value) {
      pushBlock("paragraph", value, paragraphMarkers);
    }
    paragraph = [];
    paragraphMarkers = [];
  };

  const sourceLines = markersEnabled ? lines.flatMap(splitInlineChecklistLine) : lines;
  let tableHeader: string[] | undefined;
  let tableRows: string[][] = [];
  let tableMarkers: GuideMarkerKind[] = [];

  const flushTable = () => {
    if (tableHeader && tableRows.length > 0) {
      const table = { headers: tableHeader, rows: tableRows };
      pushBlock(
        "table",
        [table.headers, ...table.rows].flat().join(" | "),
        tableMarkers,
        undefined,
        undefined,
        undefined,
        undefined,
        table,
      );
    }
    tableHeader = undefined;
    tableRows = [];
    tableMarkers = [];
  };

  for (let lineIndex = 0; lineIndex < sourceLines.length; lineIndex += 1) {
    const rawLine = sourceLines[lineIndex];
    const extracted = markersEnabled
      ? extractGuideMarkers(rawLine.trim())
      : { line: rawLine.trim(), markers: [] as GuideMarkerKind[] };
    const line = extracted.line;
    const lineMarkers = extracted.markers;

    const tableRow = parseGuideTableRow(line);
    if (tableHeader) {
      if (tableRow && !isGuideTableDivider(line)) {
        tableRows.push(tableRow);
        tableMarkers = uniqueGuideMarkers([...tableMarkers, ...lineMarkers]);
        continue;
      }
      flushTable();
    }

    const nextLine = sourceLines[lineIndex + 1]?.trim() ?? "";
    if (tableRow && isGuideTableDivider(nextLine)) {
      flushParagraph();
      tableHeader = tableRow;
      tableRows = [];
      tableMarkers = lineMarkers;
      lineIndex += 1;
      lastStructuredKind = undefined;
      continue;
    }

    if (!line || /^[-=_]{6,}$/.test(line)) {
      flushParagraph();
      lastStructuredKind = undefined;
      continue;
    }

    if (lineMarkers.length) {
      flushParagraph();
      lastStructuredKind = undefined;
    }

    const markdownHeading = line.match(/^(#{1,3})\s+(.+)$/);
    if (markdownHeading) {
      flushParagraph();
      const headingLevel = markdownHeading[1].length;
      const headingKind = headingLevel >= 3 ? "subheading" : "heading";
      const headingRole = getGuideHeadingRole(
        markdownHeading[2].trim(),
        headingLevel,
        currentHeadingRole,
      );
      pushBlock(
        headingKind,
        markdownHeading[2].trim(),
        lineMarkers,
        undefined,
        undefined,
        headingLevel,
        headingRole,
      );
      if (headingRole !== "title") {
        currentHeadingRole = headingRole;
      }
      lastStructuredKind = undefined;
      continue;
    }

    const checklist = line.match(/^(?:[-*]\s*)?\[\s*\]\s+(.+)$/);
    if (checklist && (finalChecklistMode || markersEnabled)) {
      flushParagraph();
      pushBlock(
        "check",
        checklist[1].trim(),
        lineMarkers,
        checkIndex++,
        finalChecklistMode ? "steam" : "route",
      );
      lastStructuredKind = "check";
      continue;
    }

    const bullet = line.match(/^(?:[-*•])\s+(.+)$/u);
    if (bullet) {
      flushParagraph();
      pushBlock("bullet", bullet[1].trim(), lineMarkers);
      lastStructuredKind = "bullet";
      continue;
    }

    const headingText = line.replace(/^\d+(?:\.\d+)*[.)]\s+/, "").trim();
    const numberedHeading = /^\d+(?:\.\d+)*[.)]\s+/.test(line);
    const numberedSection = numberedHeading && /^(?:acte|chapitre|partie|episode|épisode|route|prologue|epilogue|épilogue|annexe|fin|post-game|dlc)\b/i.test(headingText);
    const collectibleHeading = GUIDE_COLLECTIBLE_HEADING.test(line);
    const heading =
      numberedSection ||
      isUppercaseHeading(line) ||
      isNamedHeading(line) ||
      collectibleHeading;

    if ((heading || numberedHeading) && line.length <= 120) {
      flushParagraph();
      const isDocumentTitle = blocks.length === 0;
      const provisionalHeadingLevel = isDocumentTitle ? 1 : blocks.length < 2 ? 1 : 2;
      const headingRole = getGuideHeadingRole(
        line,
        provisionalHeadingLevel,
        currentHeadingRole,
        isDocumentTitle,
      );
      if (/(?:checklist|liste complète|liste complete)/i.test(line)) {
        finalChecklistMode = true;
      } else if (
        finalChecklistMode &&
        /^(?:verification|vérification|sources|fin du guide)\b/i.test(line)
      ) {
        finalChecklistMode = false;
      }
      const kind = numberedHeading && !numberedSection
        ? "step"
        : numberedSection || isMajorGuideHeading(line) || headingRole === "route" || headingRole === "title"
          ? "heading"
          : "subheading";
      const value = numberedHeading
        ? `${line.match(/^\d+(?:\.\d+)*[.)]/)?.[0] ?? ""} ${headingText}`
        : line;
      pushBlock(
        kind,
        value,
        lineMarkers,
        undefined,
        undefined,
        kind === "step" ? undefined : headingRole === "title" ? 1 : kind === "heading" ? 2 : 3,
        headingRole,
      );
      if (headingRole !== "title") {
        currentHeadingRole = headingRole;
      }
      if (kind === "heading" || kind === "subheading") {
        sectionMarker = markersEnabled && collectibleHeading ? "chest" : undefined;
      }
      lastStructuredKind = undefined;
      continue;
    }

    if (lastStructuredKind === "bullet" || lastStructuredKind === "check" || lastStructuredKind === "step") {
      const previous = blocks[blocks.length - 1];
      if (previous?.kind === lastStructuredKind) {
        previous.text = `${previous.text} ${line}`.replace(/\s+/g, " ").trim();
        if (markersEnabled) {
          previous.markers = uniqueGuideMarkers([
            ...(previous.markers ?? []),
            ...lineMarkers,
            ...inferGuideMarkers(previous.text, previous.kind, sectionMarker),
          ]);
        }
        continue;
      }
    }

    paragraphMarkers = uniqueGuideMarkers([...paragraphMarkers, ...lineMarkers]);
    paragraph.push(line);
    lastStructuredKind = undefined;
  }

  flushTable();
  flushParagraph();

  const bodyKinds = new Set<GuideBlock["kind"]>([
    "paragraph",
    "bullet",
    "check",
    "step",
    "table",
  ]);
  const visibleBlocks = blocks.filter((block, index) => {
    if (block.kind !== "heading" && block.kind !== "subheading") {
      return true;
    }

    const level = block.headingLevel ?? (block.kind === "heading" ? 2 : 3);
    for (let cursor = index + 1; cursor < blocks.length; cursor += 1) {
      const next = blocks[cursor];
      if (next.kind === "heading" || next.kind === "subheading") {
        const nextLevel = next.headingLevel ?? (next.kind === "heading" ? 2 : 3);
        if (nextLevel <= level) {
          break;
        }
      }
      if (bodyKinds.has(next.kind)) {
        return true;
      }
    }

    return false;
  });

  return visibleBlocks.map((block, index) => ({
    ...block,
    id: makeBlockId(block.text, index),
  }));
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

const readReadingProgress = (guideId: string) => {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const value = Number(window.localStorage.getItem(`game-note-reading-${guideId}`));
    return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
  } catch {
    return 0;
  }
};

const formatText = (text: string) =>
  text
    .replace(/^\*\*(.+)\*\*$/, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`(.+?)`/g, "$1");

const splitGuideStep = (value: string) => {
  const match = value.match(/^(\d+(?:\.\d+)*[.)])\s+(.+)$/);
  return match
    ? { number: match[1], text: match[2] }
    : { number: "→", text: value };
};

const getGuideOutlineGroupLabel = (value: string) => {
  const clean = formatText(value).replace(/^\[[^\]]+\]\s*/, "").trim();
  const dashPrefix = clean.match(/^(.{3,42}?)\s+(?:-|\u2013|\u2014)\s+/u)?.[1]?.trim();
  if (dashPrefix) return dashPrefix;
  const colonPrefix = clean.match(/^(.{3,42}?):\s+/)?.[1]?.trim();
  if (colonPrefix) return colonPrefix;
  return clean.length > 42 ? `${clean.slice(0, 39).trimEnd()}\u2026` : clean;
};

const buildGuideOutlineGroups = (blocks: GuideBlock[]) => {
  const headings = blocks.filter(
    (block) =>
      (block.kind === "heading" || block.kind === "subheading") &&
      (block.headingLevel ?? (block.kind === "heading" ? 2 : 3)) > 1,
  );
  const groups: GuideOutlineGroup[] = [];
  let currentGroup: GuideOutlineGroup | undefined;

  for (const block of headings) {
    const role: GuideSectionRole = block.headingRole === "route" ? "route" : "reference";
    if (block.kind === "heading") {
      currentGroup = {
        id: block.id,
        label: block.text,
        role,
        anchor: block,
        items: [],
      };
      groups.push(currentGroup);
      continue;
    }

    if (currentGroup && currentGroup.role === role) {
      currentGroup.items.push(block);
      continue;
    }

    const label = getGuideOutlineGroupLabel(block.text);
    let syntheticGroup = groups.find(
      (group) => group.synthetic && group.label === label,
    );
    if (!syntheticGroup) {
      syntheticGroup = {
        id: `outline-${normalizeGuideText(label)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}`,
        label,
        role,
        items: [],
        synthetic: true,
      };
      groups.push(syntheticGroup);
    }
    syntheticGroup.items.push(block);
  }

  return groups;
};

const splitGuideLanes = (blocks: GuideBlock[]) => {
  const isRouteBlock = (block: GuideBlock) =>
    block.sectionRole === "route" || block.headingRole === "route";
  const firstRouteIndex = blocks.findIndex(isRouteBlock);
  if (firstRouteIndex < 0) {
    return {
      prelude: blocks,
      route: [] as GuideBlock[],
      reference: [] as GuideBlock[],
    };
  }

  return {
    prelude: blocks.slice(0, firstRouteIndex),
    route: blocks.filter(isRouteBlock),
    reference: blocks.slice(firstRouteIndex).filter((block) => !isRouteBlock(block)),
  };
};

export default function GuideReader({
  selected,
  previousGuide,
  nextGuide,
  catalogPosition,
  catalogTotal,
  search,
  setSearch,
  guideSearchRef,
  onBack,
  onNavigate,
}: GuideReaderProps) {
  const [guideText, setGuideText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [readingProgress, setReadingProgress] = useState(0);
  const [savedReadingProgress, setSavedReadingProgress] = useState(0);
  const [activeSearchResult, setActiveSearchResult] = useState(0);
  const [activeOutlineId, setActiveOutlineId] = useState("");
  const [activeRouteId, setActiveRouteId] = useState("");
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [outlineGroupsOpen, setOutlineGroupsOpen] = useState<Record<string, boolean>>({});
  const resultRefs = useRef<Array<HTMLElement | null>>([]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setChecked(readChecklist(selected.file));
    const savedProgress = readReadingProgress(selected.file);
    setReadingProgress(savedProgress);
    setSavedReadingProgress(savedProgress);
    setActiveOutlineId("");
    setActiveRouteId("");
    setOutlineGroupsOpen({});
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

  useEffect(() => {
    if (loading || error) return;

    let frame: number | null = null;
    const updateReadingProgress = () => {
      const maximumScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maximumScroll > 0
        ? Math.min(1, Math.max(0, window.scrollY / maximumScroll))
        : 0;
      setReadingProgress(nextProgress);
      const routeHeadings = Array.from(
        document.querySelectorAll<HTMLElement>(".guide-route-lane .guide-heading-row-route"),
      );
      const outlineTargets = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".guide-route-lane .guide-heading-row-route, .guide-route-lane .guide-subheading",
        ),
      );
      const nextOutlineTarget = outlineTargets.reduce<HTMLElement | undefined>(
        (current, target) =>
          target.getBoundingClientRect().top <= 190 ? target : current,
        outlineTargets[0],
      );
      const nextOutlineId = nextOutlineTarget?.id ?? "";
      setActiveOutlineId((current) => current === nextOutlineId ? current : nextOutlineId);
      const nextRouteHeading = routeHeadings.reduce<HTMLElement | undefined>(
        (current, heading) =>
          heading.getBoundingClientRect().top <= 190 ? heading : current,
        routeHeadings[0],
      );
      const nextRouteId = nextRouteHeading?.id ?? "";
      setActiveRouteId((current) => current === nextRouteId ? current : nextRouteId);
      try {
        if (nextProgress > 0.02) {
          setSavedReadingProgress(nextProgress);
          window.localStorage.setItem(
            `game-note-reading-${selected.file}`,
            String(Math.round(nextProgress * 1000) / 1000),
          );
        }
      } catch {
        // La fiche reste utilisable si le stockage local est indisponible.
      }
    };
    const handleScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateReadingProgress();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [error, loading, selected.file]);

  const markersEnabled = GUIDE_MARKER_GUIDE_IDS.has(selected.id);
  const blocks = useMemo(
    () => parseGuide(guideText, markersEnabled),
    [guideText, markersEnabled],
  );
  const checklist = useMemo(
    () => blocks.filter((block) => block.kind === "check" && block.checkScope === "steam"),
    [blocks],
  );
  const query = normalizeGuideText(search.trim());
  const matchingBlocks = useMemo(
    () => blocks.filter((block) => query && normalizeGuideText(getGuideSearchText(block)).includes(query)),
    [blocks, query],
  );
  const visibleBlocks = useMemo(() => {
    if (!query) {
      return blocks;
    }

    const matchingIndexes = blocks.reduce<number[]>((indexes, block, index) => {
      if (normalizeGuideText(getGuideSearchText(block)).includes(query)) {
        indexes.push(index);
      }
      return indexes;
    }, []);
    const contextIndexes = new Set(matchingIndexes);

    matchingIndexes.forEach((index) => {
      for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
        if (blocks[cursor].kind === "heading" || blocks[cursor].kind === "subheading") {
          contextIndexes.add(cursor);
          break;
        }
      }
    });

    return blocks.filter((_, index) => contextIndexes.has(index));
  }, [blocks, query]);
  const guideLanes = splitGuideLanes(blocks);
  const displayBlocks = query
    ? visibleBlocks
    : [...guideLanes.prelude, ...guideLanes.route, ...guideLanes.reference];
  const visibleMatchIndexes = displayBlocks
    .map((block, index) => (query && normalizeGuideText(getGuideSearchText(block)).includes(query) ? index : -1))
    .filter((index) => index >= 0);
  const outlineGroups = useMemo(() => buildGuideOutlineGroups(blocks), [blocks]);
  const routeOutlineGroups = useMemo(
    () => outlineGroups.filter((group) => group.role === "route"),
    [outlineGroups],
  );
  const referenceOutlineGroups = useMemo(
    () => outlineGroups.filter((group) => group.role === "reference"),
    [outlineGroups],
  );
  const activeRouteIndex = routeOutlineGroups.findIndex(
    (group) => group.anchor?.id === activeRouteId,
  );
  const currentRouteIndex = activeRouteIndex >= 0 ? activeRouteIndex : routeOutlineGroups.length > 0 ? 0 : -1;
  const currentRouteGroup = currentRouteIndex >= 0 ? routeOutlineGroups[currentRouteIndex] : undefined;
  const markerKinds = useMemo(
    () => uniqueGuideMarkers(blocks.flatMap((block) => block.markers ?? [])),
    [blocks],
  );
  const completed = checklist.filter(
    (block) => block.checkIndex !== undefined && checked[block.checkIndex],
  ).length;
  const majorSectionCount = routeOutlineGroups.length;
  const toggleCheck = (index: number) => {
    setChecked((current) => {
      const next = { ...current, [index]: !current[index] };
      try {
        window.localStorage.setItem(
          `game-note-checklist-${selected.file}`,
          JSON.stringify(next),
        );
      } catch {
        // La fiche reste utilisable si le stockage local est indisponible.
      }
      return next;
    });
  };

  useEffect(() => {
    const targetIndex = visibleMatchIndexes[activeSearchResult];
    if (targetIndex === undefined) return;
    resultRefs.current[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeSearchResult, visibleMatchIndexes]);

  const resetChecklist = () => {
    setChecked({});
    try {
      window.localStorage.removeItem(`game-note-checklist-${selected.file}`);
    } catch {
      // La fiche reste utilisable si le stockage local est indisponible.
    }
  };

  const resumeReading = () => {
    const maximumScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maximumScroll <= 0 || savedReadingProgress <= 0.02) return;
    window.scrollTo({
      top: savedReadingProgress * maximumScroll,
      behavior: "smooth",
    });
  };

  const renderHighlightedText = (value: string) => {
    if (!query) return formatText(value);
    const normalizedValue = normalizeGuideText(value);
    const start = normalizedValue.indexOf(query);
    if (start < 0) return formatText(value);
    let normalizedCursor = 0;
    let valueStart = -1;
    let valueEnd = -1;
    for (let index = 0; index < value.length; index += 1) {
      const normalizedCharacter = normalizeGuideText(value[index]);
      if (normalizedCharacter) {
        if (normalizedCursor === start) valueStart = index;
        normalizedCursor += normalizedCharacter.length;
        if (normalizedCursor >= start + query.length) {
          valueEnd = index + 1;
          break;
        }
      }
    }
    if (valueStart < 0 || valueEnd < 0) return formatText(value);
    return <>{formatText(value.slice(0, valueStart))}<mark>{formatText(value.slice(valueStart, valueEnd))}</mark>{formatText(value.slice(valueEnd))}</>;
  };

  const renderOutlineGroup = (group: GuideOutlineGroup, groupIndex: number) => (
    <section
      className={`reader-outline-group reader-outline-group-${group.role}${group.synthetic ? " is-generated" : ""}${group.anchor?.id === activeRouteId ? " is-active" : ""}`}
      key={group.id}
    >
      {group.anchor ? (
        <a
          className="reader-outline-major"
          href={`#${group.anchor.id}`}
          aria-current={group.anchor.id === activeRouteId ? "step" : undefined}
        >
          <span className="reader-outline-major-index" aria-hidden="true">
            {String(groupIndex + 1).padStart(2, "0")}
          </span>
          <span className="reader-outline-major-copy">
            <GuideMarkerRow markers={group.anchor.markers} />
            <span>{formatText(group.anchor.text)}</span>
          </span>
        </a>
      ) : (
        <div className="reader-outline-group-heading">
          <GuideMarkerRow markers={group.items[0]?.markers} />
          <span>{formatText(group.label)}</span>
          <span className="reader-outline-group-count">{group.items.length} zones</span>
        </div>
      )}
      {group.items.length > 0 ? (
        <details
          className="reader-outline-details"
          open={outlineGroupsOpen[group.id] ?? (groupIndex === 0 || group.items.length <= 4)}
          onToggle={(event) => {
            // React peut invalider l evenement avant l execution du
            // callback de mise a jour ; lire `open` immediatement.
            const isOpen = event.currentTarget.open;
            setOutlineGroupsOpen((current) => ({
              ...current,
              [group.id]: isOpen,
            }));
          }}
        >
          <summary>
            <span>{group.synthetic ? "Voir les zones" : "Sous-sections"}</span>
            <span>{group.items.length}</span>
          </summary>
          <div className="reader-outline-items">
            {group.items.map((item) => (
              <a
                className={`reader-outline-item${item.id === activeOutlineId ? " is-active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                aria-current={item.id === activeOutlineId ? "location" : undefined}
              >
                <GuideMarkerRow markers={item.markers} />
                <span>{formatText(item.text)}</span>
              </a>
            ))}
          </div>
        </details>
      ) : null}
    </section>
  );

  return (
    <>
      <div className="reader-cover">
        <div className="reader-cover-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selected.artworkUrl ?? guideHeaderUrl(selected.steamAppId)}
            alt={`Illustration officielle de ${selected.title}`}
            width={920}
            height={430}
            onError={(event) => {
              const image = event.currentTarget;
              if (image.dataset.fallbackApplied === "true") return;
              image.dataset.fallbackApplied = "true";
              image.src = "/images/cards/game-note-card-route.png";
            }}
          />
          <span className={`reader-cover-accent reader-cover-accent-${selected.accent}`} />
        </div>
        <div className="reader-cover-copy">
          <button className="reader-backlink" type="button" onClick={onBack}>← Toutes les soluces</button>
          <p className="kicker"><span>SOLUCE</span><span>{selected.count}</span></p>
          <h1>{selected.title}</h1>
          <p>{selected.description}</p>
          <div className="reader-badges">
            {selected.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="reader-cover-facts" aria-label="Repères de la fiche">
            <div>
              <strong>{majorSectionCount || "—"}</strong>
              <span>séquences</span>
            </div>
            <div>
              <strong>{checklist.length || "—"}</strong>
              <span>objectifs Steam</span>
            </div>
            <div>
              <strong>{catalogPosition ? `${catalogPosition}/${catalogTotal}` : "—"}</strong>
              <span>position A–Z</span>
            </div>
          </div>
          {savedReadingProgress > 0.02 ? (
            <button className="reader-resume" type="button" onClick={resumeReading}>
              Reprendre la lecture <span>{Math.round(savedReadingProgress * 100)} %</span>
            </button>
          ) : null}
        </div>
        <div className="reader-cover-alert">
          <span className="reader-alert-mark" aria-hidden="true">!</span>
          <div>
            <strong>Repère à ne pas rater</strong>
            <p>{selected.highlight}</p>
            <span className="reader-alert-note">À valider avant de continuer</span>
          </div>
        </div>
      </div>

      <nav className="reader-neighbors" aria-label="Naviguer entre les soluces">
        {previousGuide ? (
          <button
            className="reader-neighbor reader-neighbor-prev"
            type="button"
            aria-label={`Ouvrir la soluce précédente : ${previousGuide.title}`}
            onClick={() => onNavigate(previousGuide.id)}
          >
            <span>Précédente</span>
            <strong>← {previousGuide.title}</strong>
          </button>
        ) : (
          <span className="reader-neighbor reader-neighbor-muted">Début de la bibliothèque</span>
        )}
        {nextGuide ? (
          <button
            className="reader-neighbor reader-neighbor-next"
            type="button"
            aria-label={`Ouvrir la soluce suivante : ${nextGuide.title}`}
            onClick={() => onNavigate(nextGuide.id)}
          >
            <span>Suivante</span>
            <strong>{nextGuide.title} →</strong>
          </button>
        ) : (
          <span className="reader-neighbor reader-neighbor-muted reader-neighbor-end">Dernière fiche</span>
        )}
      </nav>

      <div className="reader-tools">
        <div className="reader-tools-copy">
          <span className="reader-tool-kicker">FICHE ACTIVE</span>
          <label htmlFor="guide-search">Rechercher dans la soluce</label>
        </div>
        {!query && currentRouteGroup?.anchor ? (
          <div className="reader-current-route" aria-live="polite">
            <span className="reader-current-route-kicker">{activeRouteId ? "EN COURS" : "À SUIVRE"}</span>
            <strong>{formatText(currentRouteGroup.anchor.text)}</strong>
            <span>{String(currentRouteIndex + 1).padStart(2, "0")} / {routeOutlineGroups.length}</span>
          </div>
        ) : null}
        <div className="search-wrap">
          <span aria-hidden="true">⌕</span>
          <input
            id="guide-search"
            ref={guideSearchRef}
            type="search"
            placeholder="ex. succès, coffre, chapitre, missable…"
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
            ? `${matchingBlocks.length} résultat${matchingBlocks.length > 1 ? "s" : ""}`
            : checklist.length
              ? `${completed}/${checklist.length} objectifs Steam cochés`
              : "Lecture complète"}
        </span>
        <span className="reader-reading-status" aria-live="polite">
          {readingProgress >= 0.98 ? "Lecture terminée" : `Lecture ${Math.round(readingProgress * 100)} %`}
        </span>
        {query && visibleMatchIndexes.length > 0 ? (
          <div className="reader-search-nav" aria-label="Navigation des résultats">
            <button type="button" onClick={() => setActiveSearchResult((current) => (current - 1 + visibleMatchIndexes.length) % visibleMatchIndexes.length)} aria-label="Résultat précédent">↑</button>
            <span>{activeSearchResult + 1}/{visibleMatchIndexes.length}</span>
            <button type="button" onClick={() => setActiveSearchResult((current) => (current + 1) % visibleMatchIndexes.length)} aria-label="Résultat suivant">↓</button>
          </div>
        ) : null}
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
            <div className={`reader-sidebar-card reader-outline-card${outlineOpen ? " is-open" : ""}`}>
              <p className="sidebar-kicker reader-outline-title">SOMMAIRE</p>
              <button
                className="reader-outline-toggle"
                type="button"
                aria-expanded={outlineOpen}
                onClick={() => setOutlineOpen((current) => !current)}
              >
                <span>SOMMAIRE</span>
                <span>{routeOutlineGroups.length} séquences · {referenceOutlineGroups.length} dossiers</span>
                <strong aria-hidden="true">{outlineOpen ? "−" : "+"}</strong>
              </button>
              <nav className="reader-outline">
                {outlineGroups.length > 0 ? (
                  <>
                    {routeOutlineGroups.length > 0 ? <p className="reader-outline-category">PARCOURS CHRONOLOGIQUE</p> : null}
                    {routeOutlineGroups.map(renderOutlineGroup)}
                    {referenceOutlineGroups.length > 0 ? <p className="reader-outline-category reader-outline-category-reference">DOSSIERS DE RÉFÉRENCE</p> : null}
                    {referenceOutlineGroups.map(renderOutlineGroup)}
                  </>
                ) : (
                  <span className="reader-outline-empty">Le sommaire sera enrichi avec la prochaine révision.</span>
                )}
              </nav>
            </div>
            <div className="reader-progress-card">
              <div className="progress-heading">
                <span>OBJECTIFS STEAM</span>
                <strong>{completed}/{checklist.length}</strong>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Progression des objectifs Steam"
                aria-valuemin={0}
                aria-valuemax={checklist.length}
                aria-valuenow={completed}
              >
                <span style={{ width: `${checklist.length ? (completed / checklist.length) * 100 : 0}%` }} />
              </div>
              <p>Les objectifs cochés restent privés sur cet appareil.</p>
              {completed > 0 ? <button className="reader-reset" type="button" onClick={resetChecklist}>Réinitialiser la trace</button> : null}
            </div>
            <a className="reader-download" href={`/guides/${selected.file}`} download>
              Fiche hors ligne <span aria-hidden="true">↓</span>
            </a>
            <p className="reader-sidebar-note">Version texte disponible pour jouer sans connexion.</p>
          </aside>

          <article className="reader-document" aria-label={`Soluce ${selected.title}`}>
            <header className="reader-document-intro">
              <div>
                <p className="document-kicker">FEUILLE DE ROUTE INTERACTIVE</p>
                <h2>Le parcours, au bon moment</h2>
                <p>Commence par le premier titre, avance dans l&apos;ordre et utilise le sommaire pour revenir rapidement à une zone.</p>
                {markerKinds.length > 0 ? (
                  <div className="guide-marker-legend" aria-label="Légende des repères">
                    <span className="guide-marker-legend-title">REPÈRES</span>
                    {markerKinds.map((marker) => (
                      <span className="guide-marker-legend-item" key={marker}>
                        <GuideMarkerRow markers={[marker]} />
                        <span>{GUIDE_MARKERS[marker].label}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="reader-document-seal" aria-label={`${checklist.length || 0} objectifs Steam suivis`}>
                <span>STEAM</span>
                <strong>{checklist.length || "—"}</strong>
                <small>objectifs</small>
              </div>
            </header>
            {query && displayBlocks.length === 0 ? (
              <div className="reader-empty-search">
                Aucun bloc ne contient « {search} ». Essaie un autre repère.
              </div>
            ) : null}
            {(() => {
              const displayIndexById = new Map(displayBlocks.map((block, index) => [block.id, index]));
              let visibleHeadingNumber = 0;
              const renderBlock = (block: GuideBlock) => {
                const visibleIndex = displayIndexById.get(block.id) ?? 0;
                if (block.headingRole === "title") {
                  return null;
                }
                const highlighted = renderHighlightedText(block.text);
                if (block.kind === "heading") {
                  const headingRole = block.headingRole ?? "reference";
                  const isRouteHeading = headingRole === "route";
                  if (isRouteHeading) {
                    visibleHeadingNumber += 1;
                  }
                  const number = String(visibleHeadingNumber).padStart(2, "0");
                  const headingLabel = headingRole === "route"
                    ? `SÉQUENCE ${number}`
                    : headingRole === "title"
                      ? "FICHE"
                      : "DOSSIER DE RÉFÉRENCE";
                  const headingIndex = headingRole === "route"
                    ? number
                    : headingRole === "title"
                      ? "G"
                      : "R";
                  return (
                    <div className={`guide-heading-row guide-heading-row-${headingRole}`} id={block.id} key={block.id} ref={(element) => { resultRefs.current[visibleIndex] = element; }}>
                      <span className="guide-heading-index" aria-hidden="true">{headingIndex}</span>
                      <div className="guide-heading-copy">
                        <p className="guide-heading-eyebrow">{headingLabel}</p>
                        <GuideMarkerRow markers={block.markers} />
                        <h3 className="guide-heading">{highlighted}</h3>
                        {isRouteHeading && routeOutlineGroups.find((group) => group.anchor?.id === block.id) ? (
                          <span className="guide-heading-meta">
                            {(() => {
                              const count = routeOutlineGroups.find((group) => group.anchor?.id === block.id)?.items.length ?? 0;
                              return `${count} sous-section${count > 1 ? "s" : ""} à vérifier`;
                            })()}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                }
                if (block.kind === "subheading") {
                  return <h4 className="guide-subheading" id={block.id} key={block.id} ref={(element) => { resultRefs.current[visibleIndex] = element; }}><span className="guide-subheading-content"><GuideMarkerRow markers={block.markers} /><span>{highlighted}</span></span></h4>;
                }
                if (block.kind === "step") {
                  const step = splitGuideStep(block.text);
                  return (
                    <div className="guide-step" id={block.id} key={block.id} ref={(element) => { resultRefs.current[visibleIndex] = element; }}>
                      <span className="guide-step-index" aria-hidden="true">{step.number}</span>
                      <p className="guide-step-copy"><GuideMarkerRow markers={block.markers} />{renderHighlightedText(step.text)}</p>
                    </div>
                  );
                }
                if (block.kind === "bullet") {
                  return <p className="guide-bullet" key={block.id} ref={(element) => { resultRefs.current[visibleIndex] = element; }}><span className="guide-bullet-arrow" aria-hidden="true">→</span><span className="guide-bullet-copy"><GuideMarkerRow markers={block.markers} />{highlighted}</span></p>;
                }
                if (block.kind === "check" && block.checkIndex !== undefined) {
                  const isChecked = Boolean(checked[block.checkIndex]);
                  return (
                    <label className={`guide-check ${isChecked ? "is-checked" : ""}`} key={block.id} ref={(element) => { resultRefs.current[visibleIndex] = element; }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(block.checkIndex as number)}
                      />
                      <span className="guide-check-box" aria-hidden="true" />
                      <span className="guide-check-copy"><GuideMarkerRow markers={block.markers} />{highlighted}</span>
                    </label>
                  );
                }
                if (block.kind === "table" && block.table) {
                  const columnCount = Math.max(
                    block.table.headers.length,
                    ...block.table.rows.map((row) => row.length),
                  );
                  const headers = Array.from(
                    { length: columnCount },
                    (_, index) => block.table?.headers[index] ?? `Colonne ${index + 1}`,
                  );
                  return (
                    <div
                      className="guide-table-wrap"
                      id={block.id}
                      key={block.id}
                      ref={(element) => { resultRefs.current[visibleIndex] = element; }}
                    >
                      <table className="guide-table">
                        <caption className="sr-only">{headers.join(" · ")}</caption>
                        <thead>
                          <tr>
                            {headers.map((header, index) => <th key={`${block.id}-header-${index}`} scope="col">{renderHighlightedText(header)}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row, rowIndex) => (
                            <tr key={`${block.id}-row-${rowIndex}`}>
                              {headers.map((header, cellIndex) => (
                                <td data-label={header} key={`${block.id}-cell-${rowIndex}-${cellIndex}`}>
                                  {renderHighlightedText(row[cellIndex] ?? "")}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return <p className="guide-paragraph" key={block.id} ref={(element) => { resultRefs.current[visibleIndex] = element; }}><GuideMarkerRow markers={block.markers} />{highlighted}</p>;
              };
              const renderBlocks = (items: GuideBlock[]) => items.map(renderBlock);

              if (query) {
                return <div className="guide-search-results">{renderBlocks(displayBlocks)}</div>;
              }

              return (
                <>
                  {guideLanes.prelude.length > 0 ? (
                    <details className="guide-lane-details guide-prelude-panel">
                      <summary>
                        <span className="guide-lane-summary-copy">
                          <span className="guide-lane-kicker">AVANT DE COMMENCER</span>
                          <strong>Règles, alertes et sauvegardes</strong>
                          <small>Les repères indispensables avant la première séquence</small>
                        </span>
                        <span className="guide-lane-summary-action">Ouvrir <b aria-hidden="true">+</b></span>
                      </summary>
                      <div className="guide-lane-content">{renderBlocks(guideLanes.prelude)}</div>
                    </details>
                  ) : null}
                  {guideLanes.route.length > 0 ? (
                    <section className="guide-lane guide-route-lane" aria-labelledby="guide-route-lane-title">
                      <header className="guide-lane-header">
                        <div>
                          <p className="guide-lane-kicker">PARCOURS CHRONOLOGIQUE</p>
                          <h3 id="guide-route-lane-title">La route, étape par étape</h3>
                          <p>Avance dans l&apos;ordre. Les alertes et les collections restent dans les dossiers séparés.</p>
                        </div>
                        <strong className="guide-lane-count">{routeOutlineGroups.length}<span>séquences</span></strong>
                      </header>
                      <div className="guide-lane-content">{renderBlocks(guideLanes.route)}</div>
                    </section>
                  ) : null}
                  {guideLanes.reference.length > 0 ? (
                    <details className="guide-lane-details guide-reference-panel">
                      <summary>
                        <span className="guide-lane-summary-copy">
                          <span className="guide-lane-kicker">DOSSIERS DE RÉFÉRENCE</span>
                          <strong>Checklists, inventaires et contrôles</strong>
                          <small>À consulter quand tu veux sécuriser ou nettoyer ta partie</small>
                        </span>
                        <span className="guide-lane-summary-action">Ouvrir <b aria-hidden="true">+</b></span>
                      </summary>
                      <div className="guide-lane-content">{renderBlocks(guideLanes.reference)}</div>
                    </details>
                  ) : null}
                </>
              );
            })()}
            <footer className="reader-document-footer">
              <span>FIN DE FICHE · {selected.title}</span>
              <a href={`/guides/${selected.file}`} download>Télécharger la copie hors ligne ↓</a>
            </footer>
          </article>
        </div>
      )}
    </>
  );
}
