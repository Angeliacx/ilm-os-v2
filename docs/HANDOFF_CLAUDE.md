# ILM OS - Handoff Claude

## Branche

Travail Codex pousse sur :

`codex/ilm-dashboard-os`

PR possible :

`https://github.com/Angeliacx/ilm-os-v2/pull/new/codex/ilm-dashboard-os`

## Objectif produit

Construire un dashboard operationnel ILM pour piloter :

- Vanessa / Sophie Banks
- Juliette / Arthemys
- Olesia
- equipe, taches, KPI, connexions et recette de branchement

Le site public est :

`https://ilm-flax.vercel.app`

Projet Vercel ILM :

`prj_x9I2dUkfBuO2hRzJje5N5sF69Q1h`

Mini-site Madame Vanessa :

`https://madamevanessaoff.com`

Projet Vercel Madame Vanessa :

`prj_EQbBVfDNxDGpmQMrEpA5x3CPpUYY`

## Fichiers principaux

- `index.html` : structure statique du dashboard
- `data.js` : donnees operationnelles, modeles, taches, KPI, recette
- `app.js` : rendu UI, statuts, localStorage, export snapshot
- `styles.css` : design system du dashboard
- `app/api/auth/route.js` : login par mot de passe Vercel
- `app/api/status/route.js` : statut runtime sans exposer les secrets
- `middleware.js` : protection des routes
- `public/*` : fichiers servis en production

Important : apres modification de `index.html`, `app.js`, `data.js`, ou `styles.css`, copier aussi vers `public/` :

```bash
Copy-Item -LiteralPath index.html -Destination public\dashboard.html
Copy-Item -LiteralPath app.js -Destination public\app.js
Copy-Item -LiteralPath data.js -Destination public\data.js
Copy-Item -LiteralPath styles.css -Destination public\styles.css
```

## A ne pas toucher

Le dossier local contient beaucoup de fichiers Unly, captures, exports et media temporaires non suivis par Git.
Ne pas les ajouter sans demande explicite.

## Variables Vercel

Voir `.env.example`.

Actuellement en production :

- `ILM_PASSWORD` est configure
- les mots de passe equipe ne sont pas encore configures
- les connecteurs Notion / Meta / TikTok / Telegram / X ne sont pas encore configures
- le mini-site Madame Vanessa est deploye et branche sur `madamevanessaoff.com`
- liens actifs Vanessa : `Mon jardin secret 🌹` vers MYM Sophie Banks, `Telegram des betises 🍬` vers le canal Telegram
- routes de tracking clic : `/go/mym` et `/go/telegram`

## Recette

Avant livraison :

```bash
npm run lint
npm run build
npx vercel deploy --prod --yes
```

Puis tester :

- login avec le mot de passe admin
- page `/dashboard`
- onglet `Recette`
- endpoint `/api/status` apres connexion

## Priorites suivantes

1. Ajouter les mots de passe role dans Vercel.
2. Faire marcher Notion MCP ou une integration Notion token.
3. Transformer les KPI manuels en KPI synchronises.
4. Ajouter un vrai stockage serveur si les statuts doivent etre partages par toute l'equipe.
5. Brancher Meta/Instagram apres validation Business/Creator + Meta Business.
