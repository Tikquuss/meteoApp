import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';

// Mengong to Mengong
import { LoginComponent } from '../login/login.component';

// Fandio to Mengong
import { Utilisateur } from '../models/utilisateur';
import { BdlocaleService } from '../services/bdlocale.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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
  public url: string;
  public files: FileList;

  @ViewChild('profilePicture', { static: false }) profilePicture: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder,
    private userStore: UserStoreService,
    private router: Router,
    private bdService: BdlocaleService,
    private parserFormatter: NgbDateParserFormatter) {
    this.user = LoginComponent.bdComponent.getUserCourant();
    this.url = "assets/img/user.jpg";
    this.createForm();
    this.files = null;
  }

  createForm() {
    // Mengong : refaire le formulaire comme suit
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
    if (this.user.photo !== null) {
      var reader = new FileReader();
      reader.readAsDataURL(this.user.photo);
      reader.onload = (function (theFile) {
        return function (e) {
          let img = document.getElementById("profiluser");
          console.log("avant" + img.getAttribute('src'));
          img.setAttribute('src', e.target.result);
        };
      })(this.user.photo);
    }
  }

  edit(){
    this.editState = true;
    document.getElementById("customFileLangHTML").addEventListener('change', this.handleFileSelect, false);
  }
  async OnSave() {
    this.submitting = true;
    if (this.form.valid) {
      let img = await this.bdService.getImg('img0');
      let user = new Utilisateur();
      user.nom = this.form.get('nom').value;
      user.dateNaissance = new Date(this.parserFormatter.format(this.form.get('dateNaissance').value));
      user.sexe = this.form.get('sexe').value;
      if(img !== undefined)
        user.photo = img.img;
      else
        user.photo = null;

      user.ville = this.form.get('ville').value;
      user.mdp = this.form.get('password').value;

      LoginComponent.bdComponent.updateUser(user);
      this.bdService.removeUser(LoginComponent.bdComponent.getUserCourant());
      LoginComponent.bdComponent.setUserCourant(user);
      this.editState = false;
    }
    this.submitting = false;
  }

  handleFileSelect(evt) {
    this.files = evt.target.files;
    console.log("fichier 1 ", this.files);
    let bdService = new BdlocaleService();
    var file = this.files[0];
    if (file.type.match('image.*')) {
      var reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          let item = document.getElementById("idSpan");
          if (item !== null) {
            item.remove();
            console.log("suppression des spans");
          }

          var span = document.createElement('span');
          span.id = "idSpan";
          span.innerHTML = ['<img class="thumbnail" src="', e.target.result,
            '" title="', escape(theFile.name), '" width=50 height=50/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(file);

      reader.readAsDataURL(file);
      bdService.setImg({'nom': 'img0', 'img':this.files[0]});
    }
    else{
      bdService.setImg({'nom': 'img0', 'img':null});
    }
  }
}
