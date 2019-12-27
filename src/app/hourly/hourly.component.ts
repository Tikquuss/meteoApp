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
    for (let i of [...Array(12).keys()]) {
      let ind = Math.floor(Math.random() * 4);
      this.meteoHours.push(
        {
          hour: 10 + i,
          time: this.times[ind],
          temperature: Math.floor(Math.random() * 5) + 18,
          humidity: 92
        });
    }
  }

  ngOnInit() {
  }

}
