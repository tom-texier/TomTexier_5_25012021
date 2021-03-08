# Projet 5 - Construisez un site e-commerce

Voici le frontend du Projet 5 du parcours Développeur Web.

### Conditions préalables

Vous devrez avoir `Node.js` et `npm` installés localement sur votre machine.

### Installation

1. Cloner le dépôt 

```
git clone https://github.com/tom-texier/TomTexier_5_25012021.git
```

2. Changer de dossier > *`backend`*

```
cd backend
```

3. Depuis le dossier *`backend`*, exécutez la commande suivante :
```
npm install
```

4. Démarrer le serveur avec la commande :
 ```
 node server
 ```

5. La console doit afficher : 
```
Listening on port 3000
Successfully connected to MongoDB Atlas !
```
*Le serveur doit fonctionner sur `localhost` avec le port par défaut `3000`.
Si le serveur fonctionne sur un autre port, le numéro du port sera inscrit dans la console. Ex. `Listening on port 3001`*

6. Ouvrez le fichier `index.html` pour découvrir le site

---

### ***Si vous souhaitez modifier le style du site***

### Installation de `Sass`

1. Changer de dossier > *`frontend`*

```
cd frontend
```

2. Depuis le dossier *`frontend`*, exécutez la commande suivante :
```
npm install
```

### Exécution de `Sass`

1. Depuis le dossier *`frontend`*, exécutez la commande suivante :

```
npm run sass
```

2. La console doit afficher :
```
Sass is watching for changes. Press Ctrl-C to stop.
```

3. Vous pouvez maintenant modifier les fichiers du dossier `./frontend/sass`.