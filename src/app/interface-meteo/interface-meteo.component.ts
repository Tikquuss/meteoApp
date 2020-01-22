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
    private idIntervalleSave;
    private animationTimer;
    private dataAvailable: boolean;
    private dataAvailableTimer;

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
        let v = OpenStreetMapService.ville;
        let idIntervalleLoad;
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        idIntervalleLoad  = setInterval(()=>{
          if(v != OpenStreetMapService.ville){
            clearInterval(idIntervalleLoad);
            
            //OpenStreetMapService.updateParameter({});
          }
        }, 1000); // 1 seconde
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

            this.openWeatherService.getWeather(InterfaceMeteoComponent.city).subscribe(
                (data) => {
                    const date = new Date();
                    for (let i = 0; i <= 23; i++) {
                        const keyhour = date.getDate().toString() + '-' + i.toString();
                        if (!localStorage.getItem(keyhour)) {
                            localStorage.setItem(keyhour, JSON.stringify(
                                {
                                    time: data.weather['0'].main,
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
                const date = new Date();
                // +'-'+ date.getSeconds().toString();
                const keyhour = date.getDate().toString() + '-' + date.getHours().toString();
                // +'-'+ date.getSeconds().toString();
                const keyday = date.getMonth().toString() + '-' + date.getDay().toString();
                if (localStorage.getItem(keyhour)) {
                    localStorage.removeItem(keyhour);
                }
                this.openWeatherService.getWeather(this.user.ville).subscribe(
                    (data) => {
                        localStorage.setItem(keyhour, JSON.stringify(
                            {
                                time: data.weather['0'].main,
                                temperature: Math.round(data.main.temp - 273),
                                pluviometry: Math.floor(Math.random() * 100),
                                humidity: Math.round(data.main.humidity)
                            }
                        ));

                        if (localStorage.getItem(keyday)) {
                            const before = JSON.parse(localStorage.getItem(keyday));
                            localStorage.removeItem(keyday);
                            localStorage.setItem(keyday, JSON.stringify(
                                {
                                    time: (data.weather['0'].main),
                                    temperature: Math.floor((Math.round(data.main.temp - 273) + parseInt(before.temperature, 10)) / 2),
                                    pluviometry: Math.floor((Math.floor(Math.random() * 100) + parseInt(before.pluviometry, 10)) / 2),
                                    humidity: Math.round((Math.round(data.main.humidity) + parseInt(before.humidity, 10)) / 2)
                                }
                            ));
                        } else {
                            localStorage.setItem(keyday, JSON.stringify(
                                {
                                    time: data.weather['0'].main,
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
}
