import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OpenWeatherService {

  private API_KEY = "d28e38bb181eda122ee70b1387568a14";
  private ROOT_URL ="https://api.openweathermap.org/data/2.5/weather?";
  
  public times=['Clouds', 'Rain', 'Clear', 'Snow','Haze', 'Mist'];

  constructor(private httpClient  : HttpClient){}

  goodtimes(){
    // faire correspondre à ['clouds', 'Rain', 'Clear', 'Snow','Haze'];
    return ['cloudy', 'rainy', 'sunny', 'stormy', 'stormy', 'cloudy'];
  }

  getWeather(ville): Observable<any> {
    return this.httpClient.get(this.ROOT_URL +'q='+ville+'&APPID='+this.API_KEY);
  }

  getWeatherByCoord(latitude:number, longitude:number):Observable<any>{
    return this.httpClient.get(this.ROOT_URL + 'lat='+latitude+'&lon='+longitude+
                              '&APPID='+this.API_KEY)
  }

  getTimeIndex(time:string){
    return this.times.indexOf(time);
  }
}