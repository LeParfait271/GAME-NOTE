# Game Note

Petit site de guides gaming, pensé pour lire les soluces chronologiques sans
spoiler sur ordinateur comme sur téléphone.

Le site contient un catalogue de guides actifs, dont les routes chronologiques
des jeux des captures Steam et les guides solo ajoutes dans les derniers lots.
Les jeux competitifs, les jeux a runs sans route stable et les jeux-service
evolutifs restent exclus du catalogue.

Chaque guide est un fichier TXT dans public/guides/. Pour mettre à jour une
soluce, remplace simplement le fichier correspondant en gardant son nom.

## Fonctionnalités

- cartes de sélection par jeu ;
- lecteur intégré ;
- recherche dans la soluce ouverte ;
- téléchargement direct du TXT ;
- affichage responsive ;
- progression locale des checklists ;
- theme jour/nuit avec respect du reglage systeme ;
- installation PWA et lecture hors-ligne des guides ;
- navigation mobile, raccourcis clavier et metadonnees SEO ;
- aucun compte, aucune base de données et aucun secret à configurer.

## Vérification locale

Le projet utilise la structure vinext prévue pour Cloudflare.

    npm install
    npm run dev
    npm run validate:guides:strict
    npm run lint
    npm run build
    npm run preflight
    npm test

Avant une modification importante, lire A_LIRE_EN_PREMIER.md et
GAME_NOTE_RULES.md. Le mode npm run preflight:strict est à utiliser quand
toutes les nouvelles cartes ont été raccordées au catalogue.

## Mise en ligne

Dans Cloudflare Pages, relie ce dossier a ton depot GitHub avec les valeurs
suivantes :

- commande de build : `npm run build` ;
- dossier de sortie : `dist/client` ;
- version Node : 22 ou plus recente.

Le build produit le site statique, les 64 guides actifs, le cache PWA,
`public/_headers`, `public/_redirects`, le robots.txt et le sitemap. Pour
un deploiement manuel depuis le terminal, `npm run deploy` utilise aussi
`wrangler pages deploy dist/client`.

Il n'y a aucune variable d'environnement ni base de donnees a fournir. Le
detail pas a pas se trouve dans `docs/cloudflare-pages.md`.

Le nom du site, les textes d’accueil et les couleurs principales sont regroupés
dans app/page.tsx et app/globals.css.
