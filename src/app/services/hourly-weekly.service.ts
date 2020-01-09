import { Injectable } from '@angular/core';
import { OpenWeatherService } from './open-weather.service';

@Injectable({
  providedIn: 'root'
})
export class HourlyWeeklyService {

  constructor(openWeatherService : OpenWeatherService) { }

  saveMeteo(ville){

  }

  callback(){
    var x = setTimeout(function(){}, 10);
  }
}
