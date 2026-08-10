# Garde-fous du site Game Note

Game Note reprend les contrôles utiles de Cook Note sans importer ses règles
culinaires. Le point d'entrée humain est A_LIRE_EN_PREMIER.md, et les règles
durables sont dans GAME_NOTE_RULES.md.

## Ce qui est contrôlé

- correspondance cartes, catalogue, audit Steam et fichiers TXT ;
- absence de doublons, fichiers vides et caractères UTF-8 corrompus ;
- présence des headers de sécurité, routes Pages, manifeste, robots et sitemap ;
- cohérence du service worker avec les assets réellement générés ;
- présence des guides hors-ligne et fingerprint du cache ;
- noms accessibles des boutons, labels des recherches, raccourcis clavier et
  structure française du HTML ;
- limites de poids du shell HTML, des bundles et du service worker ;
- absence de fichiers de développement ou de secrets dans la sortie publique.

## Boucle recommandée

    npm run lint
    npm run build
    npm run preflight
    npm test

Le build prépare dist/client. Le préflight est volontairement séparé et
non destructif : il ne lance ni build, ni déploiement, ni modification du
catalogue.

Pendant qu'un autre lot de soluces est en cours de raccordement, le préflight
normal signale les cartes encore en attente. Une fois tous les objets ajoutés
à app/page.tsx, utiliser npm run preflight:strict pour exiger la parité totale.

Pour Cloudflare Pages :

- commande de build : npm run build ;
- sortie : dist/client ;
- Node.js : 22 ou plus récent.

Les règles de production sont versionnées dans public/_headers,
public/_redirects et wrangler.toml. Si le domaine change, mettre à jour
également app/layout.tsx, public/robots.txt et public/sitemap.xml.
