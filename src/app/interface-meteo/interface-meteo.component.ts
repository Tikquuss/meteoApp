<<<<<<< HEAD
import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

//Mengong to Mengong
import { UserStoreService } from '../services/user-store.service';
<<<<<<< HEAD
import { LoginComponent } from '../login/login.component';
// Nanda to Mengong
import * as L from 'leaflet';
import { OpenStreetMapService } from '../services/open-street-map.service';
// Penano to Mengong
import { OpenWeatherService } from '../services/open-weather.service';
//Fandio to Mengong
import { Utilisateur } from '../models/utilisateur';
=======
import { LoginComponent} from '../login/login.component';
import { ChangeLocationModalContentComponent } from '../change-location-modal-content/change-location-modal-content.component';
// Nanda to Mengong
import * as L from 'leaflet';
import {OpenStreetMapService} from '../services/open-street-map.service';
// Penano to Mengong
import { OpenWeatherService } from '../services/open-weather.service';
//Fandio to Mengong
import {Utilisateur} from '../models/utilisateur';
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac
import { BdlocaleService } from '../services/bdlocale.service';

@Component({
    selector: 'app-interface-meteo',
    templateUrl: './interface-meteo.component.html',
    styleUrls: ['./interface-meteo.component.css']
})

<<<<<<< HEAD
export class InterfaceMeteoComponent implements OnInit, OnDestroy, AfterViewChecked {

    public static city: string;
    villeSubscription: Subscription;

    public times: string[];
    public cTime: string;
    public frTime: string;
    public icon: string;
    public time: string;
    public temperature: number;
    public pluviometry: string;
    public humidity: number;
    public ind: number;
    public hourly: boolean = true;
    public weekly: boolean = false;
    public user: Utilisateur;
    public tmax: number;
    public tmin: number;
    public url: string = "assets/img/user.jpg";
    private idIntervalleSave;

    constructor(private userStore: UserStoreService,
        private router: Router,
        private openStreetMapService: OpenStreetMapService,
        private openWeatherService: OpenWeatherService,
        private bdlocaleService: BdlocaleService) {
        this.times = this.openWeatherService.goodtimes();
        this.user = LoginComponent.bdComponent.getUserCourant();
        this.url = "assets/img/user.jpg";

        console.log(this.url);
        InterfaceMeteoComponent.city = this.user.ville;
        openStreetMapService.ville = this.user.ville;
        this.times = this.openWeatherService.goodtimes();
        OpenStreetMapService.ville = this.user.ville;
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

    updateInterface() {
        this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
            (data) => {
                this.temperature = Math.round(data.main.temp - 273); // °C
                this.pluviometry = 'ESE ' + Math.floor(Math.random() * 100) + ' m/s'; // l'api ne renvoie pas la pluviometrie (Penano doit se battre)
                this.humidity = Math.round(data.main.humidity); // %
                this.time = data.weather["0"].main;
                this.ind = this.openWeatherService.getTimeIndex(this.time);
                let t = this.openWeatherService.getTimeByValue(data.weather['0'].main);
                const id = String(data.weather[0].id);
                switch (id[0]) {
                    case '2':
                        console.log(2);
                        break;
                    case '3':
                        console.log(3);
                        break;
                    case '5':
                        console.log(5);
                        break;
                    case '7':
                        console.log(7);
                        break;
                    case '8':
                        if (id.slice(0, 2) === '80') {
                            console.log(80);
                        } else {
                            console.log(8);
                        }
                        break;
                    default:
                        console.log('default');
                        break;
                }
                this.frTime = 'ciel ' + t.fr;
                this.cTime = t.corresponding;
                this.icon = t.icon;
                this.tmin = this.temperature; // Penano doit changer ça
                this.tmax = this.temperature + 10; // Penano doit changer ça
            },
            (error) => {
                console.log('Erreur de recuperation de la météo\n', error);
            },
            () => {
                console.log('Fin récuperation de la météo');
            }
        );
    }

    updateCity(event) {
        //ecouteur de la map
        console.log("updateCity", event);
    }

    get city(): string {
        return InterfaceMeteoComponent.city;
    }

    set city(othercity) {
        InterfaceMeteoComponent.city = othercity;
    }

