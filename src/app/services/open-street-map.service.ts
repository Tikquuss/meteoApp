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
    public latitude=4.04827;
    public longitude=9.70428; 
    public macarte;

    constructor(private http: HttpClient) {
    }

    /** @description Initialise la map
     * permet d'afficher la map centrer en latitude et longitude.
    */
    initMap(L, id, attribution, minZoom=1, maxZoom=20) {  
      const macarte = L.map(id).setView([this.latitude, this.longitude], 12);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: attribution, minZoom: minZoom, maxZoom: maxZoom
      }).addTo(macarte);
      
      // Le marquer 
      const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      });
      let ville = this.getVilleName();
      var marker = L.marker([this.latitude, this.longitude], {icon: myIcon}).bindPopup(ville).addTo(macarte).openPopup();

      this.http.get('https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=bornes-podotactiles').subscribe((data: any) => {
        data.records.forEach(podotactile => {
          L.marker([podotactile.geometry.coordinates[1], podotactile.geometry.coordinates[0]], {icon: myIcon}).addTo(macarte);
        });
      });
    }
    
    /** @description Recupere les coordonnées geographique du lieu choisi par 
     * l'utilisateur.
     * @return {LatLng}
     * Utiliser ".lat" pour recuperer la latitude et ".lng" pour la logitude
    */
    getlocation(){
        this.latitude=this.macarte.getCenter().lat;
        this.longitude=this.macarte.getCenter().lng;
        return this.macarte.getCenter();
    }

    // Autre methodes à implémenter

    /** @description rétourne le nom de la ville courante
     * @param {}
     * @return {villeName} 
    */
    getVilleName(){
      return 'Douala';
    }
}
