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

Vitrine publique ILM :

`https://ilovemodels-public.vercel.app`

Projet Vercel vitrine publique :

`prj_HckbFzI0t8CalsDqaRec7uDSi05l`

Guide challenge Claude :

`docs/PROMPT_CLAUDE_CHALLENGE.md`

Guide DNS OVH :

`docs/OVH_DNS_ILM.md`

## Fichiers principaux

- `index.html` : structure statique du dashboard
- `data.js` : donnees operationnelles, modeles, taches, KPI, recette
- `app.js` : rendu UI, statuts, localStorage, export snapshot
- `styles.css` : design system du dashboard
- `app/api/auth/route.js` : login par mot de passe Vercel
- `app/api/status/route.js` : statut runtime sans exposer les secrets
- `middleware.js` : protection des routes
- `public/*` : fichiers servis en production
- `sites/ilovemodels-public/*` : vitrine publique cible `ilovemodels.fr`

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
- les mots de passe equipe ne sont pas encore configures (`ILM_PASSWORD_SOPHIE`, `ILM_PASSWORD_NED`, `ILM_PASSWORD_LOUIS`, `ILM_PASSWORD_VANESSA`, `ILM_PASSWORD_JULIETTE`, `ILM_PASSWORD_MARVIN`, `ILM_PASSWORD_TEAM`)
- les connecteurs Notion / Meta / TikTok / Telegram / X ne sont pas encore configures
- le mini-site Madame Vanessa est deploye et branche sur `madamevanessaoff.com`
- liens actifs Vanessa : `Mon jardin secret 🌹` vers MYM Sophie Banks, `Telegram des betises 🍬` vers le canal Telegram
- routes de tracking clic : `/go/mym` et `/go/telegram`
- `olesia.com` est indisponible au 07/05/2026 ; options disponibles verifiees : `olesiaofficial.com`, `olesiaxoxo.com`, `liabunnyy.com`
- priorite ajoutee : ranger tout le contenu Sophie sur MYM par collections, transferer ensuite vers Unly, acheter 2 programmes Unly, puis verifier si Olesia peut passer rapidement sur OF ou MYM
- architecture validee : `ilovemodels.fr` = vitrine publique, `os.ilovemodels.fr` = dashboard prive ILM OS
- priorite branding ajoutee : creer une page Instagram ILM ultra sobre, orientee talent/mannequin, sans vocabulaire OF/adulte
- DNS OVH et Vercel valides : `ilovemodels.fr`, `www.ilovemodels.fr` et `os.ilovemodels.fr` sont verifies et live
- cockpit Jordan ajoute au dashboard : raccourcis personnels dont `http://localhost:3000/`, OS live, vitrine ILM et deeplink Vanessa
- modes operationnels ajoutes : Survie, Standard, CEO, Recovery. Chaque mode affiche des missions et rappels adaptes au niveau d'energie du moment
- localhost automatise : `scripts/start-ilm-local.ps1` lance Next sur `http://localhost:3000/`, nettoie le cache `.next` avant demarrage, et un raccourci Windows "ILM Local Dashboard 3000" est installe dans le dossier Demarrage de Jordan

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
2. Brancher `ilovemodels.fr` sur `ilovemodels-public`.
3. Brancher `os.ilovemodels.fr` sur le projet ILM prive.
4. Faire marcher Notion MCP ou une integration Notion token.
5. Transformer les KPI manuels en KPI synchronises.
6. Ajouter un vrai stockage serveur si les statuts doivent etre partages par toute l'equipe.
7. Brancher Meta/Instagram apres validation Business/Creator + Meta Business.
