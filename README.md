# MeteoApp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Tâches des contributeurs

### Penano 
Implementer le service `services/OpenWeatherService`, récuperant les données de l'api OpenWeather (https://openweathermap.org/)

### Nanda
Implementer le service `services/OpenStreetMapService` permettant à l'utilisateur de sélectionner sa position géographique à l'aide de la carte du monde OpenStreetMap (https://www.openstreetmap.org/). La partie la plus visible de la carte doit être celle correspondante à la ville sélectionnée précédemment.

### Tikeng (Fandio, Foko et Mengong)
- `services/auth` : service gérant l'authentification des utilisateurs
- `services/auth-guard` : pour se rassurer que l'utilisateur est authentifié lorsqu'il veut éxécuté certaines actions (se renseigner sur les `Guard` angular). Puisque la vérification de l'authentification est asynchrone, ce service retournera une Promise.

### Fandio
Un/des service(s) gérant le CRUD, respectant la nommenclature de nommage et placés dans le dossier `services` (utiliser la commande `ng g s services/nom_service`). Ajouter ces services aux `providers` du module principal `app.module.ts`.
A noter que les données de configuration de l’utilisateur seront stockées dans la BD locale IndexDB (https://developer.mozilla.org/fr/docs/Web/API/API_IndexedDB). L’utilisateur doit être capable de renseigner une ou plusieurs adresses composées de trois valeurs : ville, région et pays (pour l’instant il faut juste gérer les villes et régions du Cameroun).
Tous les modèles doivent être placés dans le répertoire `models`, et doivent respecter la nomenclature de nommage suivante `nom_table.model.ts` (Exemple : ville.model.ts)

### Foko et Mengong
Des composants pour l'interface de météo, respectant la nommenclature de nommage (utilisé la commande `ng g c nom_composant`).
Dans cette interface, l’utilisateur doit avoir toutes les informations de météo selon une adresse active. L’utilisateur peut switcher d’une adresse à l’autre et les informations de météo devront automatiquement se mettre à jour pour s’adapter à la nouvelle adresse sélectionnée.
Les informations de météo seront affichées comme suit :
- Toutes les heures plus tard (Vue toutes les heures)
- Tous les jours de la semaine en cours, même si le jour est déjà passé (Vue hebdomadaire)
La photo de profil et le nom de l’utilisateur doivent être visibles.  
Par défaut la vue `Toutes les heures` est active et la météo de l’heure actuelle est visible. Les autres météos seront affichées en remplacement de celle par défaut sur demande de l’utilisateur.
Une information de météo est composée des données suivantes :
- La température
- La pluviométrie
- L’humidité
Voir l'image `exemple.png`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
