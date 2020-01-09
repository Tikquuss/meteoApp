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
  public time= 'string';
  public temperature: number;
  public pluviometry: string;
  public humidity: number;
  public ind: number;
  public hourly: boolean = true;
  public weekly: boolean = false;
  public user: Utilisateur;
  public url: string = "assets/img/user.jpg";

  constructor(private userStore: UserStoreService,
              private router: Router,
              private  openStreetMapService: OpenStreetMapService,
              private openWeatherService: OpenWeatherService) {

    this.user = LoginComponent.bdComponent.getUserCourant();
    this.url = "assets/img/user.jpg";

    console.log(this.url);
    InterfaceMeteoComponent.city = this.user.ville;
    openStreetMapService.ville =  this.user.ville;
    //openStreetMapService.latitude = this.user.ville.posX;
    //openStreetMapService.longitude = this.user.ville.posY;
    this.times =  this.openWeatherService.goodtimes();
    this.updateInterface();
  }

  updateInterface(){
    this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
      (data) => {
        this.temperature = Math.round(data.main.temp-273); // °C
        this.pluviometry = 'ESE '+ Math.floor(Math.random() * 100)+' m/s'; // l'api ne renvoie pas la pluviometrie
        this.humidity = Math.round(data.main.humidity); //%
        this.time = data.weather["0"].main;
        this.ind = this.openWeatherService.getTimeIndex(this.time);
      },
      (error) => {
        console.log('Erreur de recuperation de la météo\n',error);
      }, 
      () => {
        console.log('Fin récuperation de la météo');
      }
    );
  }

  updateCity(){
    if(OpenStreetMapService.ville != InterfaceMeteoComponent.city){
        InterfaceMeteoComponent.city = OpenStreetMapService.ville;
        this.updateInterface();
    }
  }

  get city(): string {
    return InterfaceMeteoComponent.city;
  }

  set city(othercity){
    InterfaceMeteoComponent.city = othercity;
  }

  ngOnInit() {
    this.openStreetMapService.initMap(L, 'open-street-map', '4GI_Tikquuss_Team');
    if (this.user.photo !== null) {
      var reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          let img = document.getElementById("profil");
          img.setAttribute('src',e.target.result);
        };
      })(this.user.photo);

      reader.readAsDataURL(this.user.photo);
    }
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
