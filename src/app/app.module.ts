import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'

import { OpenWeatherService } from './services/open-weather.service';
import { OpenStreetMapService } from './services/open-street-map.service';

import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangeLocationModalContentComponent} from './change-location-modal-content/change-location-modal-content.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserStoreService } from './services/user-store.service';
import { AuthGuardService } from './services/auth-guard.service';
import { TestOpenWeatherServiceComponent } from './test-open-weather-service/test-open-weather-service.component';
=======
import { TestbdComponent } from './components/testbd/testbd.component';
>>>>>>> 292e5f3ce4d21cf0612a791a5a3a7d2e4292e646

const appRoutes: Routes = [
  { path: '', loadChildren: './hourly-weekly/hourly-weekly.module#HourlyWeeklyModule', canActivate: [AuthGuardService] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    LoginComponent,
    SignupComponent,
    ChangeLocationModalContentComponent,
    UserProfileComponent,
    TestOpenWeatherServiceComponent,
=======
    TestbdComponent
>>>>>>> 292e5f3ce4d21cf0612a791a5a3a7d2e4292e646
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
