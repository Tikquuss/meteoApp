import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

// Fandio to Mengong
import { TestbdComponent } from '../components/testbd/testbd.component'
import { BdlocaleService } from '../services/bdlocale.service';
import { Utilisateur } from '../models/utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public static bdComponent: TestbdComponent;
  public form: FormGroup;
  public submitting: boolean = false;
  public errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private userStore: UserStoreService,
    private bdService: BdlocaleService) {
    this.createForm();
    LoginComponent.bdComponent = new TestbdComponent(bdService);  
    LoginComponent.bdComponent.ngOnInit();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.submitting = true;
    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      console.log(this.form.value);
      LoginComponent.bdComponent.assignUser(username, password).then(
        (success) => {
          if (success) {
            this.userStore.isLoggedIn = true;
            this.bdService.getUserByUserName(username).then(
              (user: Utilisateur) => {
                LoginComponent.bdComponent.setUserCourant(user);
              }
            );
            console.log("connexion reussie");
          } else {
            this.errorMessage = "Utilisateur introuvable";
            this.userStore.isLoggedIn = false;
            console.log("connexion échouée")
          }
          this.router.navigate(['']);
        },
        (error) => {
          console.log("erreur de connexion\n", error)
        }
      );
    }
    this.submitting = false;
  }

  ngOnInit() {
  }
}
