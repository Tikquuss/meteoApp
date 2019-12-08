/*
Nous avons créés trois méthodes :
 - une méthode permettant de créer un nouvel utilisateur;
 - une méthode permettant de connecter un utilisateur existant;
 - une méthode permettant la déconnexion de l'utilisateur.

Puisque les opérations de création, de connexion et de déconnexion sont asynchrones, c'est-à-dire 
qu'elles n'ont pas un résultat instantané, les méthodes que vous allez créer pour les gérer 
retourneront des Promise, ce qui permettra également de gérer les situations d'erreur.
*/

import { Injectable } from '@angular/core';

//import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Toutes les méthodes liées à l'authentification Firebase se trouvent 
  // dans firebase.auth()

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        /*
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
        //*/
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        /*
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
        //*/
      }
    );
  }

  signOutUser() {
    //firebase.auth().signOut();
  }

  // Mes propres methodes
  
  // Sign up with email/password
  SignUp(email, password) {
    return new Promise(
      (resolve, reject) => {
        /*
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (result) => {
            // Call the SendVerificaitonMail() function when new user sign up and returns promise 
            this.SendVerificationMail();
            this.SetUserData(result.user);
          }
        ).catch((error) => {
          window.alert(error.message)
        });
        //*/
      }
    );
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    /*
    return firebase.auth.currentUser.sendEmailVerification()
    .then(() => {
      //this.router.navigate(['verify-email-address']);
    })
    */
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    /*
    return firebase.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
    */
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    //return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    /*
    return firebase.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
    */
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    /*
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
    */
  }

  // Sign out 
  SignOut() {
    /*
    return firebase.auth.signOut().then(() => {
      localStorage.removeItem('user');
      //this.router.navigate(['sign-in']);
    })
    */
  }

}
