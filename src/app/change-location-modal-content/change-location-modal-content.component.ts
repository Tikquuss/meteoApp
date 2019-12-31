import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder) {
    this.countries = ['', 'Cameroon', 'Nigeria', 'South Africa'];
    this.regions = ['', 'Center', 'Littoral', 'South', 'East', 'North'];
    this.cities = ['', 'Yaoundé', 'Douala'];
    this.createForm();
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

  ngOnInit() {
  }

}
