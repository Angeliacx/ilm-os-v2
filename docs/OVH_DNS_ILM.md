# OVH DNS - ILM

Objectif :

- `ilovemodels.fr` -> vitrine publique ILM
- `www.ilovemodels.fr` -> vitrine publique ILM
- `os.ilovemodels.fr` -> dashboard prive ILM Agency OS

## Dans OVH

Aller dans :

`Domaines > ilovemodels.fr > Zone DNS > Ajouter une entree`

Garder le TTL par defaut.

## Preuves Vercel a ajouter

Ajouter ces 3 entrees TXT.

| Type | Sous-domaine | Valeur |
|---|---|---|
| TXT | `_vercel` | `vc-domain-verify=ilovemodels.fr,e78e0644a2003ef9372a` |
| TXT | `_vercel` | `vc-domain-verify=www.ilovemodels.fr,094232a3f7f5e9df20a8` |
| TXT | `_vercel` | `vc-domain-verify=os.ilovemodels.fr,17db785e8d894529f5f5` |

Important : il faut bien 3 valeurs TXT sur le meme sous-domaine `_vercel`.

## Pointage vers Vercel

Ajouter ou remplacer ces entrees.

| Type | Sous-domaine | Cible |
|---|---|---|
| A | `@` ou vide | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com.` |
| CNAME | `os` | `cname.vercel-dns.com.` |

Si OVH refuse une entree, c'est souvent qu'il existe deja une entree incompatible.

- Pour `@`, supprimer/remplacer les anciens A/AAAA qui pointent ailleurs si besoin.
- Pour `www`, supprimer/remplacer un ancien A/CNAME `www`.
- Pour `os`, supprimer/remplacer un ancien A/CNAME `os`.

## Apres ajout

Attendre 5 a 30 minutes, puis demander a Codex :

`DNS OVH ajoute, tu peux verifier`

Codex verifiera ensuite :

- `ilovemodels.fr`
- `www.ilovemodels.fr`
- `os.ilovemodels.fr`

Et finalisera la connexion cote Vercel.
