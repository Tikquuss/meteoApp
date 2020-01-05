import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

/** @description Le service de map depend de Leaflet qui doit être inclure à 
 * notre page dans l'entête
 * Raison pour laquelle plus bas vous croirez qu'il y'a une erreur avec "L". 
 * Le code à inserer dans l'entete est disponible chez Nanda.
 */

export class OpenStreetMapService {

    //Il s'agit des coordonnées de Douala
    public static latitude=4.04827;
    public static longitude=9.70428; 
    public static macarte;
    public static marker;

    constructor(public httpClient: HttpClient) {
    }

    /** @description Initialise la map
     * permet d'afficher la map centrer en latitude et longitude.
    */
    initMap(L, id, attribution, minZoom=1, maxZoom=20) {  
      OpenStreetMapService.macarte = L.map(id).setView([OpenStreetMapService.latitude, OpenStreetMapService.longitude], 12);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: attribution, minZoom: minZoom, maxZoom: maxZoom
      }).addTo(OpenStreetMapService.macarte);
      
      OpenStreetMapService.updateParameter();
      
      // Recupere les coordonnées geographique du lieu choisi(par click) par l'utilisateur.
      OpenStreetMapService.macarte.on('click', function(e) {
        OpenStreetMapService.updateParameter(e);
      });
      console.log(this.chercher(OpenStreetMapService.getVilleName()));
    }

    public static updateParameter(e?){
      if(e){
        // Déplacement du marqueur
        OpenStreetMapService.macarte.removeLayer(OpenStreetMapService.marker);
        OpenStreetMapService.latitude=e.latlng.lat;
        OpenStreetMapService.longitude=e.latlng.lng;
      }

      // Le marquer 
      const myIcon = L.icon({iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'});
      OpenStreetMapService.marker = L.marker([OpenStreetMapService.latitude, OpenStreetMapService.longitude], {icon: myIcon}).bindPopup(
        OpenStreetMapService.getVilleName()+" : { "+
        'Latitude = '+OpenStreetMapService.latitude.toFixed(2)+
        '; Longitude = '+OpenStreetMapService.longitude.toFixed(2)+" }"
      ).addTo(OpenStreetMapService.macarte).openPopup();
      //this.bornes_podotactiles(myIcon);
    }

    bornes_podotactiles(myIcon){
      this.httpClient.get('https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=bornes-podotactiles').subscribe((data: any) => {
        data.records.forEach(podotactile => {
          L.marker([podotactile.geometry.coordinates[1], podotactile.geometry.coordinates[0]], {icon: myIcon}).addTo(OpenStreetMapService.macarte);
        });
      });
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

    // Autre methodes à implémenter

    /** @description rétourne le nom de la ville courante, à partir de la latitude
     * et de la longitude.
     * @param {}
     * @return {villeName} 
    */
    public static getVilleName(){
      return 'Douala';
    }

    /** 
    * @description Change les coordonnées geographique en fonction du lieu choisi(ville) par l'utilisateur. on se sert à 
    */
    chercher(ville){
      var reponse=this.httpClient.get("https://nominatim.openstreetmap.org/search.php?q="+ville+"+&polygon_geojson=1")
      reponse.subscribe((data: any) => {
        OpenStreetMapService.latitude=data.getCenter().lat;
        OpenStreetMapService.longitude=data.getCenter().lng;
      });
      //this.latitude=reponse.getCenter().lat;
      //this.longitude=reponse.getCenter().lng;
    }
}
