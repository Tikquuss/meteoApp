import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';

// Nanda to Mengong 
import * as L from 'leaflet';
import {OpenStreetMapService} from '../services/open-street-map.service';

// Penano to Mengong 
import { OpenWeatherService } from '../services/open-weather.service';

@Component({
  selector: 'app-interface-meteo',
  templateUrl: './interface-meteo.component.html',
  styleUrls: ['./interface-meteo.component.css']
})

export class InterfaceMeteoComponent implements OnInit {
  
  public times = [];
  public time: string;
  public temperature: number;
  public pluviometry: string;
  public humidity: number;
  public ind: number;
  public hourly: boolean = true;
  public weekly: boolean = false;
  public static city: string;

  constructor(private userStore: UserStoreService,
              private router: Router,
              private  openStreetMapService : OpenStreetMapService,
              private openWeatherService : OpenWeatherService) {
    this.times =  this.openWeatherService.times;
    this.time = this.openWeatherService.getTime();
    this.ind = this.openWeatherService.getTimeIndex(this.time);
    
    InterfaceMeteoComponent.city = this.openStreetMapService.getVilleName()
    console.log('InterfaceMeteoComponent.city', InterfaceMeteoComponent.city)
    //*
    let meteo = this.openWeatherService.getValuesByVille(InterfaceMeteoComponent.city);
    this.temperature = meteo['temperature'];
    this.pluviometry = meteo['pluviometry'];
    this.humidity = meteo['humidity'];
    //*/
    /*
    this.temperature = Math.floor(Math.random() * 100);
    this.pluviometry = 'ESE '+ Math.floor(Math.random() * 1000)+' m/s';
    this.humidity = Math.floor(Math.random() * 100);
    //*/
  }

  ngOnInit() {
    this.openStreetMapService.initMap(L, 'open-street-map', '4GI_Tikquuss_Team');
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
