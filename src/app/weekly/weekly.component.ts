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
    /*
    let map = new Map<number, Array<{
                                    day: string,
                                    time: string,
                                    temperature: number,
                                    humidity: number,
                                    pluviometry : number
                                  }>
                  >();
    for(let i = 0; i <= 6; i++){
      map.set(i, []);
    }

    let date = new Date();
    let annee = date.getFullYear();
    let mois = new Date().getMonth();

    for(let i = 0; i <= this.nombreJours(mois, annee); i++){
      let jour = new Date(annee,mois,i).getDay();
      let keyday = mois.toString() + '-' + jour.toString();
      let data = JSON.parse(localStorage.getItem(keyday));
      map.get(i).push({
        day: this.days[jour],
        time: this.times[Math.floor(Math.random() * 4)],
        temperature:  parseInt(data.temperature),
        humidity: parseInt(data.humidity),
        pluviometry : parseInt(data.pluviometry)
      })
    }
    //*/
    //*
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
    //*/
  }

  ngOnInit() {
  }

  // mois entre 0 et 11
  nombreJours(mois, annee) { 
    return new Date(annee, mois+1, 0).getDate(); 
  }

}
