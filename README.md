# Game Note

Petit site de guides gaming, pensé pour lire les soluces chronologiques sans
spoiler sur ordinateur comme sur téléphone.

Le site contient actuellement :

- Octopath Traveler 1 ;
- Clair Obscur: Expedition 33 ;
- Final Fantasy Type-0 HD.

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
    npm run build

Le build a été vérifié après intégration des trois fichiers de soluce.

## Mise en ligne

Relie ce dossier à ton dépôt GitHub, puis reprends dans Cloudflare le même type
de projet que pour Cook Note. Le projet est déjà préparé pour un déploiement
Cloudflare compatible vinext, sans variable d’environnement ni service
supplémentaire.

Le nom du site, les textes d’accueil et les couleurs principales sont regroupés
dans app/page.tsx et app/globals.css.
