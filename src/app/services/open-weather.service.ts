import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  API_KEY = "d28e38bb181eda122ee70b1387568a14";
  ROOT_URL ="https://api.openweathermap.org/data/2.5/weather?q";
  
  constructor(private httpClient: HttpClient) { }

  getWeather(ville): Observable<any> {
    return this.httpClient.get(this.ROOT_URL +'='+ville+'&APPID='+this.API_KEY);
  }
}
