# Prompt Claude - Challenge ILM OS

Tu es Claude avec un regard senior en design produit, architecture frontend et infrastructure Vercel.

Contexte :

- Repo : `https://github.com/Angeliacx/ilm-os-v2`
- Branche de travail Codex : `codex/ilm-dashboard-os`
- Dashboard prive : `https://ilm-flax.vercel.app/dashboard`
- Vitrine publique preview : `https://ilovemodels-public.vercel.app`
- Mini-site Vanessa : `https://madamevanessaoff.com`
- Architecture cible :
  - `ilovemodels.fr` = vitrine publique pour nouvelles modeles
  - `os.ilovemodels.fr` = dashboard prive ILM Agency OS
  - domaines modeles = deeplinks propres et tracking

Objectif :

Challenger et ameliorer l'infrastructure et le design, sans casser l'existant.

## Ce que tu dois regarder

1. Design de la vitrine publique `sites/ilovemodels-public`
   - Doit faire agence de talent / mannequin premium.
   - Ne doit pas faire agence OF.
   - Tres sobre, editorial, credible, clean.
   - Priorite : confiance, casting, image de marque.

2. Design du dashboard prive
   - Ce n'est pas une landing page.
   - C'est un cockpit operationnel pour Jordan et l'equipe.
   - Priorite : lisibilite, hierarchy, action rapide, KPI, taches, statuts.
   - Si c'est moins esthetique mais plus clair, c'est acceptable.

3. Architecture data driven
   - Proposer une meilleure structure pour passer de `data.js` statique a un OS avec stockage serveur.
   - Proposer une architecture simple pour :
     - taches partagees
     - KPI par modele
     - tracking links
     - exports revenus
     - roles equipe
     - journal d'actions

4. Infrastructure Vercel
   - Proposer une meilleure separation entre :
     - vitrine publique
     - OS prive
     - mini-sites modeles
   - Verifier si plusieurs projets Vercel ou un monorepo seraient plus propres.
   - Proposer le chemin le plus pragmatique, pas une usine a gaz.

## Contraintes

- Ne supprime pas les fonctionnalites existantes.
- Ne casse pas la protection mot de passe.
- Ne commit pas de secrets.
- Ne mets jamais les tokens/API keys dans le code.
- Garde les fichiers Unly/captures non suivis hors Git.
- Respecte l'orientation de marque : talent, mannequin, direction artistique, premium, sobre.
- Les contenus adultes/OF ne doivent pas apparaitre dans la vitrine publique.

## Livrable attendu

Fais d'abord un audit court :

- 5 points forts
- 5 risques / faiblesses
- 10 ameliorations prioritaires

Puis propose :

- une architecture cible
- une roadmap en 3 phases
- les fichiers que tu modifierais
- les risques

Ensuite seulement, si tu implementes :

- fais des changements petits et coherents
- liste les fichiers modifies
- explique pourquoi
- laisse Codex/Jordan valider avant refonte massive

## Question centrale

Comment transformer ILM en Agency OS data driven premium, avec une vitrine publique credible et un dashboard prive vraiment operationnel ?
