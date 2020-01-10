import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {
  
  times = ['cloudy', 'rain', 'sunny', 'thunderstorm'];
  public meteoHours: Array<any>;
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
    
    //*
    for (let i = 0; i <= 23; i++) {
      let ind = Math.floor(Math.random() * 4);
      this.meteoHours.push(
        {
          hour: 10 + i,
          time: this.times[ind],
          temperature: Math.floor(Math.random() * 5) + 18,
          humidity: 92
        });
    }
    //*/
  }

  ngOnInit() {
  }

}
