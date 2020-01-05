import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {

  times = ['cloudy', 'rain', 'sunny', 'thunderstorm'];
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  public meteoDays: Array<any>;
  constructor() {
    this.meteoDays = [];
    for (let day of this.days) {
      let ind = Math.floor(Math.random() * 4);
      this.meteoDays.push(
        {
          day: day,
          time: this.times[ind],
          temperature: Math.floor(Math.random() * 5) + 18,
          humidity: 92
        });
    }
  }

  ngOnInit() {
  }

}
