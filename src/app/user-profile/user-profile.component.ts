import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserStoreService } from '../services/user-store.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public form: FormGroup;
  public submitting: Boolean = false;
  public editState: Boolean = false;
  @ViewChild('profilePicture', { static: false}) profilePicture: ElementRef<HTMLElement>;
  constructor(private fb: FormBuilder,
              private userStore: UserStoreService,
              private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      profilePicture: ['', Validators.required]
    });
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }

  triggerClick() {
    let el: HTMLElement = this.profilePicture.nativeElement;
    el.click();
  }

  ngOnInit() {
  }

}
