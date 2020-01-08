import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

//Penano to Nanda
import { OpenWeatherService } from './open-weather.service';

@Injectable({
  providedIn: 'root'
})

export class OpenStreetMapService{

    //Il s'agit des coordonnées de Douala
    public static latitude=4.04827;
    public static longitude=9.70428; 
    public static macarte;
    public static marker;
    public static ville : string;
    public static openWeatherService : OpenWeatherService;
    public static httpClient : HttpClient;

    public static villeSubject = new Subject<string>();;

    constructor(public httpClient: HttpClient,
                openWeatherService : OpenWeatherService) {
        OpenStreetMapService.httpClient = httpClient;  
        OpenStreetMapService.openWeatherService = openWeatherService;
        
    }

    set ville(otherVille){
      OpenStreetMapService.ville = otherVille;
      OpenStreetMapService.emitVilleSubject();
    }

    public static emitVilleSubject() {
      OpenStreetMapService.villeSubject.next(OpenStreetMapService.ville);
    }

    set latitude(otherLatitude){
      OpenStreetMapService.ville = otherLatitude;
    }

    set longitude(otherLongitude){
      OpenStreetMapService.ville = otherLongitude;
    }
    /** @description Initialise la map
     * permet d'afficher la map centrer en latitude et longitude.
    */
    initMap(L, id, attribution, minZoom=1, maxZoom=15) {  
      OpenStreetMapService.macarte = L.map(id).setView([OpenStreetMapService.latitude, OpenStreetMapService.longitude], 12);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: attribution, minZoom: minZoom, maxZoom: maxZoom
      }).addTo(OpenStreetMapService.macarte);
      
      OpenStreetMapService.updateParameter({ville:OpenStreetMapService.ville});

      OpenStreetMapService.bornes_podotactiles(L.icon({iconUrl: 
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      }));
    
      // Recupere les coordonnées geographique du lieu choisi(par click) par l'utilisateur.
      OpenStreetMapService.macarte.on('click', function(e) {
        OpenStreetMapService.updateParameter({e:e});
      });
    }

    /**
     * @description mettre à jour les données sur la map
     * @param e 
     */
    public static updateParameter(options : {e?:any, ville?:string}){
      if(options){
        if(options.e){
          // Déplacement du marqueur
          OpenStreetMapService.macarte.removeLayer(OpenStreetMapService.marker);
          OpenStreetMapService.latitude=options.e.latlng.lat;
          OpenStreetMapService.longitude=options.e.latlng.lng;  
        }
        OpenStreetMapService.openWeatherService.getWeatherByCoord(
          OpenStreetMapService.latitude, OpenStreetMapService.longitude
        ).subscribe(
          (data) => {
            OpenStreetMapService.ville = data.name;
            OpenStreetMapService.marker = 
            L.marker(
              [OpenStreetMapService.latitude, OpenStreetMapService.longitude], 
              {icon: L.icon({iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'})}
            ).bindPopup(
                (options.ville ? options.ville : data.name) +"  { "+ 
                'Latitude = '+OpenStreetMapService.latitude.toFixed(2)+
                '; Longitude = '+OpenStreetMapService.longitude.toFixed(2)+" }"
            ).addTo(
              OpenStreetMapService.macarte
            ).openPopup();
          },
          (error) => {
            console.log('Erreur de recuperation de la ville \n',error);
          }, 
          () => {
            console.log('Fin récuperation de la de la ville', OpenStreetMapService.ville);
            if(!options.ville){
              OpenStreetMapService.emitVilleSubject();
            }
          }
      );}
    }

    public static bornes_podotactiles(icon){
      OpenStreetMapService.httpClient.get('https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=bornes-podotactiles').subscribe(
        (data: any) => {
          console.log('chargement des bornes podotactiles en cours');
          data.records.forEach(podotactile => {
            L.marker([podotactile.geometry.coordinates[1], podotactile.geometry.coordinates[0]], {icon: icon}).addTo(OpenStreetMapService.macarte);
            console.log('chargement des bornes podotactiles en cours...');
          });
        },
        (error)=> {
          console.log('erreur de chargement des bornes podotactiles\n', error);
        },
        ()=> {
          console.log('fin de chargement des bornes podotactiles');
        }
      );
    }

    /** @description Recupere les coordonnées geographique du lieu choisi par 
     * l'utilisateur.
     * @return {LatLng}
     * Utiliser ".lat" pour recuperer la latitude et ".lng" pour la logitude
    */
    getlocation(){
      OpenStreetMapService.latitude=OpenStreetMapService.macarte.getCenter().lat;
      OpenStreetMapService.longitude=OpenStreetMapService.macarte.getCenter().lng;
      return OpenStreetMapService.macarte.getCenter();
    }

    /** 
    * @description Change les coordonnées geographique en fonction du lieu choisi(ville) par l'utilisateur. on se sert à 
    */
    public static chercher(ville){
      var reponse=OpenStreetMapService.httpClient.get("https://nominatim.openstreetmap.org/search.php?q="+ville+"+&polygon_geojson=1")
      reponse.subscribe(
        (data: any) => {
          OpenStreetMapService.latitude=data.getCenter().lat;
          OpenStreetMapService.longitude=data.getCenter().lng;
        },
        (erreur)=> {console.log(erreur)},
        () => {}
      );
    }
}
