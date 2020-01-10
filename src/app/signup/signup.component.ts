import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Fandio to Mengong
import { TestbdComponent } from '../components/testbd/testbd.component'
import { BdlocaleService } from '../services/bdlocale.service';
import { Utilisateur } from '../models/utilisateur';

import { LoginComponent} from '../login/login.component';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

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
  public files: FileList;

  @ViewChild('profilePicture', { static: false }) profilePicture: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder,
              private router: Router,
              private bdService: BdlocaleService,
              private parserFormatter: NgbDateParserFormatter) {
    this.createForm();
    this.files = null;
    this.bdComponent = new TestbdComponent(bdService);
  }

  createForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      sexe: ['', Validators.required],
      photo: [''],
      ville: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  handleFileSelect(evt) {
    this.files = evt.target.files;
    console.log("fichier 1 ", this.files);
    let bdService = new BdlocaleService();
    var file = this.files[0];
    if (this.files!=null && file.type.match('image.*')) {
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

  async submit() {
    this.submitting = true;
    let ville = await this.bdService.getVilleByNom(this.form.get('ville').value);
    console.log("ville" + ville);
    if (ville && this.form.valid) {
      //console.log(this.form.value);
      this.errorMessage = '';
      let img = await this.bdService.getImg('img0');
      let user = new Utilisateur();
      user.nom = this.form.get('nom').value;
      user.dateNaissance = new Date(this.parserFormatter.format(this.form.get('dateNaissance').value));
      user.sexe = this.form.get('sexe').value;
      if(img)
        user.photo = img.img;
      else
        user.photo = null;
      user.ville = this.form.get('ville').value;
      user.mdp = this.form.get('password').value;
      this.bdService.setUser(user).then(
        (success) => {
          if (success) {
            LoginComponent.bdComponent.setUserCourant(user);
            console.log("inscription reussie", success);
          } else {
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
    } else {
      this.errorMessage = 'Informations invalides. Remplissez tous les champs et vérifiez que votre ville est correcte';
    }
    this.submitting = false;
  }

  triggerClick() {
    let el: HTMLElement = this.profilePicture.nativeElement;
    el.click();
  }

  ngOnInit() {
    document.getElementById("customFileLangHTML").addEventListener('change', this.handleFileSelect, false);
  }

}
