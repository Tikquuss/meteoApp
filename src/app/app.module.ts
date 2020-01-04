import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'

import { OpenWeatherService } from './services/open-weather.service';
import { OpenStreetMapService } from './services/open-street-map.service';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangeLocationModalContentComponent} from './change-location-modal-content/change-location-modal-content.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserStoreService } from './services/user-store.service';
import { AuthGuardService } from './services/auth-guard.service';

import { TestbdComponent } from './components/testbd/testbd.component';
import { InterfaceMeteoComponent } from './interface-meteo/interface-meteo.component';

const appRoutes: Routes = [
  { path: '', loadChildren: './hourly-weekly/hourly-weekly.module#HourlyWeeklyModule', canActivate: [AuthGuardService] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChangeLocationModalContentComponent,
    UserProfileComponent,
    TestbdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // ajoutés
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule, // Preferables aux template driven forms
    NgbModule // Pour les styles de bootstrap
  ],
  providers: [
    // ajoutés
    UserStoreService,
    OpenWeatherService,
    OpenStreetMapService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ChangeLocationModalContentComponent,
  ]
})
export class AppModule { }

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../environments/environment';
if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);