    ngOnInit() {
        if (this.user.photo !== null) {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    let img = document.getElementById("profil");
                    img.setAttribute('src', e.target.result);
                };
            })(this.user.photo);

            reader.readAsDataURL(this.user.photo);
        }

        this.openStreetMapService.initMap(L, 'open-street-map', '4GI_Tikquuss_Team');

        this.villeSubscription = OpenStreetMapService.villeSubject.subscribe(
            (ville: string) => {
                if (ville != InterfaceMeteoComponent.city) {
                    InterfaceMeteoComponent.city = ville;
                    this.updateInterface();
                }
            }
        );
        OpenStreetMapService.emitVilleSubject();

        this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
            (data) => {
                let date = new Date();
                for (let i = 0; i <= 23; i++) {
                    let keyhour = date.getDate().toString() + '-' + i.toString()
                    if (!localStorage.getItem(keyhour)) {
                        localStorage.setItem(keyhour, JSON.stringify(
                            {
                                time: data.weather["0"].main,
                                temperature: Math.floor(Math.random() * 5) + 22 /*Math.round(data.main.temp - 273)*/,
                                pluviometry: Math.floor(Math.random() * 100),
                                humidity: Math.floor(Math.random() * 5) + 50 // Math.round(data.main.humidity)
                            }
                        ));
                    }
                }
            },
            (error) => {
                console.log('Erreur de recuperation de la météo\n', error);
            },
            () => {
                console.log('Fin récuperation de la météo');
            }
        );

        this.idIntervalleSave = setInterval(() => {
            let date = new Date();
            let keyhour = date.getDate().toString() + '-' + date.getHours().toString() //+'-'+ date.getSeconds().toString();
            let keyday = date.getMonth().toString() + '-' + date.getDay().toString()//+'-'+ date.getSeconds().toString();
            if (localStorage.getItem(keyhour)) {
                localStorage.removeItem(keyhour);
            }
            this.openWeatherService.getWeather(this.user.ville).subscribe(
                (data) => {
                    localStorage.setItem(keyhour, JSON.stringify(
                        {
                            time: data.weather["0"].main,
                            temperature: Math.round(data.main.temp - 273),
                            pluviometry: Math.floor(Math.random() * 100),
                            humidity: Math.round(data.main.humidity)
                        }
                    ));

                    if (localStorage.getItem(keyday)) {
                        let before = JSON.parse(localStorage.getItem(keyday));
                        localStorage.removeItem(keyday);
                        localStorage.setItem(keyday, JSON.stringify(
                            {
                                time: (data.weather["0"].main),
                                temperature: Math.floor((Math.round(data.main.temp - 273) + parseInt(before.temperature)) / 2),
                                pluviometry: Math.floor((Math.floor(Math.random() * 100) + parseInt(before.pluviometry)) / 2),
                                humidity: Math.round((Math.round(data.main.humidity) + parseInt(before.humidity)) / 2)
                            }
                        ));
                    } else {
                        localStorage.setItem(keyday, JSON.stringify(
                            {
                                time: data.weather["0"].main,
                                temperature: Math.round(data.main.temp - 273),
                                pluviometry: Math.floor(Math.random() * 100),
                                humidity: Math.round(data.main.humidity)
                            }
                        ));
                    }
                },
                (error) => {
                    console.log('Erreur de recuperation de la météo\n', error);
                },
                () => {
                    console.log('Fin récuperation de la météo');
                }
            );
        }, 3600000); // 1h
    }

    ngAfterViewChecked() {
        const container = document.querySelector('.fk-load-interface') as HTMLElement;
        if (container) {
            container.style.opacity = '1';
            container.style.marginLeft = '0px';
        }
    }

    logOut() {
        this.userStore.isLoggedIn = false;
        this.router.navigate(['login']);
    }

    ngOnDestroy() {
        clearInterval(this.idIntervalleSave);
    }

=======
export class InterfaceMeteoComponent implements OnInit, OnDestroy  {

  public static city: string;
  villeSubscription: Subscription;

  public times: string[];
  public cTime: string;
  public frTime: string;
  public icon: string;
  public time: string;
  public temperature: number;
  public pluviometry: string;
  public humidity: number;
  public ind: number;
  public hourly: boolean = true;
  public weekly: boolean = false;
  public user: Utilisateur;
  public tmax: number;
  public tmin: number;
  public url: string = "assets/img/user.jpg";
  private idIntervalleSave;

  public static nbClick = 0;

