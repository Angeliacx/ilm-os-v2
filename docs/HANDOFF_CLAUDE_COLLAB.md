# ILM OS - Handoff Collaboration Codex / Claude

Derniere mise a jour : 14/05/2026
Dernier commit Codex pousse : `e337064`
Branche de coordination : `codex/ilm-dashboard-os`

## But de ce document

Eviter que Codex et Claude se marchent dessus.

Claude peut challenger, proposer, designer et faire des patchs cibles.
Codex garde l'integration finale, la verification locale, la coherence Vercel et la publication.

Regle simple : Claude propose ou travaille sur une branche separee ; Codex integre sur `codex/ilm-dashboard-os`.

## Etat actuel

Repo :

`https://github.com/Angeliacx/ilm-os-v2`

URLs :

- OS prive : `https://os.ilovemodels.fr/dashboard`
- Ancien alias Vercel : `https://ilm-flax.vercel.app/dashboard`
- Local Jordan : `http://localhost:3000/`
- Vitrine publique cible : `https://ilovemodels.fr`
- Mini-site Vanessa : `https://madamevanessaoff.com`

Mot de passe local Jordan :

`ilm2026`

Le login local a ete stabilise dans `app/api/auth/route.js`.
Le lanceur local est `scripts/start-ilm-local.ps1`.

## Roles

### Codex

Responsable de :

- integration finale dans le repo
- routes Next/Vercel
- auth, middleware, mots de passe
- dashboard operationnel
- donnees dans `data.js`
- synchronisation `public/`
- tests `npm run lint` et `npm run build`
- push vers `codex/ilm-dashboard-os`
- verification local + Vercel

### Claude

Responsable recommande de :

- audit UX/UI
- direction artistique
- design tokens
- hierarchie visuelle
- propositions de layout
- refonte de sections limitees
- handoff design avec screenshots
- suggestions architecture, sans modifier les secrets ni l'auth sans validation

Claude ne doit pas prendre la main sur la publication finale sans validation de Jordan/Codex.

## Zones de travail conseillees

### Claude peut modifier en priorite

- `styles.css`
- `sites/ilovemodels-public/styles.css`
- `sites/ilovemodels-public/index.html`
- nouveaux fichiers dans `docs/`
- nouveaux fichiers dans `handoff_claude_code/` si besoin
- assets design clairement ranges dans `public/assets/brand/`

### Claude peut modifier avec prudence

- `index.html`
- `app.js`
- `data.js`
- `public/dashboard.html`
- `public/app.js`
- `public/data.js`
- `public/styles.css`

Si Claude modifie `index.html`, `app.js`, `data.js`, ou `styles.css`, il doit aussi miroir vers `public/`.

Commandes miroir :

```powershell
Copy-Item -LiteralPath index.html -Destination public\dashboard.html
Copy-Item -LiteralPath app.js -Destination public\app.js
Copy-Item -LiteralPath data.js -Destination public\data.js
Copy-Item -LiteralPath styles.css -Destination public\styles.css
```

### Claude ne doit pas modifier sans accord

- `app/api/auth/route.js`
- `app/api/status/route.js`
- `middleware.js`
- `.vercel/`
- `.env*`
- `scripts/start-ilm-local.ps1`
- `scripts/start-ilm-local.cmd`
- configuration DNS / Vercel
- fichiers Unly, captures, medias non suivis

## Workflow anti-conflit

1. Avant de travailler, Claude doit lire :
   - `docs/HANDOFF_CLAUDE.md`
   - `docs/HANDOFF_CLAUDE_DESIGN.md`
   - `docs/HANDOFF_CLAUDE_COLLAB.md`

2. Claude doit partir de la branche :

```powershell
git fetch origin
git checkout -B claude/design-pass origin/codex/ilm-dashboard-os
```

3. Claude doit annoncer les fichiers qu'il veut modifier avant modification.

4. Claude doit faire un patch petit et lisible.

5. Claude doit tester :

```powershell
npm run lint
npm run build
```

6. Claude doit pousser sur une branche separee :

```powershell
git push origin claude/design-pass
```

7. Codex compare ensuite :

```powershell
git fetch origin
git diff origin/codex/ilm-dashboard-os..origin/claude/design-pass
```

8. Codex integre manuellement ou merge seulement apres verification.

## Regles de design produit

Dashboard prive :

- cockpit operationnel
- clair, dense, KPI driven
- pas une landing page
- pas un site adulte
- priorite aux missions, statuts, objectifs, KPI, liens et recette

Vitrine publique :

- agence de talent / mannequin
- sobre, premium, editorial
- jamais vocabulaire OF/adulte
- utile pour recruter, credibiliser, orienter

## Regles data et contenus

- Ne jamais mettre de secrets ou mots de passe dans le code public, sauf le fallback local `ilm2026` deja assume pour localhost.
- Les vraies variables doivent rester dans Vercel.
- Ne pas ajouter les nombreux fichiers temporaires Unly/captures/media.
- Ne pas supprimer Elisa/Andrea/autres anciens elements sans verifier l'etat produit actuel dans `data.js`.
- Ne pas remplacer la structure de `data.js` sans migration complete de `app.js`.

## Verification minimale

Avant livraison, verifier :

- `npm run lint`
- `npm run build`
- login `http://localhost:3000/login`
- dashboard `http://localhost:3000/dashboard`
- `https://os.ilovemodels.fr/dashboard` apres deploiement
- modes Survie / Standard / CEO / Recovery
- notes Jordan
- cards modeles Vanessa / Juliette / Olesia
- onglet Recette

## Prompt court a donner a Claude

```text
Tu travailles avec Codex sur ILM OS sans lui marcher dessus.

Repo : https://github.com/Angeliacx/ilm-os-v2
Base : origin/codex/ilm-dashboard-os
Branche de travail : claude/design-pass

Lis :
- docs/HANDOFF_CLAUDE.md
- docs/HANDOFF_CLAUDE_DESIGN.md
- docs/HANDOFF_CLAUDE_COLLAB.md

Mission :
Challenge design/UX et propose une amelioration premium du dashboard et/ou de la vitrine publique.

Contraintes :
- Ne touche pas auth/middleware/api/scripts/env/vercel.
- Ne commit aucun fichier Unly/capture/media non suivi.
- Si tu modifies index.html, app.js, data.js ou styles.css, copie aussi vers public/.
- Patch petit, lisible, testable.
- Lance npm run lint et npm run build.
- Pousse sur claude/design-pass, pas directement sur codex/ilm-dashboard-os.

Avant de modifier, donne les fichiers que tu comptes toucher et le plan.
```

## Phrase simple pour Jordan

Codex = chef de chantier et mise en ligne.
Claude = architecte/design challenger.
Les deux travaillent depuis la meme base, mais Claude pousse sur sa branche et Codex valide avant fusion.
