# Déploiement Game Note sur Cloudflare Pages

Game Note est exporté en site statique. Dans Cloudflare Pages, utilise :

- commande de build : `npm run build`
- répertoire de sortie : `dist/client`
- Node.js : version 22 ou plus récente

La sortie contient le shell HTML, les fichiers TXT des guides, le manifeste
PWA, le service worker, les règles `_headers` et `_redirects`, ainsi que
`robots.txt` et `sitemap.xml`.

Le build prépare automatiquement la liste des guides et des assets JavaScript
et CSS dans le cache hors-ligne. Le service worker utilise un nom de cache
empreinté au contenu, ce qui permet de renouveler le cache après une mise à
jour du catalogue.

Le domaine par défaut utilisé pour le SEO est `https://game-note.pages.dev`.
Si un domaine personnalisé est utilisé, remplace-le dans `app/layout.tsx`,
`public/robots.txt` et `public/sitemap.xml`.