  constructor(private userStore: UserStoreService,
              private router: Router,
              private  openStreetMapService: OpenStreetMapService,
              private openWeatherService: OpenWeatherService,
              private bdlocaleService: BdlocaleService) {
    this.times =  this.openWeatherService.goodtimes();
    this.user = LoginComponent.bdComponent.getUserCourant();
    this.url = "assets/img/user.jpg";

    //console.log(this.url);
    InterfaceMeteoComponent.city = this.user.ville;
    openStreetMapService.ville =  this.user.ville;
    this.times =  this.openWeatherService.goodtimes();
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
        this.temperature = Math.round(data.main.temp - 273); // °C
        this.pluviometry = 'ESE ' + Math.floor(Math.random() * 100) + ' m/s'; // l'api ne renvoie pas la pluviometrie (Penano doit se battre)
        this.humidity = Math.round(data.main.humidity); // %
        this.time = data.weather["0"].main;
        this.ind = this.openWeatherService.getTimeIndex(this.time);
        let t = this.openWeatherService.getTimeByValue(data.weather['0'].main);
        this.frTime = t.fr;
        this.cTime = t.corresponding;
        this.icon = t.icon;
        this.tmin = this.temperature; // Penano doit changer ça
        this.tmax = this.temperature + 10; // Penano doit changer ça
      },
      (error) => {
        console.log('Erreur de recuperation de la météo\n', error);
      },
      () => {
        console.log('Fin récuperation de la météo');
      }
    );
  }

  updateCity(event){
    let element = document.getElementById('open-street-map');
    if(InterfaceMeteoComponent.nbClick == 0){
      /*
      todo : rendre l'element non cliquable pendant 2 secondes
      */
      InterfaceMeteoComponent.nbClick = 1;
    }
    InterfaceMeteoComponent.nbClick = 0;
    console.log("updateCity",event);
  }

  get city(): string {
    return InterfaceMeteoComponent.city;
  }

  set city(othercity){
    InterfaceMeteoComponent.city = othercity;
  }

  ngOnInit() {
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

    this.villeSubscription = ChangeLocationModalContentComponent.villeSubject.subscribe(
      (ville: string) => {
        if(ville != InterfaceMeteoComponent.city){
          InterfaceMeteoComponent.city = ville;
          OpenStreetMapService.ville =  ville;
          this.bdlocaleService.getVilleByNom(ville).then(
            (ville) => {
              OpenStreetMapService.latitude = ville.posX;
              OpenStreetMapService.longitude = ville.posY;
              this.updateInterface();
              OpenStreetMapService.updateParameter({ville:ville.nom});
            },
            (error) => {
              console.log("erreur de connexion\n", error)
            }
          );
        }
      }
    );
    ChangeLocationModalContentComponent.emitVilleSubject(InterfaceMeteoComponent.city);

    this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
      (data) => {
        let date = new Date();
        for(let i = 0; i <= 23; i++){
          let keyhour = date.getDate().toString() + '-' + i.toString()
          if(!localStorage.getItem(keyhour)){
            localStorage.setItem(keyhour, JSON.stringify(
              {
                time: data.weather["0"].main,
                temperature: Math.floor(Math.random() * 5) + 22 /*Math.round(data.main.temp - 273)*/,
                pluviometry: Math.floor(Math.random() * 100),
                humidity: Math.floor(Math.random() * 5) + 50 // Math.round(data.main.humidity)
              }
            ));
          }
        }
      },
      (error) => {
        console.log('Erreur de recuperation de la météo\n', error);
      },
      () => {
        console.log('Fin récuperation de la météo');
      }
    );

    this.idIntervalleSave  = setInterval(()=>{
      let date = new Date();
      let keyhour = date.getDate().toString() + '-' + date.getHours().toString() //+'-'+ date.getSeconds().toString();
      let keyday = date.getMonth().toString() + '-' + date.getDay().toString()//+'-'+ date.getSeconds().toString();
      if(localStorage.getItem(keyhour)){
        localStorage.removeItem(keyhour);
      }
      this.openWeatherService.getWeather(this.user.ville).subscribe(
        (data) => {
          localStorage.setItem(keyhour, JSON.stringify(
            {
              time: data.weather["0"].main,
              temperature: Math.round(data.main.temp - 273),
              pluviometry: Math.floor(Math.random() * 100),
              humidity: Math.round(data.main.humidity)
            }
          ));

          if(localStorage.getItem(keyday)){
            let before = JSON.parse(localStorage.getItem(keyday));
            localStorage.removeItem(keyday);
            localStorage.setItem(keyday, JSON.stringify(
              {
                time: (data.weather["0"].main),
                temperature: Math.floor((Math.round(data.main.temp - 273) + parseInt(before.temperature))/2),
                pluviometry: Math.floor((Math.floor(Math.random() * 100) + parseInt(before.pluviometry))/2),
                humidity: Math.round((Math.round(data.main.humidity) + parseInt(before.humidity))/2 )
              }
            ));
          }else{
            localStorage.setItem(keyday, JSON.stringify(
              {
                time: data.weather["0"].main,
                temperature: Math.round(data.main.temp - 273),
                pluviometry: Math.floor(Math.random() * 100),
                humidity: Math.round(data.main.humidity)
              }
            ));
          }
        },
        (error) => {
          console.log('Erreur de recuperation de la météo\n', error);
        },
        () => {
          console.log('Fin récuperation de la météo');
        }
      );
    }, 3600000); // 1h
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }
  
  ngOnDestroy(){
    clearInterval(this.idIntervalleSave);
  }
>>>>>>> 86fa10fbcf98c469b36fb90684312a04eb7e79ac
}
