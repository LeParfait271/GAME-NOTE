# Règles Game Note

Ce fichier est la source de vérité des garde-fous du site. Il reprend les
conventions utiles de Cook Note, adaptées à un catalogue de jeux et à un site
statique Cloudflare Pages.

## Lois qualité permanentes

- Ne pas dégrader : chaque changement doit améliorer la fiabilité, la
  sécurité, la lisibilité, l'accessibilité, la performance ou la maintenance.
- Garder les changements dans leur périmètre. Les soluces ajoutées par
  l'utilisateur et les fichiers docs/ ne sont pas des fichiers de nettoyage.
- Ne jamais supprimer ou remplacer un guide, une carte ou une entrée de
  catalogue sans preuve et sans demande explicite.
- Documenter toute convention nouvelle et ajouter un contrôle automatisé
  lorsqu'elle est vérifiable.
- Ne pas versionner de secret, de clé privée, de fichier .env ou d'artefact
  local.

## Catalogue et contenu

- Chaque carte de app/page.tsx doit avoir un identifiant unique, un fichier TXT
  existant, une entrée dans docs/guide-catalog.json et un audit dans
  docs/steam-audit.json.
- Chaque entrée active ou spéciale du catalogue doit avoir une carte et un TXT.
  Pendant la rédaction, une entrée sans carte est signalée comme « en attente » ;
  avant publication, npm run preflight:strict doit la refuser. Les cartes et les
  TXT doivent rester synchronisés.
- Un guide actif doit conserver une route chronologique, son périmètre Steam,
  ses alertes missables et sa règle anti-spoiler. Les guides spéciaux peuvent
  documenter explicitement l'absence de succès Steam.
- Les textes ne doivent pas contenir de caractère de remplacement UTF-8 (�),
  de contenu vide ou de doublon d'identifiant.
- Les nouvelles cartes doivent garder un nom accessible pour chaque bouton et
  une illustration qui possède un texte alternatif.

## Build, cache et Cloudflare

- Le site livré est l'export statique de npm run build dans dist/client.
- dist/client/ est généré, jamais bricolé à la main.
- Le service worker ne précache que des URLs réellement présentes dans la
  sortie. Son cache doit être fingerprinté par le contenu du build.
- Les pages HTML, le manifeste, le service worker, le sitemap et les routes
  canoniques restent en réseau d'abord ou sans cache long.
- Les assets statiques versionnés peuvent être immuables, mais aucune URL
  supprimée ne doit rester dans le cache.
- public/_headers, public/_redirects, robots.txt, sitemap.xml et wrangler.toml
  doivent rester cohérents avec le build Pages.
- La CSP ne doit pas autoriser unsafe-eval. Les scripts critiques restent
  locaux ; les images Steam externes sont limitées aux domaines déclarés.

## UX, accessibilité et hors-ligne

- Le document garde lang="fr", un lien d'évitement, des labels explicites,
  des noms accessibles, des états de chargement/erreur/absence et une
  navigation clavier.
- Les recherches doivent fonctionner sans accent et l'état vide doit proposer
  une récupération simple.
- Les raccourcis clavier ne doivent pas intercepter la frappe dans un champ.
- Le thème clair/sombre doit utiliser les tokens CSS et conserver un contraste
  lisible.
- Le mode hors-ligne doit signaler son état sans masquer le lecteur ni promettre
  qu'un guide jamais mis en cache est disponible.
- Le service worker ne doit pas produire de logs runtime.

## Performance et sécurité

- Garder un budget contrôlé pour le HTML initial, les bundles JS/CSS et le
  service worker. Ne pas précacher un gros bundle différé uniquement pour faire
  passer un test.
- Vérifier la sortie réelle plutôt que les seuls fichiers source : parité des
  TXT, assets référencés présents, chemins Cloudflare valides et absence de
  répertoires de développement dans dist/client/.
- Toute entrée utilisateur doit rester locale et non exécutée. Ne pas injecter
  de HTML construit depuis une recherche ou un contenu de guide.

## Boucle de validation

Après une modification visible :

    npm run lint
    npm run build
    npm run preflight
    npm test

npm run preflight ne construit ni ne déploie : il contrôle l'artefact déjà
produit. En cas d'échec, corriger la cause puis relancer toute la boucle.

## Compte rendu

Un compte rendu doit indiquer les fichiers touchés, les validations passées,
les vérifications non réalisées, les risques restants et la configuration
Cloudflare attendue. Aucun commit, push ou déploiement n'est implicite.
