import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

//Mengong to Mengong
import { UserStoreService } from '../services/user-store.service';
import { LoginComponent} from '../login/login.component';
// Nanda to Mengong
import * as L from 'leaflet';
import {OpenStreetMapService} from '../services/open-street-map.service';
// Penano to Mengong
import { OpenWeatherService } from '../services/open-weather.service';
//Fandio to Mengong
import {Utilisateur} from '../models/utilisateur';
import { BdlocaleService } from '../services/bdlocale.service';

@Component({
  selector: 'app-interface-meteo',
  templateUrl: './interface-meteo.component.html',
  styleUrls: ['./interface-meteo.component.css']
})

export class InterfaceMeteoComponent implements OnInit {

  public static city: string;
  villeSubscription: Subscription;

  public times = [];
  public time : string;
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
              private openWeatherService: OpenWeatherService,
              private bdlocaleService : BdlocaleService) {
    
    this.times =  this.openWeatherService.goodtimes();
    
    this.user = LoginComponent.bdComponent.getUserCourant();
    InterfaceMeteoComponent.city = this.user.ville;
    OpenStreetMapService.ville =  this.user.ville;
    bdlocaleService.getVilleByNom(this.user.ville).then(
      (ville) => {
        OpenStreetMapService.latitude = ville.posX; 
        OpenStreetMapService.longitude = ville.posY;
        this.updateInterface();
      },
      (error) => {
        console.log("erreur de connexion\n", error)
      }
    );
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

  updateCity(event){
    //ecouteur de la map
    console.log('yyyyyyyyyy',event);
  }

  get city(): string {
    return InterfaceMeteoComponent.city;
  }

  set city(othercity){
    InterfaceMeteoComponent.city = othercity;
  }

  ngOnInit() {
    this.openStreetMapService.initMap(L, 'open-street-map', '4GI_Tikquuss_Team');
    this.villeSubscription = OpenStreetMapService.villeSubject.subscribe(
      (ville: string) => {
        if(ville != InterfaceMeteoComponent.city){
          InterfaceMeteoComponent.city = ville;
          this.updateInterface();
        }
      }
    );
    OpenStreetMapService.emitVilleSubject();
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
