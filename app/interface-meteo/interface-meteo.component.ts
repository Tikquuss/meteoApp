import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// Mengong to Mengong
import { UserStoreService } from '../services/user-store.service';
import { LoginComponent } from '../login/login.component';
import { ChangeLocationModalContentComponent } from '../change-location-modal-content/change-location-modal-content.component';
// Nanda to Mengong
import * as L from 'leaflet';
import { OpenStreetMapService } from '../services/open-street-map.service';
// Penano to Mengong
import { OpenWeatherService } from '../services/open-weather.service';
// Fandio to Mengong
import { Utilisateur } from '../models/utilisateur';
import { BdlocaleService } from '../services/bdlocale.service';

@Component({
    selector: 'app-interface-meteo',
    templateUrl: './interface-meteo.component.html',
    styleUrls: ['./interface-meteo.component.css']
})

export class InterfaceMeteoComponent implements OnInit, OnDestroy, AfterViewChecked {

    public static city: string;
    public static nbClick = 0;
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
    public hourly = true;
    public weekly = false;
    public user: Utilisateur;
    public tmax: number;
    public tmin: number;
    public url = 'assets/img/user.jpg';
    private animationTimer;
    private dataAvailable: boolean;
    private dataAvailableTimer;

    private idIntervalleSave;
    public static hour = 3600; // 1h = 3600000 milli-secondes
    public static hourSave = 3600; // 1h = 3600000 milli-secondes
    public static day = 24*3600000; // 1 jours = 24 heures = 24 * 3600000 secondes

