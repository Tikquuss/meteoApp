import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'app-hourly',
    templateUrl: './hourly.component.html',
    styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit, AfterViewChecked {

    times = ['cloudy', 'rain', 'sunny', 'thunderstorm'];
    public meteoHours: Array<any>;
    private conteneur: Element;
    private scroller;

    constructor() {
        this.meteoHours = [];

        // Bonne methode
        /*
        let date = new Date().getDate().toString();
        for(let i = 0; i <= 23; i++){
          let keyhour = date + '-' + i.toString() //+'-'+ date.getSeconds().toString();
          let data = JSON.parse(localStorage.getItem(keyhour));
          this.meteoHours.push(
            {
              hour: i,
              time: this.times[Math.floor(Math.random() * 4)],
              temperature:  parseInt(data.temperature),
              humidity: parseInt(data.humidity),
              pluviometry : parseInt(data.pluviometry)
            }
          );
        }
        //*/

        // *
        for (let i = 0; i <= 23; i++) {
            const ind = Math.floor(Math.random() * 4);
            this.meteoHours.push(
                {
                    hour: (i + '').length === 1 ? '0' + i : i,
                    time: this.times[ind],
                    temperature: Math.floor(Math.random() * 5) + 18,
                    humidity: 92
                });
        }
        // */
    }

    ngOnInit() {
        this.conteneur = document.getElementById('fkScrollable');
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
}
