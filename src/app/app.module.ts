import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { SingleFieldComponent } from './single-field/single-field.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldService } from './services/field.service';

import { Routes, RouterModule } from '@angular/router';

import { SingleModalComponent } from './single-modal/single-modal.component';
import { BrouillonComponent } from './brouillon/brouillon.component';
import { AppFormComponent } from './app-form/app-form.component';
import { FormHeaderComponent } from './form-header/form-header.component';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../environments/environment';
if (environment.production) {
  enableProdMode();
}

export var appRoutes: Routes = [
  { path: 'form', component:  AppFormComponent },
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: '**', redirectTo: 'form' }
];

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    SingleFieldComponent,
    SingleModalComponent,
    BrouillonComponent,
    AppFormComponent,
    FormHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FieldService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);