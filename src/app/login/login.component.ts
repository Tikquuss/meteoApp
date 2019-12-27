import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitting: Boolean = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private userStore: UserStoreService) {
    this.createForm();
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
      this.userStore.isLoggedIn = true;
      this.router.navigate(['']);
    }
    this.submitting = false;
  }

  ngOnInit() {
  }

}
