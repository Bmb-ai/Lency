# Présentation Lency Cut - Déploiement Vercel

## 1. Ajouter le logo

Place ton logo ici :

```text
assets/logolency.png
```

Les vidéos ne sont plus à déposer dans le projet : elles sont intégrées depuis Streamable pour éviter d'alourdir GitHub et Vercel.

Liens utilisés dans la slide vidéo :

```text
REEL 1 : https://streamable.com/v9vnkr
REEL 2 : https://streamable.com/xjp9ug
REEL 3 : https://streamable.com/u0c4hb
```

Pour modifier un lien, ouvre `index.html`, cherche `streamable.com/e/`, puis remplace l'identifiant concerné.

Exemple :

```html
<iframe src="https://streamable.com/e/v9vnkr"></iframe>
```

## 2. Lancer en local

Ouvre simplement `index.html` dans ton navigateur, ou lance un petit serveur local :

```bash
python -m http.server 3000
```

Puis ouvre :

```text
http://localhost:3000
```

## 3. Déployer sur Vercel

Méthode simple :

1. Va sur Vercel.
2. Crée un nouveau projet.
3. Importe le dossier complet.
4. Laisse les réglages par défaut.
5. Aucun build command nécessaire.

## 4. Navigation

- Flèche droite : slide suivante
- Flèche gauche : slide précédente
- Barre espace : slide suivante
- Touche F : plein écran


## Correctif v3
Les gros titres ont été réduits et sécurisés pour éviter les chevauchements sur les slides longues.


## Correctif v4
La slide des 3 vidéos a été remplacée par une slide sur les hooks/scripts puis une slide dédiée par Reel pour éviter les chevauchements et mieux présenter la stratégie d’écriture.
