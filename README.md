## Documentation

# Notes 
•	Les deux points (`:`) devant certains champs signifient qu’elles sont des variables dont les valeurs doivent être fournies lors du lancement de l’url.  
•	Que ceux qui gèrent la sécurité, les droits sur les opérations et l’authentification me fassent signe pour l’ajout des Gaurds (en cours…) sur ces routes.

# Différentes routes 
•	`form/view` : pour voir les différents entités de la base de données.  
<<<<<<< HEAD
•  `form /:entity_class` : pour voir toutes les occurrences de entity_class stockées dans la base de données ; `404` si entity_class n’est pas une table de la BD ou plus généralement un modèle.  `
Exemple : « form/Enregistreur  » `permet de visualiser les enregistreurs présents dans la base de données.  
•	`form/view/:entity_class/:entity_id` : pour voir  les informations de l’entité de type entity_class ayant l’identifiant  entity_id ; 404 si entity_class n’est pas une table de la BD ou plus généralement un modèle, ou si l’entité de type entity_class  ayant l’identifiant  entity_id  n’existe pas en BD.  
Exemple : « form/view/Enregistreur/5 » pour visualiser l’enregistreur ayant l’id 5 dans la base de données.  
=======
•  `form/:entity_class` : pour voir toutes les occurrences de entity_class stockées dans la base de données ; `404` si entity_class n’est pas une table de la BD ou plus généralement un modèle.  
`Exemple : «form/Enregistreur»` permet de visualiser les enregistreurs présents dans la base de données.  
•	`form/:entity_class/view/:entity_id` : pour voir  les informations de l’entité de type entity_class ayant l’identifiant  entity_id ; 404 si entity_class n’est pas une table de la BD ou plus généralement un modèle, ou si l’entité de type entity_class  ayant l’identifiant  entity_id  n’existe pas en BD.  
`Exemple : «form/Enregistreur/view/5»` pour visualiser l’enregistreur ayant l’id 5 dans la base de données.  
>>>>>>> b5040f76d533cc92c7d1987b4529b10f51f7e1c4
•  `form/:entity_class/:entity_id`  : pour modifier  les informations de l’entité de type entity_class ayant l’id  entity_id ; 404 si entity_class n’est pas une table de la BD ou plus généralement un modèle, ou si l’entité de type entity_class  ayant l’identifiant  entity_id  n’existe pas en BD.  
`Exemple : «form/Enregistreur/5»` pour modifier les informations de l’enregistreur ayant l’id 5 dans la base de données.  
•	`form/:entity_class/new` : pour créer une nouvelle entité de type entity_class; 404 si entity_class n’est pas une table de la BD ou plus généralement un modèle.  
`Exemple : « form / Enregistreur / new » pour créer un nouveau enregistreur.`  

# Différents modules / composants
Pour l’instant les modules qui doivent être modifier par celui qui veut utiliser cette génération de formulaires sont :  
•	`models/entitys_util.ts` : pour l’ajout des macros (un macro est une liste de champs qui sont utilisés par plusieurs entités, comme champs_système et informations_personnelles)  
•	`models/entitys.model.ts` : pour l’ajout de nouvelles entités  
Toute entité hérite de la classe abstraite Entity et doit redéfinir obligatoirement la méthode `generateFormStructureField/1` qui retourne un json spécifiant les informations à utiliser pour générer le formulaire d’enregistrement/modification d’une entité de cette classe, comme les champs, leurs labels, leurs Validators…   
•	`services/entitys.services.ts` : service du CRUD, constitue le point d'E/S de l'application de géneration de formulaires, dont les méthodes suivantes doivent être implémentées par les gestionnaires du CRUD coté serveur.
- `setEntityFieldsByJson(entityClass_Name, json)` : pour specifier le JSON de géneration des formulaire d'une entité de type entityClass_Name
- `getEntitysDataByClass(entityClass)` : récupère et renvoit tout les données (au format json) de l'entité de type entityClass_Name (équivalent au résultat, formaté json, de à la clause `SELECT * FROM entityClass`) 
- `createEntity(entityClass_Name, values)` : créé une nouvelle entité de type entityClass_Name avec les valeurs `values` (au format json)
- `readEntity(entityClass_Name, entity_Id)` : récupère et renvoit (les données au format json de) l'entité de type entityClass_Name ayant l'identifiant entity_Id 
- `updateEntity(entityClass_Name, entity_Id, values)` : met à jour l'entité de type entityClass_Name ayant l'identifiant entity_Id avec les valeurs `values` (au format json)
- `deleteEntity(entityClass_Name, entity_Id)` : supprime l'entité de type entityClass_Name ayant l'identifiant entity_Id  

# A venir 
•	Ajout des Gaurds sur les routes  
•	Permettre la redéfinition des styles  
•	Créer une interface d’administration  
•  Configuration d'un serveur firebase pour les sauvegardes (methode `save / 1`)  
•	…  

# Dévient contributeur 
Clone le répo et deplace toi dans le répertoire du projet; tape `npm install`, puis `ng serve --open`
   
# Autres informations

# Projet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

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
