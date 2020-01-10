<<<<<<< HEAD
import { Component, OnInit, AfterViewChecked } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac
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

export class LoginComponent implements OnInit, AfterViewChecked {

<<<<<<< HEAD
    public static bdComponent: TestbdComponent;
    public form: FormGroup;
    public submitting: boolean = false;
    public errorMessage: string = '';
    private printed: boolean;

    constructor(private fb: FormBuilder,
        private router: Router,
        private userStore: UserStoreService,
        private bdService: BdlocaleService) {
        this.createForm();
        LoginComponent.bdComponent = new TestbdComponent(bdService);
        LoginComponent.bdComponent.ngOnInit();
    }
=======
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
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac

    createForm() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

<<<<<<< HEAD
    submit() {
        this.submitting = true;
        if (this.form.valid) {
            this.errorMessage = '';
            const username = this.form.get('username').value;
            const password = this.form.get('password').value;
            //console.log(this.form.value);
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
                        console.log("connexion échouée");
                    }
                    this.router.navigate(['']);
                },
                (error) => {
                    console.log("erreur de connexion\n", error);
                }
            );
        } else {
            this.errorMessage = 'Certains champs sont invalides';
        }
        this.submitting = false;
    }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        const container = document.querySelector('.fk-load-login') as HTMLElement;
        const duration = 200; // 400ms
        const dt = 25;
        if (container && !this.printed) {
            this.printed = true;
            const max = parseInt(container.style.marginLeft, 10);
            //console.log('chargement du login');
            const tmp = setInterval(() => {
                container.style.opacity = parseFloat(container.style.opacity) + String(1 / (duration / dt));
                // container.style.marginLeft = String(parseFloat(container.style.marginLeft) - (max / (duration / dt))) + 'px';
            }, dt);
            setTimeout(() => {
                clearInterval(tmp);
                container.style.opacity = '1';
                // container.style.marginLeft = '0px';
            }, duration);
        }
    }
=======
  submit() {
    this.submitting = true;
    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      //console.log(this.form.value);
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
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac
}
