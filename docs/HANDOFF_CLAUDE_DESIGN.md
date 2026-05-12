# ILM OS - Handoff Claude Design / Claude Code

## A donner a Claude

Repo :

`https://github.com/Angeliacx/ilm-os-v2`

Branche a utiliser :

`codex/ilm-dashboard-os`

Dernier commit connu :

`8a988ec`

URLs utiles :

- Dashboard prive live : `https://os.ilovemodels.fr/dashboard`
- Vitrine publique live : `https://ilovemodels.fr`
- Mini-site Vanessa : `https://madamevanessaoff.com`
- Local Jordan : `http://localhost:3000/`

## Fichiers a lire en premier

1. `docs/HANDOFF_CLAUDE.md`
2. `docs/PROMPT_CLAUDE_CHALLENGE.md`
3. `index.html`
4. `styles.css`
5. `data.js`
6. `app.js`
7. `public/dashboard.html`
8. `public/styles.css`
9. `sites/ilovemodels-public/index.html`
10. `sites/ilovemodels-public/styles.css`

Assets de marque a regarder :

- `public/assets/brand/couverture-maligoshik.png`
- `public/assets/brand/ilm-cover-v3-maligoshik.png`

Si un dossier Claude Design est ajoute au repo, par exemple `handoff_claude_code/`, lire aussi :

- `handoff_claude_code/README.md`
- `handoff_claude_code/colors_and_type.css`
- les screenshots PNG fournis
- le UI kit public/vitrine si present

## Mission exacte

Integrer la direction visuelle Claude Design dans le vrai dashboard ILM, sans remplacer le produit.

Le dashboard actuel fonctionne deja. Il faut le re-skinner et l'ameliorer progressivement, pas le re-ecrire.

Priorite :

1. Garder le dashboard operationnel.
2. Ameliorer les couleurs, typographies, espacements et hierarchie.
3. Garder le style premium, sobre, agence de talent/mannequin.
4. Ne jamais faire vitrine OF/adulte.
5. Ne pas casser les taches, KPI, modes, notes Jordan, liens, auth.

## Contraintes importantes

- Ne pas supprimer de fonctionnalites existantes.
- Ne pas casser `app/api/auth/route.js`, `app/api/status/route.js`, `middleware.js`.
- Ne pas ajouter de secrets dans le code.
- Ne pas commit les fichiers Unly/captures/media non suivis.
- Ne pas remplacer `data.js` par une structure incompatible.
- Si `index.html`, `app.js`, `data.js` ou `styles.css` changent, copier aussi vers `public/`.

Commande miroir obligatoire apres modification :

```powershell
Copy-Item -LiteralPath index.html -Destination public\dashboard.html
Copy-Item -LiteralPath app.js -Destination public\app.js
Copy-Item -LiteralPath data.js -Destination public\data.js
Copy-Item -LiteralPath styles.css -Destination public\styles.css
```

## Verification obligatoire

Avant de livrer :

```powershell
npm run lint
npm run build
```

Puis verifier :

- `http://localhost:3000/`
- `https://os.ilovemodels.fr/dashboard`
- login admin
- notes Jordan visibles uniquement pour Jordan
- modes Survie / Standard / CEO / Recovery
- page Recette

## Prompt a coller dans Claude Code

```text
Tu es Claude Code avec un regard senior design produit + frontend.

Repo : https://github.com/Angeliacx/ilm-os-v2
Branche : codex/ilm-dashboard-os

Lis d'abord :
- docs/HANDOFF_CLAUDE.md
- docs/PROMPT_CLAUDE_CHALLENGE.md
- docs/HANDOFF_CLAUDE_DESIGN.md
- index.html
- styles.css
- data.js
- app.js
- sites/ilovemodels-public/index.html
- sites/ilovemodels-public/styles.css

Objectif :
Integrer la direction visuelle Claude Design dans le dashboard reel ILM, sans le remplacer.

Travail attendu :
1. Fais un audit court du dashboard actuel.
2. Propose le plan de re-skin en 5 a 10 points.
3. Montre-moi les fichiers que tu vas modifier avant de modifier.
4. Integre les tokens/design direction de handoff_claude_code si le dossier existe.
5. Ameliore surtout styles.css et la hierarchie visuelle.
6. Ne casse pas les fonctions : auth, notes Jordan, modes, KPI, taches, dashboard, recette.
7. Apres modification de index/app/data/styles, copie vers public/.
8. Lance npm run lint et npm run build.
9. Donne un resume clair + diff.

Contraintes :
- Pas de secrets.
- Pas de suppression de features.
- Pas de refonte massive sans validation.
- Ne pas ajouter les fichiers Unly, captures, media non suivis.
- Vitrine publique = talent/mannequin premium, jamais OF/adulte.
- Dashboard prive = cockpit operationnel, pas landing page.

Commence par lire les fichiers et me proposer un diff plan.
```

## Prompt court si Claude est deja dans le repo

```text
Lis docs/HANDOFF_CLAUDE_DESIGN.md et suis exactement ce plan.
Ne remplace pas le dashboard : re-skin progressif, preservation des features, diff avant gros changement.
```

