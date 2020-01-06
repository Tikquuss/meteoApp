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

  constructor(private userStore: UserStoreService,
              private router: Router,
              private  openStreetMapService: OpenStreetMapService,
              private openWeatherService: OpenWeatherService) {
    this.user = LoginComponent.bdComponent.getUserCourant();
    InterfaceMeteoComponent.city = this.user.ville;
    console.log('InterfaceMeteoComponent.city', InterfaceMeteoComponent.city);
    this.updateInterface();
  }

  updateInterface(){
    this.times =  this.openWeatherService.goodtimes();
    
    this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
      (data) => {
        this.temperature = Math.round(data.main.temp-273); // °C
        this.pluviometry = 'ESE '+ Math.floor(Math.random() * 100)+' m/s'; // l'api ne renvoie pas la pluviometrie
        this.humidity = Math.round(data.main.humidity); //%
        this.time = data.weather["0"].main;
        this.ind = this.openWeatherService.getTimeIndex(this.time);
      },
      (error) => {
        console.log('Erreur de recuperation de la météo',error);
      }, 
      () => {
        console.log('Fin récuperation de la météo');
      }
    );
  }

  updateCity(othercity?){
    if(othercity){
      if(othercity != InterfaceMeteoComponent.city){
        InterfaceMeteoComponent.city = othercity;
        this.updateInterface();
      }
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
    
    var targetVille = document.getElementById('ville-name');
    // Créé une instance de l'observateur lié à une fonction de callback
    var observer = new MutationObserver(
      // Fonction callback à éxécuter quand une mutation est observée
      function(mutationsList) {
        for(var mutation of mutationsList) {
            if (mutation.type == 'attributes') {
                console.log("L'attribut '" + mutation.attributeName + "' a été modifié.");
            }else if(mutation.type == 'characterData'){
              // changer la ville
              //var v = new CharacterData();
              //v = targetVille.firstChild; 
              this.updateCity(targetVille.firstChild.toString());
              //this.updateCity(targetVille.firstChild.data);
              console.log("Le Ville a changé", InterfaceMeteoComponent.city);
            }
        }
    });

    // Commence à observer le noeud cible pour certaines mutations précédemment configurées
    observer.observe(
      targetVille, // noeud dont les mutations seront observées
      // Options de l'observateur (quelles sont les mutations à observer)
      { attributes: true, characterData : true }
    );

    // L'observation peut être arrêtée par la suite
    //observer.disconnect();
  }

  getPosition(){
    console.log('position-----------');
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
