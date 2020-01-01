import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

// Fandio to Mengong
import {TestbdComponent} from '../components/testbd/testbd.component'
import { BdlocaleService } from '../services/bdlocale.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitting: Boolean = false;
  public bdComponent : TestbdComponent;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userStore: UserStoreService,
              private bdService: BdlocaleService) {
    this.createForm();
    this.bdComponent = new TestbdComponent(bdService);
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
      /*
      this.bdComponent.assignUser(username, password).then(
        (success) => {
          this.userStore.isLoggedIn = true;
          //this.bdComponent.setUserCourant()
          this.router.navigate(['']);
          console.log("connexion reussi", success)
        },
        (error) => {
          console.log("connexion échouée", error)
        }
      );
      */
    }
    this.userStore.isLoggedIn = true;
    this.submitting = false;
    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
