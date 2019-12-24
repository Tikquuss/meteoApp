import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OpenWeatherService } from "./services/open-weather.service";
import { OpenStreetMapService } from "./services/open-street-map.service";

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ajoutés
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    // ajoutés
    OpenWeatherService, 
    OpenStreetMapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
