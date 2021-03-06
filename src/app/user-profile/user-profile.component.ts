import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
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
export class UserProfileComponent implements OnInit, AfterViewChecked {

    public form: FormGroup;
    public submitting = false;
    public editState = false;
    public user: Utilisateur;
    public url: string;
    public files: FileList;
    public errorMessage = '';
    private printed: boolean;

    @ViewChild('profilePicture', { static: false }) profilePicture: ElementRef<HTMLElement>;

    constructor(
        private fb: FormBuilder,
        private userStore: UserStoreService,
        private router: Router,
        private bdService: BdlocaleService,
        private parserFormatter: NgbDateParserFormatter) {
        this.user = LoginComponent.bdComponent.getUserCourant();
        this.url = 'assets/img/user.jpg';
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
        const birthDate = this.user.dateNaissance.toISOString().split('T')[0].split('-');
        const year = birthDate[0];
        const month = birthDate[1];
        const day = birthDate[2];
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
        const el: HTMLElement = this.profilePicture.nativeElement;
        el.click();
    }

    ngOnInit() {
        this.updatePhoto();
    }

    updatePhoto() {
        if (this.user.photo !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(this.user.photo);
            reader.onload = (theFile => {
                return e => {
                    const img = document.getElementById('profiluser');
                    img.setAttribute('src', e.target.result);
                };
            })(this.user.photo);
        } else {
            const img = document.getElementById('profiluser');
            img.setAttribute('src', this.url);
        }
    }
    edit() {
        document.getElementById('customFileLangHTML').addEventListener('change', this.handleFileSelect, false);
    }
    async OnSave() {
        this.submitting = true;
        const ville = await this.bdService.getVilleByNom(this.form.get('ville').value);
        console.log('ville' + ville);
        if (ville && this.form.valid) {
            this.errorMessage = '';
            const img = await this.bdService.getImg('img0');
            const user = new Utilisateur();
            user.nom = this.form.get('nom').value;
            user.dateNaissance = new Date(this.parserFormatter.format(this.form.get('dateNaissance').value));
            user.sexe = this.form.get('sexe').value;
            if (img) {
                user.photo = img.img;
            } else {
                user.photo = this.user.photo;
            }

            user.ville = this.form.get('ville').value;
            user.mdp = this.form.get('password').value;

            this.bdService.removeUser(LoginComponent.bdComponent.getUserCourant().nom);
            LoginComponent.bdComponent.updateUser(user);
            LoginComponent.bdComponent.setUserCourant(user);
            this.user = user;
            this.updatePhoto();
            this.editState = false;
        } else {
            this.errorMessage = 'Informations invalides. Remplissez tous les champs et vérifiez que votre ville est correcte';
        }
        this.submitting = false;
    }

    handleFileSelect(evt) {
        this.files = evt.target.files;
        console.log('fichier 1 ', this.files);
        const bdService = new BdlocaleService();
        const file = this.files[0];
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (theFile => {
                return e => {
                    const item = document.getElementById('idSpan');
                    if (item !== null) {
                        item.remove();
                        console.log('suppression des spans');
                    }

                    const span = document.createElement('span');
                    span.id = 'idSpan';
                    span.innerHTML = ['<img class="thumbnail" src="', e.target.result,
                        '" title="', escape(theFile.name), '" width=50 height=50/>'].join('');
                    document.getElementById('list').insertBefore(span, null);
                };
            })(file);

            reader.readAsDataURL(file);
            bdService.setImg({ nom: 'img0', img: this.files[0] });
        } else {
            bdService.setImg({ nom: 'img0', img: null });
        }
    }

    ngAfterViewChecked() {
        const container = document.querySelector('.fk-load-user-profile') as HTMLElement;
        const duration = 200; // 400ms
        const dt = 25;
        if (container && !this.printed) {
            this.printed = true;
            const max = parseInt(container.style.marginLeft, 10);
            // console.log('chargement du login');
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
        const target = event.target as Element;
        const siblins: any = target.parentNode.children;
        for (const elt of siblins) {
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
}
