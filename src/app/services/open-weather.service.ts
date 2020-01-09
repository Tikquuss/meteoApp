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

  public goodTimes = [
    {value: 'Clouds', corresponding: 'cloudy', fr: 'nuageux', icon: 'cloudy'},
    {value: 'Rain', corresponding: 'rainy', fr: 'pluvieux', icon: 'rain'},
    {value: 'Clear', corresponding: 'sunny', fr: 'dégagé', icon: 'sunny'},
    {value: 'Thunderstorm', corresponding: 'stormy', fr: 'orageux', icon: 'thunderstorm'},
    {value: 'Haze', corresponding: 'hazy', fr: 'brumeux', icon: 'haze'},
    {value: 'Mist', corresponding: 'mist', fr: 'brumeux', icon: 'haze'},
    {value: 'Snow', corresponding: 'snow', fr: 'enneigé', icon: 'snow'},
  ];

  constructor(private httpClient: HttpClient) {}

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

  getTimeIndex(time: string) {
    return this.times.indexOf(time);
  }

  /*
  prends le temps renvoyé par l'api et renvoie l'un des good times correspondant
   */
  getTimeByValue(value: string) {
    return this.goodTimes.find((dict) => value === dict.value);
  }
}
