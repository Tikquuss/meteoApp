import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

//Mengong to Mengong
import { UserStoreService } from '../services/user-store.service';
import { LoginComponent } from '../login/login.component';
// Nanda to Mengong
import * as L from 'leaflet';
import { OpenStreetMapService } from '../services/open-street-map.service';
// Penano to Mengong
import { OpenWeatherService } from '../services/open-weather.service';
//Fandio to Mengong
import { Utilisateur } from '../models/utilisateur';
import { BdlocaleService } from '../services/bdlocale.service';

/**
 * @todo créer une animation entre le login et l'interface utilisateur
 */
@Component({
    selector: 'app-interface-meteo',
    templateUrl: './interface-meteo.component.html',
    styleUrls: ['./interface-meteo.component.css']
})
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
    private animationTimer;
    private dataAvailable: boolean;
    private dataAvailableTimer;

    constructor(private userStore: UserStoreService,
        private router: Router,
        private openStreetMapService: OpenStreetMapService,
        private openWeatherService: OpenWeatherService,
        private bdlocaleService: BdlocaleService) {
        this.dataAvailable = false;
        this.dataAvailableTimer = setInterval(() => {
            const loadingTime = 2000; // 2s
            window.scrollTo(0, 0);
            window.onscroll = () => {
                window.scrollTo(0, 0);
            };
            if (this.temperature) { // le données sont disponnibles
                (document.querySelector('.fk-loader') as HTMLElement).style.opacity = '0';
                // (document.querySelector('.fk-loader-animation') as HTMLElement).style.opacity = '0';
                (document.querySelector('.fk-loader-text') as HTMLElement).style.opacity = '0';
                (document.querySelector('.lds-default') as HTMLElement).style.opacity = '0';
                setTimeout(() => {
                    console.log('chargement du fk-loader terminé');
                    this.dataAvailable = true;
                    window.onscroll = () => {};
                    clearInterval(this.dataAvailableTimer);
                }, loadingTime);
            }
        }, 100);
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

        this.animationTimer = setInterval(() => {
            let garbageCollector: () => void = () => {};
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
            garbageCollector();
        }, 333); // 0.333s
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
}
