import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';


@Component({
  selector: 'app-test-open-weather-service',
  templateUrl: './test-open-weather-service.component.html',
  styleUrls: ['./test-open-weather-service.component.css']
})
export class TestOpenWeatherServiceComponent {

  constructor(private apiService: OpenWeatherService) { }

  temperature: number;
  pression: number;
  humidite: number;
  vent: number;
  ville = "Mbouda";
  latitude ="037"
  longitude ="56567"

  ngOnInit() {
   
    this.apiService.getWeatherByCoord(this.latitude, this.longitude).subscribe(data => {

      this.temperature = Math.round(data.main.temp-273);
      this.pression = Math.round(data.main.pressure);
      this.humidite = Math.round(data.main.humidity);
      this.vent = data.wind.speed;
     
      console.log(data);
    });
  }

}
