import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { SingleFieldComponent } from './single-field/single-field.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldService } from './services/field.service';
import { EntitysService } from './services/entitys.service';

import { Routes, RouterModule } from '@angular/router';

import { SingleModalComponent } from './single-modal/single-modal.component';
import { BrouillonComponent } from './__cache/brouillon.component';
import { AppFormComponent } from './app-form/app-form.component';
import { FormHeaderComponent } from './form-header/form-header.component';
import { ViewEntityComponent } from './view-entity/view-entity.component';
import { ViewSingleEntityComponent } from './view-entity/view-single-entity/view-single-entity.component';
import { ViewDataOfEntityComponent } from './view-entity/view-data-of-entity/view-data-of-entity.component';
import { AuthService } from './services/auth.service'; 
//import { AuthGuardService } from './services/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../environments/environment';
if (environment.production) {
  enableProdMode();
}

export var appRoutes: Routes = [
  // 404
  { path: 'form/404', component: FourOhFourComponent},
  // voir les différentes entités de la base de données
  { path: 'form/view', component:  ViewEntityComponent }, 
  // voir toutes les occurrences de entity_class stockées dans la base de données
  { path: 'form/:entity_class', component:   ViewDataOfEntityComponent },
  // voir les informations de l’entité de type entity_class ayant l’identifiant  entity_id
  { path: 'form/:entity_class/view/:entity_id', component:  ViewSingleEntityComponent },
  // modifier  les informations de l’entité de type entity_class ayant l’id entity_id
  { path: 'form/:entity_class/:entity_id', component:  AppFormComponent },
  // Créer une nouvelle entité de type entity_class
  { path: 'form/:entity_class/new', component:  AppFormComponent },
  // Authentification
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  // Rédirection : par défaut on visualise les données
  { path: '', redirectTo: 'form/view', pathMatch: 'full' },
  { path: '**', redirectTo: 'form/view' }
];

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    SingleFieldComponent,
    SingleModalComponent,
    BrouillonComponent,
    AppFormComponent,
    FormHeaderComponent,
    ViewEntityComponent,
    ViewSingleEntityComponent,
    ViewDataOfEntityComponent,
    SigninComponent,
    SignupComponent,
    FourOhFourComponent
  ],
  exports: [
    RouterModule
] ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FieldService, 
    EntitysService, 
    AuthService
    //AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);