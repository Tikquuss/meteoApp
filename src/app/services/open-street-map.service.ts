import { Injectable } from '@angular/core';
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
  constructor() {
    
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
 }
 /** @description Recupere les coordonnées geographique du lieu choisi par l'utilisateur.
 * @return {LatLng}
 * Utiliser ".lat" pour recuperer la latitude et ".lng" pour la logitude
 */
 getlocation(){
    this.latitude=this.macarte.getCenter().lat;
    this.longitude=this.macarte.getCenter().lng;
    return this.macarte.getCenter();
 }
}
