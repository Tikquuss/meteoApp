import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { InterfaceMeteoComponent } from '../interface-meteo/interface-meteo.component';

@Component({
    selector: 'app-hourly',
    templateUrl: './hourly.component.html',
    styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit, AfterViewChecked, OnDestroy {

    times = ['cloudy', 'rain', 'sunny', 'thunderstorm'];
    public meteoHours: Array<any>;
    private conteneur: Element;
    private scroller;
    private idIntervalleLoad;

    constructor() {
        this.meteoHours = [];
        let date = new Date().getDate().toString();
        for(let i = 0; i <= 23; i++){
            let keyhour = date + '-' + i.toString(); 
            let data = JSON.parse(localStorage.getItem(keyhour));
            console.log("localStorage.getItem(keyhour)", keyhour, data);
            if(data){
                this.meteoHours.push(
                {
                    hour: i,
                    time: InterfaceMeteoComponent.goodTime(data.time),
                    temperature:  parseInt(data.temperature),
                    humidity: parseInt(data.humidity),
                    pluviometry : parseInt(data.pluviometry)
                });
            }
        }
    }

    ngOnInit() {
        this.conteneur = document.getElementById('fkScrollable');

        this.idIntervalleLoad  = setInterval(()=>{
            let date = new Date().getDate().toString();
            for(let i = 0; i <= 23; i++){
                let keyhour = date + '-' + i.toString() //+'-'+ date.getSeconds().toString();
                let data = JSON.parse(localStorage.getItem(keyhour));
                console.log("localStorage.getItem(keyhour)", keyhour ,data);
                if(data){
                    data = {
                        hour: i,
                        time: InterfaceMeteoComponent.goodTime(data.time),
                        temperature:  parseInt(data.temperature),
                        humidity: parseInt(data.humidity),
                        pluviometry : parseInt(data.pluviometry)
                    }
                    if(data != this.meteoHours[i]){
                        this.meteoHours[i]=data
                    } 
                }else{}
            }
        }, InterfaceMeteoComponent.hour); 
    }

    ngAfterViewChecked() {
        const container = document.querySelector('.fk-load-hourly') as HTMLElement;
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

    ngOnDestroy(){
        clearInterval(this.idIntervalleLoad);
    }
}
