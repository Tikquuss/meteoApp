import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Fandio to Mengong
import { BdlocaleService } from '../services/bdlocale.service';

// Mengong to Mengong
import { InterfaceMeteoComponent } from '../interface-meteo/interface-meteo.component';

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

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private bdlocaleService: BdlocaleService) {
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
    InterfaceMeteoComponent.city = this.city.value;
    this.activeModal.close('Close click');
  }
}
