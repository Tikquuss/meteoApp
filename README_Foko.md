# GÉNÉRATION DES TABLES

### GÉNÉRALITÉS

le component table a pour sélecteur `app-table` et possède un attribut `url` qui définit l'url ou seront récupérées les données à afficher dans la table comme dans l'exemple suivant (ligne 2) :

``` HTML
<div class="fk-container">
    <app-table [url]="'https://jsonplaceholder.typicode.com/users'"></app-table>
</div>
```

La table possède aussi un attribut `json` qui permet de définir au format **JSON** la liste des informations dans le tableau.

**Exemple** :

```HTML
<div class="fk-container">
    <app-table [json]='[{
                       "nom":"Foko Henri",
                       "username": "henrifoko",
                       "email": "henrifoko@gmail.com"},
                       {
                       "nom":"Farel Kengne",
                       "username": "farelKN",
                       "email": "farelkengne@email.com"
                       }]'></app-table>
</div>
```



### FONCTIONNALITÉS

- La table possède un champs de texte permettant de filtrer ses éléments

- la table peut être ordonnée par ordre croissant ou décroissant des éléments d'une colonne en cliquant sur le libellé de cette colonne.

- La table possède un *paginator* permettant de régler le nombre d'élément afficher dans le tableau et de naviguer entre les différentes vues de la table.

- La table possède à chaque ligne deux boutons de modification et de suppression permettant respectivement de modifier et de supprimer la ligne en question.

- La table possède un bouton ajout permettant d'ajouter des éléments dans la table.

  

### UTILISATION

#### Initialisation

L'initialisation de la table peut se faire de 2 façons :

- **Lors de  la création** :

  On peut alors spécifier une URL ou une chaine de caractères contenant une liste d'objets au format JSON et cette dernière sera alors formatée pour afficher !es éléments du tableau.

  **Exemple :**

  ```HTML
  <!-- permet de creer un tableau avec les sur la base du fichier JSOPN se trouvant à l'adresse https://jsonplaceholder.typicode.com/users -->
  <app-table [url]="'https://jsonplaceholder.typicode.com/users'"></app-table>
  ```

- **Directement dans le code** :
	
	- **url** : l'URL de récupération de la table supposé au format *json*.
	- **liste** : objet littéral représentant la liste des éléments de la table.
	- **json** : chaine de charactère représentant la liste d'objets au format *json*.
	
	```typescript
	// fichier 
	this.initialise({ //chacun de ces paramètres est optionnel
	    url: url // en utilisant une URL
	    liste: liste // en utilisant un objet littéral
	    json: json // en utilisant une chaine de caractères représentant la table au format JSON});
	```

#### Destruction

Pour détruire le contenu d'une table ( par exemple en vue de la réinitialiser ), on utilise  la fonction `destroy()` du composant `app-table` :

```typescript
this.destroy();
```

#### Modification

La modification du tableau est gérée par le service de modification `ModificationService` du fichier `app/service/modification.service.ts` (c'est dans ce fichier que seront ajouter le code pour l'ajout et la modification).

- **Ajout** :

  L'ajout d'un élément se fait lorsque l'utilisateur clique sur  l'icone d'ajout en Haut à Gauche de la fenêtre de la table. la fonction `ajout()` du service `modification.service.ts` est alors déclenchée et renvoie comme une promesse de l'objet à ajouter dans la table.

- **Modification **:

  La modification d'une ligne est déclenchée dès que utilisateur click sur le bouton de modification de la ligne. Pour modifier l'élément, la fonction `editer()` du service `modification.service.ts`  est alors appelée en lui passant un objet littéral représentant l'objet. La fonction renvoie une `Promise` qui permet de récupérer l'objet une foie modifié. Se référer au code pour plus de détails.

- **Suppression** :

  La suppression d'une ligne se fait lorsque l'utilisateur clique sur le bouton de suppression de la ligne en question.

### DÉPENDENCES

Pour utiliser le component, il est nécessaire d'importer @angular/material :

```
ng add @angular/material
```

et il faut ajouter les imports suivants dans le fichier `app.module.ts` (les import suivis de ` /***/`) :

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; /***/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component'; /***/
import { RemplissageService } from './services/remplissage.service'; /***/
import { ModificationService } from './services/modification.service'; /***/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; /***/
// import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table'; /***/
import { MatPaginatorModule } from '@angular/material/paginator'; /***/
import { MatSortModule } from '@angular/material/sort'; /***/
import { MatFormFieldModule } from '@angular/material/form-field'; /***/
import { MatInputModule } from '@angular/material/input'; /***/
import { CdkColumnDef } from '@angular/cdk/table'; /***/
import { MatButtonModule } from '@angular/material/button'; /***/

import {MatIconModule} from '@angular/material/icon'; /***/
```

et dans le `@NgModule()` :

```typescript
@NgModule({
  declarations: [
    AppComponent,
    TableComponent /***/
  ],
  imports: [
    BrowserModule, /***/
    AppRoutingModule,
    BrowserAnimationsModule, /***/
    MatTableModule, /***/
    MatPaginatorModule, /***/
    MatSortModule, /***/
    MatFormFieldModule, /***/
    MatInputModule, /***/
    MatButtonModule, /***/
    MatIconModule /***/
  ],
  providers: [
      RemplissageService, /***/
      ModificationService, /***/
      CdkColumnDef /***/
  ],
  bootstrap: [AppComponent]
})
```