    constructor(
        private userStore: UserStoreService,
        private router: Router,
        private openStreetMapService: OpenStreetMapService,
        private openWeatherService: OpenWeatherService,
        private bdlocaleService: BdlocaleService) {
        this.dataAvailable = false;
        this.dataAvailableTimer = setInterval(() => {
            const loadingTime = 1000; // 1s
            window.scrollTo(0, 0);
            window.onscroll = () => {
                window.scrollTo(0, 0);
            };
            if (this.temperature) { // le données sont disponnibles
                (document.querySelector('.fk-loader') as HTMLElement).style.opacity = '0';
                // (document.querySelector('.fk-loader-animation') as HTMLElement).style.opacity = '0';
                (document.querySelector('.fk-loader-text') as HTMLElement).style.opacity = '0';
                (document.querySelector('#fk-load-img') as HTMLElement).style.opacity = '0';
                setTimeout(() => {
                    console.log('chargement du fk-loader terminé');
                    this.dataAvailable = true;
                    window.onscroll = () => {};
                    clearInterval(this.dataAvailableTimer);
                }, loadingTime);
            }
        }, 0.333);
        this.times = this.openWeatherService.goodtimes();
        this.user = LoginComponent.bdComponent.getUserCourant();
        this.url = 'assets/img/user.jpg';

        // console.log(this.url);
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
                console.log('erreur de connexion\n', error);
            }
        );
    }

    updateInterface() {
        this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
            (data) => {
                this.temperature = Math.round(data.main.temp - 273); // °C
                // l'api ne renvoie pas la pluviometrie (Penano doit se battre)
                this.pluviometry = 'ESE ' + Math.floor(Math.random() * 100) + ' m/s';
                this.humidity = Math.round(data.main.humidity); // %
                this.time = data.weather['0'].main;
                this.ind = this.openWeatherService.getTimeIndex(this.time);
                const t = this.openWeatherService.getTimeByValue(data.weather['0'].main);
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

    updateCity(event) {
        const element = document.getElementById('open-street-map');
        if (InterfaceMeteoComponent.nbClick === 0) {
            /*
            todo : rendre l'element non cliquable pendant 2 secondes
            */
            InterfaceMeteoComponent.nbClick = 1;
        }
        InterfaceMeteoComponent.nbClick = 0;
        console.log('updateCity', event);
    }

    get city(): string {
        return InterfaceMeteoComponent.city;
    }

    set city(othercity) {
        InterfaceMeteoComponent.city = othercity;
    }

    ngOnInit() {
        if (this.user.photo !== null) {
            const reader = new FileReader();
            reader.onload = (theFile => {
                return e => {
                    const img = document.getElementById('profil');
                    img.setAttribute('src', e.target.result);
                };
            })(this.user.photo);

            reader.readAsDataURL(this.user.photo);
        }

        this.animationTimer = setInterval(() => {
            let garbageCollector: () => void = () => { };
            // si l'animation est terminée
            if ((document.querySelector('.fk-load-interface') as HTMLElement).style.marginLeft === '0px') {
                garbageCollector = () => {
                    clearInterval(this.animationTimer);
                    console.log('arrêt de l\'animation');
                };
            } else { // l'animation n'est pas terminée
                return;
            }
            this.openStreetMapService.initMap(L, 'open-street-map', '4GI_Tikquuss_Team');

            this.villeSubscription = OpenStreetMapService.villeSubject.subscribe(
                (ville: string) => {
                    if (ville !== InterfaceMeteoComponent.city) {
                        InterfaceMeteoComponent.city = ville;
                        this.updateInterface();
                    }
                }
            );
            OpenStreetMapService.emitVilleSubject();

            this.villeSubscription = ChangeLocationModalContentComponent.villeSubject.subscribe(
                (ville: string) => {
                    if (ville !== InterfaceMeteoComponent.city) {
                        InterfaceMeteoComponent.city = ville;
                        OpenStreetMapService.ville = ville;
                        this.bdlocaleService.getVilleByNom(ville).then(
                            (v) => {
                                OpenStreetMapService.latitude = v.posX;
                                OpenStreetMapService.longitude = v.posY;
                                this.updateInterface();
                                OpenStreetMapService.updateParameter({ ville: v.nom });
                            },
                            (error) => {
                                console.log('erreur de connexion\n', error);
                            }
                        );
                    }
                }
            );
            ChangeLocationModalContentComponent.emitVilleSubject(InterfaceMeteoComponent.city);

            // Initialisation
            //*
            this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
            (data) => {
                let date = new Date();
                for(let i = 0; i <= 23; i++){
                let keyhour = date.getDate().toString() + '-' + i.toString()
                if(!localStorage.getItem(keyhour)){
                    localStorage.setItem(keyhour, JSON.stringify(
                    {
                        time: data.weather["0"].main,
                        temperature: Math.round(data.main.temp - 273),
                        pluviometry: Math.floor(Math.random() * 100),
                        humidity: Math.round(data.main.humidity)
                    }
                    ));
                }
                }
                for(let i = 1; i <= 7; i++){
                let keyday = date.getMonth().toString() + '-' + InterfaceMeteoComponent.getday(i)//+'-'+ date.getSeconds().toString();
                if(!localStorage.getItem(keyday)){
                    localStorage.setItem(keyday, JSON.stringify(
                    {
                        time: data.weather["0"].main,
                        temperature: Math.round(data.main.temp - 273),
                        pluviometry: Math.floor(Math.random() * 100),
                        humidity: Math.round(data.main.humidity)
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
            //*/

            this.idIntervalleSave  = setInterval(()=>{
                let date = new Date();
                let keyhour = date.getDate().toString() + '-' + date.getHours().toString() //+'-'+ date.getSeconds().toString();
                if(!localStorage.getItem(keyhour)){
                    //localStorage.removeItem(keyhour);
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
                        let keyday = date.getMonth().toString() + '-' + InterfaceMeteoComponent.getday(date.getDay());//+'-'+ date.getSeconds().toString();
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
                }
            }, InterfaceMeteoComponent.hourSave); // 1h = 3600000 secondes
            garbageCollector();
        }, 500); // 0.5s
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

    public static getday(index:number):string{
        // days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
        switch(index){
          case 1 :
            return 'Lundi';
          case 2 :
            return 'Mardi';
          case 3 :
            return 'Mercredi'; 
          case 4 :
            return 'Jeudi';
          case 5 :
            return 'Vendredi';
          case 6 :
            return 'Samedi';
          case 7 :
            return 'Dimanche';
        }
    }
    
    public static goodTime(meteo_time, times=['cloudy', 'rain', 'sunny', 'thunderstorm']){
        switch(meteo_time){
          case 'Clouds':
            return times[0];
          case 'Rain':
            return times[1];
          case 'Clear':
            return times[2];
          case 'Snow':
            return times[3];
          case 'Haze':
            return times[3];
          case 'Mist':
            return times[3];
        }
    }
}
