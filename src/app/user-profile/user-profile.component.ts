import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserStoreService } from '../services/user-store.service';
import { Router} from '@angular/router';

// Mengong to Mengong
import { LoginComponent} from '../login/login.component';

// Fandio to Mengong
import { Utilisateur } from '../models/utilisateur';
import { BdlocaleService } from '../services/bdlocale.service';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public form: FormGroup;
  public submitting: boolean = false;
  public editState: boolean = false;
  public user: Utilisateur;

  @ViewChild('profilePicture', { static: false}) profilePicture: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder,
              private userStore: UserStoreService,
              private router: Router,
              private bdService: BdlocaleService,
              private parserFormatter: NgbDateParserFormatter) {
    this.createForm();
  }

  createForm() {
    // Mengong : refaire le formulaire comme suit
    this.user = LoginComponent.bdComponent.getUserCourant();
    this.form = this.fb.group({
      nom: [this.user.nom, Validators.required],
      dateNaissance: ['', Validators.required],
      sexe: [this.user.sexe, Validators.required],
      photo: [''/*user.photo*/, Validators.required],
      ville: [this.user.ville, Validators.required],
      password: [this.user.mdp, Validators.required]
    });
    let birthDate = this.user.dateNaissance.toISOString().split('T')[0].split('-');
    let year = birthDate[0];
    let month = birthDate[1];
    let day = birthDate[2];
    this.form.get('dateNaissance').setValue({
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      day: parseInt(day, 10)
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

  OnSave() {
    this.submitting = true;
    if (this.form.valid) {

      let user = new Utilisateur();
      user.nom = this.form.get('nom').value;
      user.dateNaissance = new Date(this.parserFormatter.format(this.form.get('dateNaissance').value));
      user.sexe = this.form.get('sexe').value;
      user.photo = this.form.get('photo').value;
      user.ville = this.form.get('ville').value;
      user.mdp = this.form.get('password').value;

      LoginComponent.bdComponent.updateUser(user);
      this.bdService.removeUser(LoginComponent.bdComponent.getUserCourant());
      LoginComponent.bdComponent.setUserCourant(user);
      this.editState = false;
    }
    this.submitting = false;
  }

}
