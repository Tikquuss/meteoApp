import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  /* Puisque la vérification de l'authentification est asynchrone, ce service retournera une Promise*/
  /*
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
  //*/
}