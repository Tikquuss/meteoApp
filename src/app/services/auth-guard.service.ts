import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStoreService } from './user-store.service';
// import { Observable } from 'rxjs/Observable';
// import * as firebase from 'firebase';

/*
  Puisque la vérification de l'authentification est asynchrone, ce service
  retournera une Promise
*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private userStore: UserStoreService) { }



  /*canActivate(): Observable<boolean> | Promise<boolean> | boolean {
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
  }*/

  canActivate(): boolean {
    if (this.userStore.isLoggedIn) { return true; }
    // Can store current route and redirect back to it
    // Store it in a service, add it to a query param
    this.router.navigate(['login']);
    return false;
  }
}

