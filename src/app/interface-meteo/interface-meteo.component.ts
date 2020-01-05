import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';

// Nanda to Mengong
import * as L from 'leaflet';
import {OpenStreetMapService} from '../services/open-street-map.service';

// Penano to Mengong
import { OpenWeatherService } from '../services/open-weather.service';

import { LoginComponent} from '../login/login.component';
import {Utilisateur} from '../models/utilisateur';

@Component({
  selector: 'app-interface-meteo',
  templateUrl: './interface-meteo.component.html',
  styleUrls: ['./interface-meteo.component.css']
})

export class InterfaceMeteoComponent implements OnInit {

  public static city: string;
  public times = [];
  public time: string;
  public temperature: number;
  public pluviometry: string;
  public humidity: number;
  public ind: number;
  public hourly: boolean = true;
  public weekly: boolean = false;
  public user: Utilisateur;

  constructor(private userStore: UserStoreService,
              private router: Router,
              private  openStreetMapService: OpenStreetMapService,
              private openWeatherService: OpenWeatherService) {
    this.times =  this.openWeatherService.times;
    this.time = this.openWeatherService.getTime();
    this.ind = this.openWeatherService.getTimeIndex(this.time);
    InterfaceMeteoComponent.city = OpenStreetMapService.getVilleName();
    console.log('InterfaceMeteoComponent.city', InterfaceMeteoComponent.city);
    // *
    this.user = LoginComponent.bdComponent.getUserCourant();
    // *
    let meteo = this.openWeatherService.getValuesByVille(InterfaceMeteoComponent.city);
    this.temperature = meteo.temperature;
    this.pluviometry = meteo.pluviometrie;
    this.humidity = meteo.humidite;
    // */
    /*
    this.temperature = Math.floor(Math.random() * 100);
    this.pluviometry = 'ESE '+ Math.floor(Math.random() * 1000)+' m/s';
    this.humidity = Math.floor(Math.random() * 100);
    //*/
  }

  get city(): string {
    return InterfaceMeteoComponent.city;
  }



  ngOnInit() {
    this.openStreetMapService.initMap(L, 'open-street-map', '4GI_Tikquuss_Team');
  }

  getPosition(){
    console.log('position-----------');
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
