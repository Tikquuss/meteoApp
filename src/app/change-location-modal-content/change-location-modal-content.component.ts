import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Fandio to Mengong
import { BdlocaleService } from '../services/bdlocale.service';

// Mengong to Mengong
import { InterfaceMeteoComponent } from '../interface-meteo/interface-meteo.component';
import { LoginComponent } from '../login/login.component';
import { __await } from 'tslib';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-change-location-modal-content',
  templateUrl: './change-location-modal-content.component.html',
  styleUrls: ['./change-location-modal-content.component.css']
})
export class ChangeLocationModalContentComponent implements OnInit {

  @Input() name;
  public form: FormGroup;
  public countries: string[];
  public regions: string[];
  public cities: string[];
  public afficheRegion: boolean = false;
  public afficheVille: boolean = false;

  public static villeSubject = new Subject<string>();

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private bdlocaleService: BdlocaleService,
    private router: Router) {
      /*this.initPays().then(()=>{
        this.createForm();
        console.log("liste pays" + this.countries);
      });
      */
      this.getCountries().then((co) =>  {
        this.countries = co;
     });
     
      this.createForm();
  }

  public static emitVilleSubject(othercity) {
    ChangeLocationModalContentComponent.villeSubject.next(othercity);
  }

  onChangePays(pays){
    this.afficheRegion = false;
    this.afficheVille = false;
    if(pays){
      console.log(pays);
      this.getRegionOfSelectedCountrie(pays).then((re)=>{
        this.regions = re;
        this.afficheRegion = true;
      });
    }
  }

  onChangeRegion(region){
    this.afficheVille = false;
    if(region){
      console.log(region);
      this.getCitiesOfSelectedRegion(region).then((ci)=>{
        this.cities = ci;
        this.afficheVille = true;
      });
    }
  }
  async initPays() {
    let coun = await this.bdlocaleService.getCountries();
    this.countries.concat(coun);
  }

  createForm() {
    this.form = this.fb.group({
      country: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  get country() { return this.form.get('country'); }

  get region() { return this.form.get('region'); }

  get city() { return this.form.get('city'); }

  async ngOnInit() {
  }

  // Ajoutées

  /**
   *
   * @param
   */
  async getCountries(): Promise<string[]>{
    let coun = await this.bdlocaleService.getCountries();
    let res = [''].concat(coun);
    console.log(res);
    return Promise.resolve(res);
  }
  /**
   * Retourne les regions du pays selectionné dans le modal
   * @param {countrie : String}
   * * @returns {Array of regions}
   */
  async getRegionOfSelectedCountrie(countrie): Promise<string[]> {
    let res = await this.bdlocaleService.getRegionsByCountrie(countrie);
    console.log(res);
    return Promise.resolve([''].concat(res));
  }

  /**
   * Retourne les villes de la region selectionnée dans le modal
   * @param {region : String}
   * * @returns {Array of cities}
   */
  async getCitiesOfSelectedRegion(region): Promise<string[]> {
    let res = await this.bdlocaleService.getVillesByRegion(region);
    console.log(res);
    return Promise.resolve([''].concat(res));
  }
  

  /**
   * Ecouteur du boutton enregistré
   * @param {}
   * * @returns {}
   */
  onSave() {
    // Todo : faire en sorte que le modal se ferme
    console.log(this.country.value);
    console.log(this.region.value);
    console.log(this.city.value);
    
    LoginComponent.bdComponent.getUserCourant().ville = this.city.value;
    LoginComponent.bdComponent.updateUser(LoginComponent.bdComponent.getUserCourant()).then((cc)=>{
      //recharger la page INTERFACE METEO
      //this.router.navigate(['']);
      ChangeLocationModalContentComponent.emitVilleSubject(this.city.value);
    });

    this.activeModal.close('Close click');
  }
}
