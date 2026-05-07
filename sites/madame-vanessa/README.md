# Madame Vanessa deeplink

Mini-site Vercel public pour servir de page officielle / deeplink.

## Objectif

- Remplacer les liens trop directs dans les bios.
- Garder une page propre et sobre.
- Mesurer les clics via Vercel Web Analytics.
- Ajouter ensuite le domaine choisi en `.com`.
- Garder seulement deux sorties publiques: MYM et Telegram.

## Domaine recommande

Recommandation actuelle :

`madamevanessaoff.com`

Alternatives :

- `mmevanessaoff.com`
- `mmevanessaofficial.com`
- `madamevanessax.com`
- `sophiebanksofficial.com`

## Tracking

La page envoie un evenement Vercel Analytics `Vanessa Link Click` avec :

- label
- href
- utm_source

Il faut activer Web Analytics dans le projet Vercel pour exploiter les donnees.

## Liens actifs

- `Mon jardin secret 🌹` -> `https://mym.fans/Sophiebanks`
- `Telegram des betises 🍬` -> `https://t.me/+KfrNnp3lETU4OWY8`

Les boutons passent par des routes internes pour compter les clics dans Vercel :

- `/go/mym`
- `/go/telegram`
