<<<<<<< HEAD
import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
=======
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';

// Mengong to Mengong
import { LoginComponent } from '../login/login.component';

// Fandio to Mengong
import { Utilisateur } from '../models/utilisateur';
import { BdlocaleService } from '../services/bdlocale.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { SelectorFlags } from '@angular/compiler/src/core';
=======
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
<<<<<<< HEAD
export class UserProfileComponent implements OnInit, AfterViewChecked {

    public form: FormGroup;
    public submitting: boolean = false;
    public editState: boolean = false;
    public user: Utilisateur;
    public url: string;
    public files: FileList;
    private printed: boolean;

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
            photo: [''/*user.photo*/],
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

    edit() {
        this.editState = true;
        setTimeout(() => {
            let sexeM = document.getElementById('gridRadios1');
            let sexeF = document.getElementById('gridRadios2');
            if (this.user.sexe !== 'Homme') {
                sexeM.toggleAttribute('checked');
                sexeM.parentElement.classList.remove('active');
                sexeF.toggleAttribute('checked');
                sexeF.parentElement.classList.add('active');
            }
            console.log(this.user.sexe);
        }, 100);
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
            if (img !== undefined)
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
        console.log(this.form);
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
            bdService.setImg({ 'nom': 'img0', 'img': this.files[0] });
        }
        else {
            bdService.setImg({ 'nom': 'img0', 'img': null });
        }
    }

    ngAfterViewChecked() {
        const container = document.querySelector('.fk-load-user-profile') as HTMLElement;
        const duration = 200; // 400ms
        const dt = 25;
        if (container && !this.printed) {
            this.printed = true;
            const max = parseInt(container.style.marginLeft, 10);
            //console.log('chargement du login');
            const tmp = setInterval(() => {
                container.style.opacity = parseFloat(container.style.opacity) + String(1 / (duration / dt));
                container.style.marginLeft = String(parseFloat(container.style.marginLeft) - (max / (duration / dt))) + 'px';
            }, dt);
            setTimeout(() => {
                clearInterval(tmp);
                container.style.opacity = '1';
                container.style.marginLeft = '0px';
            }, duration);
        }
    }

    fkActivateRadio(event: Event) {
        let target = event.target as Element;
        let siblins: any = target.parentNode.children;
        for (let elt of siblins) {
            if ((elt as Node).nodeName !== 'LABEL' || (elt as Element).getAttribute('title') === 'sexe') {
                continue;
            }
            elt.classList.remove('active');
            elt.firstElementChild.removeAttribute('checked');
        }
        if (target.nodeName === 'LABEL') {
            target.classList.add('active');
            target.firstElementChild.toggleAttribute('checked');
        }
    }
=======
export class UserProfileComponent implements OnInit {

  public form: FormGroup;
  public submitting: boolean = false;
  public editState: boolean = false;
  public user: Utilisateur;
  public url: string;
  public files: FileList;
  public errorMessage: string = '';
  
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
      photo: [''/*user.photo*/],
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
    this.updatePhoto();
  }

  updatePhoto() {
    if (this.user.photo !== null) {
      var reader = new FileReader();
      reader.readAsDataURL(this.user.photo);
      reader.onload = (function (theFile) {
        return function (e) {
          let img = document.getElementById("profiluser");
          img.setAttribute('src', e.target.result);
        };
      })(this.user.photo);
    }
    else {
      let img = document.getElementById("profiluser");
      img.setAttribute('src', this.url);
    }
  }
  edit() {
    document.getElementById("customFileLangHTML").addEventListener('change', this.handleFileSelect, false);
  }
  async OnSave() {
    this.submitting = true;
    let ville = await this.bdService.getVilleByNom(this.form.get('ville').value);
    console.log("ville" + ville);
    if (ville && this.form.valid) {
      this.errorMessage = '';
      let img = await this.bdService.getImg('img0');
      let user = new Utilisateur();
      user.nom = this.form.get('nom').value;
      user.dateNaissance = new Date(this.parserFormatter.format(this.form.get('dateNaissance').value));
      user.sexe = this.form.get('sexe').value;
      if (img)
        user.photo = img.img;
      else
        user.photo = this.user.photo;

      user.ville = this.form.get('ville').value;
      user.mdp = this.form.get('password').value;

      this.bdService.removeUser(LoginComponent.bdComponent.getUserCourant().nom);
      LoginComponent.bdComponent.updateUser(user);
      LoginComponent.bdComponent.setUserCourant(user);
      this.user = user;
      this.updatePhoto();
      this.editState = false;
    }
    else{
      this.errorMessage = 'Informations invalides. Remplissez tous les champs et vérifiez que votre ville est correcte';
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
      bdService.setImg({ 'nom': 'img0', 'img': this.files[0] });
    }
    else {
      bdService.setImg({ 'nom': 'img0', 'img': null });
    }
  }
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac
}
