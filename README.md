# Game Note

Petit site de guides gaming, pensé pour lire les soluces chronologiques sans
spoiler sur ordinateur comme sur téléphone.

Le site contient actuellement 59 guides actifs, dont les routes chronologiques
des jeux des captures Steam et les guides Valve ajoutes dans le dernier lot.
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
- aucun compte, aucune base de données et aucun secret à configurer.

## Vérification locale

Le projet utilise la structure vinext prévue pour Cloudflare.

    npm install
    npm run dev
    npm run validate:guides:strict
    npm run lint
    npm run build

## Mise en ligne

Relie ce dossier a ton depot GitHub, puis configure Cloudflare Workers Builds
avec `npm run deploy` comme commande de deploiement. Le script compile d'abord
vinext, puis deploye la configuration generee dans `dist/server` avec ses
assets statiques `dist/client`, dont `public/guides/*.txt`.

Ne mets pas `npx wrangler deploy` seul comme commande de deploiement sur un
clone propre : le dossier `dist` est genere et n'est volontairement pas versionne.
Il n'y a aucune variable d'environnement ni base de donnees a fournir.

Le nom du site, les textes d’accueil et les couleurs principales sont regroupés
dans app/page.tsx et app/globals.css.
