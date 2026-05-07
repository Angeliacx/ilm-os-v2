# ILM - Agency OS

Dashboard operationnel pour I Love Models, pret a deployer sur Vercel.

## Contenu

- Dashboard CEO avec priorites critiques.
- Suivi des modeles Vanessa, Olesia et Juliette.
- Matrice KPI par modele.
- Recette de connexion API / Notion / Meta / Telegram / plateformes.
- Statut runtime Vercel via `/api/status` apres connexion.
- Equipe, missions et telephones.
- Deadlines avril 2026.
- Process IG, TikTok, scripts et formats.
- Mapping Notion avec IDs pages, database et data source.

## Lancer en local

Le projet utilise Next.js pour la protection par mot de passe et Vercel.

```bash
npm install
npm run dev
```

La page `/dashboard` redirige vers `/dashboard.html`.

## Deployer sur Vercel

```bash
npx vercel deploy --prod --yes
```

## Architecture domaine cible

- `ilovemodels.fr` : vitrine publique pour nouvelles modeles, projet `sites/ilovemodels-public`
- `os.ilovemodels.fr` : dashboard prive ILM Agency OS, projet `ilm`
- domaines modeles : deeplinks propres par modele, ex. `madamevanessaoff.com`

## Connecter Notion plus tard

Page source :

https://www.notion.so/ILM-Agency-OS-3377b2136958815ea26cc183973a37e0

Le mapping est dans `data.js` :

- `notionRoot`
- `notionPages`
- `databases`

Quand le connecteur Notion est autorise, l'etape suivante est de remplacer les donnees statiques par une lecture API ou par une synchronisation periodique.

Pour que Codex voie la page, il faut que la page ILM soit explicitement partagee avec la connexion Notion / ChatGPT / MCP. Le lien public seul ne suffit pas.

## Acces equipe

Le site est protege par mot de passe via les variables Vercel :

- `ILM_PASSWORD` : acces Jordan / admin
- `ILM_PASSWORD_SOPHIE` : acces Sophie
- `ILM_PASSWORD_LOUIS` : acces Louis
- `ILM_PASSWORD_VANESSA` : acces Vanessa
- `ILM_PASSWORD_JULIETTE` : acces Juliette
- `ILM_PASSWORD_NED` : acces Ned
- `ILM_PASSWORD_MARVIN` : acces Marvin
- `ILM_PASSWORD_TEAM` : acces equipe

Tant qu'une variable n'existe pas dans Vercel, le mot de passe correspondant n'est pas actif.

## Variables de connexion a preparer

- `NOTION_TOKEN` ou `NOTION_API_KEY`
- `META_ACCESS_TOKEN`
- `TIKTOK_ACCESS_TOKEN`
- `TELEGRAM_BOT_TOKEN`
- `X_BEARER_TOKEN`
- `VERCEL_ANALYTICS_ID`

Ne jamais mettre ces valeurs dans `data.js`, `app.js` ou le README. Elles doivent rester dans Vercel.
