import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

// Fandio to Mengong
import {TestbdComponent} from '../components/testbd/testbd.component'
import { BdlocaleService } from '../services/bdlocale.service';
import { Utilisateur } from '../models/utilisateur';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public submitting: boolean = false;

  public bdComponent : TestbdComponent;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private bdService: BdlocaleService) {
    this.createForm();
    this.bdComponent = new TestbdComponent(bdService);
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.submitting = true;
    if (this.form.valid) {
      //const username = this.form.get('username').value;
      //const password = this.form.get('password').value;
        console.log(this.form.value);
        let user = new Utilisateur();
        user.dateNaissance = new Date();
        user.mdp = "emma2";
        user.nom = "emma2";
        user.photo = "link";
        user.sexe = "Homme";
        user.ville = "Douala";
        this.bdComponent.updateUser(user);
        //*
        this.bdService.setUser(user).then(
          (success) => {
            console.log("inscription reussi", success)
            LoginComponent
          },
          (error) => {
            console.log("inscription échouée", error)
          }
        );
        //*/
       this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

}
