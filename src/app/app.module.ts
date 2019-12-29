import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OpenWeatherService } from "./services/open-weather.service";
import { OpenStreetMapService } from "./services/open-street-map.service";

import { Routes, RouterModule } from '@angular/router';
import { TestbdComponent } from './components/testbd/testbd.component';

const appRoutes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent,
    TestbdComponent
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
