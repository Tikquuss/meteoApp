import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
/** @description Le service de map depend de Leaflet qui doit être inclure à notre page dans l'entête
 * Raison pour laquelle plus bas vous croirez qu'il y'a une erreur avec "L". Le code à inserer dans l'entete est dispoible chez Nanda.
 */
export class OpenStreetMapService {

    latitude=4.04827;
    longitude=9.70428; //Il s'agit des coordonnées de Douala
    macarte;
  constructor(private httpClient: HttpClient) {
    
   }
   /** @description Initialise la map:permet d'afficher la map centrer en latitude et longitude.
   */
  initMap() {       
		this.macarte = L.map('map').setView([this.latitude, this.longitude], 11);
          
		L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                    minZoom: 1,
                    maxZoom: 20
                }).addTo(this.macarte);
           var marker = L.marker([this.latitude, this.longitude]).addTo(this.macarte);
 /** @description Recupere les coordonnées geographique du lieu choisi(par clic) par l'utilisateur.
 */
    this.macarte.on('click', function(e) {
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      this.latitude=e.latlng.lat;
      this.longitude=e.latlng.lng;
    });
 }
 /** @description Change les coordonnées geographique en fonction du lieu choisi(ville) par l'utilisateur. on se sert à 
 */
geoLocation(ville){
    var reponse=this.httpClient.get("https://nominatim.openstreetmap.org/search.php?q="+ville+"+&polygon_geojson=1");
    this.latitude=reponse.getCenter().lat;
    this.longitude=reponse.getCenter().lng;
 }
}
