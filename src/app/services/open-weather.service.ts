import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OpenWeatherService {

  private API_KEY = "d28e38bb181eda122ee70b1387568a14";
  private ROOT_URL ="https://api.openweathermap.org/data/2.5/weather?";

  constructor(private httpClient: HttpClient) { }

  getWeather(ville:string): Observable<any> {
    return this.httpClient.get(this.ROOT_URL +'q='+ville+'&APPID='+this.API_KEY);
  }

  getWeatherByCoord(latitude:number, longitude:number):Observable<any>{
    return this.httpClient.get(this.ROOT_URL + 'lat='+latitude+'&lon='+longitude+
                              '&APPID='+this.API_KEY)
  }

  getValuesByVille(ville){
    let r = {
      'temperature':0, // °C
      'pluviometrie': 'ESE 0 m/s', // respecter cette nommenclature, genre 'ESE 66 m/s', 'ESE 20 m/s',...               
      'humidite':  0, //%
      'pression': 0, // hpa
      'vent': 0 //m/s
      'time': ''//temps qu'il fait
    };

    this.getWeather(ville).subscribe(data => {
      r['temperature'] = Math.round(data.main.temp-273); // °C
      r['pluviometrie'] = 'ESE 0 m/s';
      r['humidite'] = Math.round(data.main.humidity); //%
      r['pression'] = Math.round(data.main.pressure); // hpa
      r['vent'] = data.wind.speed; //m/s
      r['time'] =
    });
    return r;
  }

  // Autre methodes à implémenter

  /** @description récupere les parametres grace aux coordonnées géorgraphique
    * @param {latitude, longitude}
    * @return {meteo} 
  */
  getValuesByCoord(coordonnees:{latitude:number, longitude:number}){
    console.log(coordonnees.latitude, coordonnees.longitude)
    let r = {
      'temperature':0, // °C
      'pluviometrie': 'ESE 0 m/s', // respecter cette nommenclature, genre 'ESE 66 m/s', 'ESE 20 m/s',...               
      'humidite':  0, //%
      'pression': 0, // hpa
      'vent': 0 //m/s
    };

    this.getWeatherByCoord(latitude,longitude).subscribe(data => {
      r['temperature'] = Math.round(data.main.temp-273); // °C
      r['pluviometrie'] = 'ESE 0 m/s';
      r['humidite'] = Math.round(data.main.humidity); //%
      r['pression'] = Math.round(data.main.pressure); // hpa
      r['vent'] = data.wind.speed; //m/s
    });
    
    return r;
  }

  /** @description rétourner  le temps actuel (entre ['cloudy', 'rainy', 'sunny', 'stormy']) 
   * en fonction des conditions métérologiques.
    * @param {}
    * @return {time} 
  */
  getTime(){
    // choisir actuelement un temps au hasard
    return this.times[Math.floor(Math.random() * this.times.length)];
  }

  getTimeIndex(time:string){
    return this.times.indexOf(time);
  }
}
