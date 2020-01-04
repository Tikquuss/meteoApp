import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserStoreService } from '../services/user-store.service';
import { Router} from '@angular/router';

// Mengong to Mengong
import { LoginComponent} from '../login/login.component';

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
    // Mengong : refaire le formulaire comme suit
    const user = LoginComponent.bdComponent.getUserCourant();
    /*
    console.log("----------",user);
    this.form = this.fb.group({
      nom: [user.nom, Validators.required],
      dateNaissance: [user.dateNaissance, Validators.required],
      sexe: [user.sexe, Validators.required],
      photo: [user.photo, Validators.required],
      ville: [user.ville, Validators.required],
      password: [user.mdp, Validators.required]
    });
    //*/
    //*
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      profilePicture: ['', Validators.required]
    });
    //*/
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
