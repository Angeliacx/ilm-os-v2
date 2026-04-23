# ILM OS v2 — Guide de Modification

## Comment modifier le site

### Processus en 3 étapes

1. **Modifier les fichiers** dans le dossier `ilm-os-app` sur ton PC
2. **Sauvegarder sur GitHub** (terminal)
3. **Le site se met à jour automatiquement** sur Vercel

### Commandes à taper après chaque modification

Ouvre PowerShell, puis :

```
cd "C:\Users\Utilisateur\Documents\Claude\Projects\I love Models\ilm-os-app"
git add .
git commit -m "description de ta modif"
git push
```

C'est tout. Vercel redéploie automatiquement en ~30 secondes.

---

## Structure du projet

```
ilm-os-app/
├── components/
│   └── ilm-os.jsx          ← LE FICHIER PRINCIPAL (tout le dashboard)
├── app/
│   ├── page.jsx             ← Page d'accueil (charge le dashboard)
│   ├── layout.jsx           ← Layout global (titre, meta)
│   ├── globals.css           ← Styles de base
│   ├── login/
│   │   └── page.jsx         ← Page de connexion
│   └── api/auth/
│       ├── route.js          ← API login
│       ├── check/route.js    ← Vérification auth
│       └── logout/route.js   ← Déconnexion
├── middleware.js              ← Protection mot de passe
├── package.json               ← Dépendances
└── next.config.js             ← Config Next.js
```

### Quel fichier modifier ?

| Tu veux...                          | Fichier à modifier               |
|-------------------------------------|-----------------------------------|
| Changer les données des modèles     | `components/ilm-os.jsx` → `MODELS_DATA` |
| Modifier les revenus                | `components/ilm-os.jsx` → `revenue` dans chaque modèle |
| Ajouter/supprimer un modèle        | `components/ilm-os.jsx` → `MODELS_DATA` |
| Modifier les deadlines             | `components/ilm-os.jsx` → `DEADLINES` |
| Changer le calendrier éditorial    | `components/ilm-os.jsx` → `CALENDAR_DATA` |
| Modifier l'équipe                  | `components/ilm-os.jsx` → `TEAM` |
| Changer les frictions              | `components/ilm-os.jsx` → `FRICTIONS` |
| Modifier les chatters              | `components/ilm-os.jsx` → `CHATTERS_DATA` |
| Changer les couleurs/thème         | `components/ilm-os.jsx` → objet `T` (en haut du fichier) |
| Modifier la page de login          | `app/login/page.jsx` |
| Changer le mot de passe            | Vercel Dashboard → Settings → Environment Variables |

---

## Palette de Couleurs ILM

### Thème principal (objet `T` dans ilm-os.jsx)

```
FOND PRINCIPAL
  bg:          #06060E    ← Noir profond (fond de page)
  surface:     #0C0C18    ← Noir bleuté (sidebar)
  card:        #111122    ← Fond des cartes
  card2:       #161630    ← Fond secondaire (badges, KPIs)
  border:      #1C1C3A    ← Bordures

ACCENTS
  gold:        #C9A84C    ← Or principal (accents, titres actifs)
  goldLight:   #E2C97E    ← Or clair (titres, valeurs)
  goldDim:     rgba(201,168,76,0.15) ← Or transparent (fonds)
  purple:      #7C5CFC    ← Violet (accents secondaires)

STATUTS
  green:       #10D078    ← Vert (actif, succès)
  orange:      #F59E0B    ← Orange (en cours, warning)
  red:         #EF4444    ← Rouge (urgent, erreur)
  blue:        #3B82F6    ← Bleu (info)

TEXTE
  white:       #F1EEFF    ← Texte principal (blanc lavande)
  muted:       #6B7280    ← Texte secondaire
  mutedLight:  #9CA3AF    ← Texte tertiaire

PLATEFORMES
  OnlyFans:    #00AFF0    ← Bleu OF
  MYM:         #C9A84C    ← Or (même que gold)
  Instagram:   #E1306C    ← Rose IG
```

### Typographie

```
Titres:       Cormorant Garamond (serif, élégant)
Corps:        DM Sans (sans-serif, moderne)
```

---

## Exemples de modifications courantes

### Ajouter un nouveau modèle

Dans `components/ilm-os.jsx`, ajoute un bloc dans `MODELS_DATA` :

```javascript
{
  id: "nouveau",
  name: "Prénom",
  status: "onboarding",      // "active" ou "onboarding"
  onboarding: 10,            // 0-100
  manager: "Jordan",
  niche: "La niche ici",
  face: true,                // true = face, false = no face
  ig_count: 1,
  ig_main: "username_ig",
  of: false,
  mym: false,
  stage: "onboarding",       // "onboarding", "strategie", "execution", "scaling"
  autonomy: 5,               // 0-100
  assets_stock: 0,           // 0-100
  content_stock: 0,          // 0-100
  friction: "Description du blocage actuel",
  next_actions: ["Action 1", "Action 2", "Action 3"],
  alert: "Message d'alerte ou null",
  revenue: { of_mtd: 0, mym_mtd: 0, of_target: 1000, mym_target: 500, last_month_total: 0 },
},
```

### Mettre à jour les revenus d'un modèle

Trouve le modèle dans `MODELS_DATA` et modifie son objet `revenue` :

```javascript
revenue: {
  of_mtd: 3500,        // Revenu OnlyFans ce mois
  mym_mtd: 1800,       // Revenu MYM ce mois
  of_target: 5000,     // Objectif OF
  mym_target: 3000,    // Objectif MYM
  last_month_total: 4200  // Total du mois dernier
},
```

### Ajouter une deadline

Dans `DEADLINES` :

```javascript
{ date: "25/04", task: "Description de la tâche", resp: "Qui", status: "pending" },
// status: "urgent", "pending", "todo", "done"
```

### Ajouter du contenu au calendrier

Dans `CALENDAR_DATA` :

```javascript
{ id: 16, model: "vanessa", date: "2026-04-29", type: "post", platform: "OF", title: "Titre du contenu", status: "idea" },
// model: "vanessa", "olesia", "elisa", "juliette"
// platform: "OF", "MYM", "IG"
// type: "post", "story", "reel", "live", "custom"
// status: "idea", "script", "shoot", "edit", "ready", "posted"
```

---

## Liens utiles

- **Site live** : https://ilm-flax.vercel.app
- **GitHub repo** : https://github.com/Angeliacx/ilm-os-v2
- **Vercel Dashboard** : https://vercel.com/jordancalas99-5136s-projects/ilm
- **Changer le mot de passe** : Vercel Dashboard → Settings → Environment Variables → ILM_PASSWORD
