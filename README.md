# L'Arbre de la Vie — Site vitrine

Site vitrine statique pour la communauté Discord d'entraide **L'Arbre de la Vie**.
100% HTML / CSS / JavaScript vanilla, sans dépendance, pensé pour être hébergé
gratuitement sur **GitHub Pages**.

## 📁 Structure du projet

```
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── lifetree.webp
```

⚠️ Le site référence l'image `assets/lifetree.png` dans le hero (identité
visuelle de la communauté). Placez votre fichier image dans un dossier
`assets/` à la racine du projet, à côté des autres fichiers, en conservant
exactement ce nom. Si l'image est absente, le cadre qui devait l'accueillir
disparaît simplement — le reste du site continue de fonctionner normalement.

## 🚀 Télécharger / cloner le projet

**Option 1 — Cloner avec Git**
```bash
git clone https://github.com/VOTRE-COMPTE/VOTRE-DEPOT.git
cd VOTRE-DEPOT
```

**Option 2 — Téléchargement direct**
Récupérez les 4 fichiers (`index.html`, `style.css`, `script.js`, `README.md`)
et placez-les dans un même dossier.

Aucune installation, aucune dépendance, aucun build : ouvrez simplement
`index.html` dans un navigateur pour prévisualiser le site en local.

## ⚙️ Modifier le nom du serveur et le lien Discord

Tout se passe dans **`script.js`**, en haut du fichier :

```js
const CONFIG = {
  serverName: "L'Arbre de la Vie",
  discordUrl: "https://discord.gg/53nNUCFMxq",
  rulesUrl: "#"
};
```

- **`serverName`** : remplace automatiquement le nom affiché dans l'en-tête et le pied de page.
- **`discordUrl`** : remplace automatiquement tous les boutons « Rejoindre » du site.
- **`rulesUrl`** : voir la section suivante.

## 📜 Modifier le lien du règlement complet

Le site n'affiche volontairement pas le règlement complet sur la page
d'accueil (seulement un résumé des règles essentielles). Deux boutons
« Consulter le règlement complet » renvoient vers `rulesUrl`.

Pour les activer, remplacez simplement dans `script.js` :

```js
rulesUrl: "#"
```

par l'URL réelle, par exemple un salon Discord dédié ou une page séparée :

```js
rulesUrl: "https://discord.com/channels/XXXXXXXXX/XXXXXXXXX"
```

## 🌐 Publier le site avec GitHub Pages

1. Créez un nouveau dépôt GitHub (ou utilisez un dépôt existant).
2. Ajoutez les 4 fichiers du projet à la racine du dépôt (pas dans un sous-dossier).
3. Poussez le tout sur la branche `main` :
   ```bash
   git add .
   git commit -m "Site L'Arbre de la Vie"
   git push origin main
   ```
4. Sur GitHub, allez dans **Settings → Pages**.
5. Dans **Source**, sélectionnez la branche `main` et le dossier `/ (root)`.
6. Cliquez sur **Save**. GitHub vous fournit une adresse du type :
   `https://VOTRE-COMPTE.github.io/VOTRE-DEPOT/`
7. Le site est en ligne quelques minutes après la publication.

## 🎨 Personnalisation visuelle

Toutes les couleurs sont centralisées en haut de `style.css`, dans le bloc
`:root { ... }` (variables `--bg-0`, `--emerald`, `--gold`, `--cream`, etc.).
Modifier une variable met à jour toutes ses utilisations sur le site.

## ♿ Accessibilité

Le site respecte :
- une structure HTML sémantique (`header`, `main`, `section`, `footer`, `nav`) ;
- un contraste texte/fond suffisant ;
- la navigation clavier et un focus visible ;
- `prefers-reduced-motion` pour désactiver les animations pour les personnes qui le demandent ;
- des textes alternatifs et `aria-label` sur les éléments interactifs.

## 📱 Responsive

Le site est testé pour s'adapter du smartphone à l'écran desktop, avec un
menu hamburger fonctionnel sur mobile et tablette.
