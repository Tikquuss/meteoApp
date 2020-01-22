import { Component, OnInit, AfterViewChecked, OnDestroy  } from '@angular/core';
import { InterfaceMeteoComponent } from '../interface-meteo/interface-meteo.component';

@Component({
    selector: 'app-weekly',
    templateUrl: './weekly.component.html',
    styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit, AfterViewChecked, OnDestroy {

    times = ['cloudy', 'rain', 'sunny', 'thunderstorm'];
    days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    public meteoDays: Array<any>;
    private conteneur: Element;
    private scroller;


    private idIntervalleLoad;

    constructor() {
        this.meteoDays=[]
        var i = 1;
        let date = new Date();
        for (let day of this.days) {
        let keyday = date.getMonth().toString() + '-' + InterfaceMeteoComponent.getday(i);
        let data = JSON.parse(localStorage.getItem(keyday));
        console.log("localStorage.getItem(keyhour)", keyday ,data);
        if(data){
            this.meteoDays.push(
            {
                day: day,
                time: InterfaceMeteoComponent.goodTime(data.time),
                temperature:  parseInt(data.temperature),
                humidity: parseInt(data.humidity),
                pluviometry : parseInt(data.pluviometry)
            }
            );
        }
        i++;
        }
    }

    ngOnInit() {
        this.conteneur = document.getElementById('fkScrollable');
        //*
        this.idIntervalleLoad  = setInterval(()=>{
            let date = new Date();
            for(let i = 1; i <= 7; i++){
                let day = InterfaceMeteoComponent.getday(i);
                let keyday = date.getMonth().toString() + '-' + day;
                let data = JSON.parse(localStorage.getItem(keyday));
                console.log("localStorage.getItem(keyday)", keyday ,data);
                if(data){
                    data = {
                        day: day,
                        time: InterfaceMeteoComponent.goodTime(data.time),
                        temperature:  parseInt(data.temperature),
                        humidity: parseInt(data.humidity),
                        pluviometry : parseInt(data.pluviometry)
                    }
                    if(data != this.meteoDays[i]){
                        this.meteoDays[i-1]=data
                    } 
                }
            }
        }, InterfaceMeteoComponent.day); 
        //*/
    }

    ngAfterViewChecked() {
        const container = document.querySelector('.fk-load-weekly') as HTMLElement;
        if (container) {
            container.style.opacity = '1';
            container.style.marginLeft = '0px';
        }
    }

    fkStartScroll(direction: string) {
        const speed = 500; // en px/s
        if (direction === 'left') {
            this.scroll(speed);
        } else {
            this.scroll(-speed);
        }
    }

    scroll(speed: number) {
        const dt = 25;
        this.scroller = setInterval((x: number) => {
            this.conteneur.scrollBy(x, 0);
        }, dt, speed / (1000 / dt));
    }

    fkEndScroll() {
        clearInterval(this.scroller);
    }

    // mois entre 0 et 11
    nombreJours(mois, annee) {
        return new Date(annee, mois + 1, 0).getDate();
    }

    ngOnDestroy(){
        clearInterval(this.idIntervalleLoad);
    }
}
