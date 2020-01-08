import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

// Fandio to Mengong
import {TestbdComponent} from '../components/testbd/testbd.component'
import { BdlocaleService } from '../services/bdlocale.service';
import { Utilisateur } from '../models/utilisateur';

import { LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public submitting: boolean = false;
  public errorMessage: string = '';
  public bdComponent: TestbdComponent;

  @ViewChild('profilePicture', { static: false}) profilePicture: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder,
              private router: Router,
              private bdService: BdlocaleService) {
    this.createForm();
    this.bdComponent = new TestbdComponent(bdService);
  }

  createForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      sexe: ['', Validators.required],
      photo: ['', Validators.required],
      ville: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.submitting = true;
    if (this.form.valid) {
        console.log(this.form.value);
        let user = new Utilisateur();
        user.nom = this.form.get('nom').value;
        user.dateNaissance = this.form.get('dateNaissance').value;
        user.sexe = this.form.get('sexe').value;
        user.photo = this.form.get('photo').value;
        user.ville = this.form.get('ville').value;
        user.mdp = this.form.get('password').value;
        this.bdService.setUser(user).then(
          (success) => {
            if (success) {
              LoginComponent.bdComponent.setUserCourant(user);
              console.log("inscription reussie", success);
            }else{
              this.errorMessage = "Informations invalides";
              console.log("inscription échouée\n", success);
            }
          },
          (error) => {
            console.log('erreur de connexion\n', error)
          }
        );
        // */
        this.router.navigate(['']);
      } else{
        this.errorMessage = 'Informations invalides';
      }
      this.submitting = false;
    }

  triggerClick() {
    let el: HTMLElement = this.profilePicture.nativeElement;
    el.click();
  }

  ngOnInit() {
  }

}
