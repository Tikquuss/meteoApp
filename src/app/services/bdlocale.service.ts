import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { resolve } from 'q';
import { Utilisateur } from '../models/utilisateur';
import { Ville } from '../models/ville';

/**
    * Le service permettant d'accéder et de modifier les données de la BD
    * @class BDlocaleService
*/

@Injectable({
  providedIn: 'root'
})
export class BdlocaleService {
  constructor() { }

  /**
    * permet l'ouverture de la BD et sa mise a jour
    * @return Utilisateur
  */
  openDB(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open("myDatabase", 3);

      request.onupgradeneeded = (event: any) => {
        //C'est ici qu'on créé ou modifie la structure de la base

        let db = event.target.result;

        //console.log("onupgradeneeded")
        //db.deleteObjectStore("utilisateur");
        //creation de utilisateur
        if (!db.objectStoreNames.contains("utilisateur")) {
          var store = db.createObjectStore("utilisateur", { keyPath: "nom" });
          store.createIndex('dateNaissance', 'dateNaissance', { unique: false });
          store.createIndex('sexe', 'sexe', { unique: false });
          store.createIndex('photo', 'photo', { unique: false });
          store.createIndex('ville', 'ville', { unique: false });
          store.createIndex('mdp', 'mdp', { unique: false });
        }

        //creation de ville
        if (!db.objectStoreNames.contains("ville")) {
          var store2 = db.createObjectStore("ville", { keyPath: "nom" });
          store2.createIndex('posX', 'posX', { unique: false });
          store2.createIndex('posY', 'posY', { unique: false });
          store2.createIndex('region', 'region', { unique: false });
          store2.createIndex('pays', 'pays', { unique: false });
        }
      }

      request.onsuccess = event => {
        resolve(request.result);
      };
      request.onerror = (event: any) => {
        reject(request.error);
      };


    });

  }

  /**
    * permet d'ajouter ou mettre a jour une valeur dans une table donnée
    * @param {IDBDatabase} db - base de donnée
    * @param {string} storeName - nom de la table dans laquelle on veut stocker
    * @param {any} value - valeur qu'on veut stocker dans la table ou mettre a jour 
  */
  setValue(db: IDBDatabase, storeName: string, value: any): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      //On commence par ouvrir une transaction d'écriture
      const transaction: IDBTransaction = db.transaction(storeName, 'readwrite');
      const store: IDBObjectStore = transaction.objectStore(storeName);
      //La méthode put ajoute où met à jour une valeur dans la base
      const request: IDBRequest = store.put(value);
      request.onsuccess = event => {
        resolve(true);
      };
      request.onerror = (event: any) => {
        transaction.abort();
        reject(event.error);
      };
    });
  }

  /**
    * permet d'ajouter ou mettre a jour un utilisateur
    * @param {Utilisateur} user - valeur qu'on veut stocker dans la table ou mettre a jour 
  */
  async setUser(user: Utilisateur): Promise<Boolean> {
    let db = await this.openDB();
    return new Promise<Boolean>((resolve, reject) => {
      let val = this.setValue(db, 'utilisateur', user);
      val.then((v) => {
        resolve(v);
      })
    });
  }

  /**
    * initialise la bd avec un utilisateur et différentes villes
  */
  async initValues() {
    let db = await this.openDB();

    await this.setValue(db, "utilisateur", { nom: "Fandio", sexe: "Homme", ville: "Yaounde", photo: "tof", mdp: "esdras" });

    await this.setValue(db, "ville",
      { nom: "Yaounde", posX: 3.870, posY: 11.520, region: "Centre", pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Obala", posX: 4.170, posY: 11.530, region: "Centre", pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Douala", posX: 4.060, posY: 9.710, region: "Litteral", pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Edea", posX: 3.800, posY: 10.120, region: "Littoral", pays: "Cameroun" });


  }

  /**
    * permet de récupérer une ligne dans une table donnée grâce à sa clé
    * @param {IDBDatabase} db - base de donnée
    * @param {string} storeName - nom de la table
    * @param {any} key - cle de l'element 
    * @return T
  */
  getValue<T>(db: IDBDatabase, storeName: string, key: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = event => {
        resolve(request.result);
      };
      request.onerror = (event: any) => {
        reject(event.error);
      };
    });
  }

  /**
    * permet de vérifier si une personne est inscrite parmi nos utilisateurs. Retourne l'utilisateur
    * en question si ce dernier est valide et null sinon
    * @param {string} nom - nom de l'utilisateur
    * @param {string} mdp - mot de passe de l'utilisateur 
    * @return Utilisateur
  */
  async verify(nom: string, mdp: string): Promise<Utilisateur> {
    let db = await this.openDB();
    return new Promise<Utilisateur>((resolve, reject) => {
      let user = this.getValue<Utilisateur>(db, "utilisateur", nom);
      user.then((use: Utilisateur) => {
        if (use !== undefined && use !== null){
          if (use.mdp === mdp){
            resolve(use);
          }
          resolve(null);
        }
        else{
          resolve(null);
        }
        resolve(null);
      });
    });
  }
  /*
  addItem(nomTable: string, data) {
    this._request.onsuccess = ev => {
      const db = ev.target.result;
      const transaction = db.transaction(nomTable, 'readwrite');
      const store = transaction.objectStore(nomTable);
      store.add(data);

      transaction.onerror = ev => {
        console.error("Une erreur est survenue!", ev.target.error.message);
      };
    }
  }
  */

  /**
    * permet de rechercher des valeurs vérifiant une condition search dans une table
    * @param {IDBDatabase} db - base de donnée
    * @param {string} storeName - nom de la table
    * @param {any} search - condition de recherche 
    * @return T[]
  */
  searchValues<T>(db: IDBDatabase, storeName: string, search: any) {
    const range = IDBKeyRange.lowerBound(search);
    let results = [];
    return new Promise<T[]>((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.openCursor(range);
      request.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);

          cursor.continue;
        }
        else {
          resolve(results);
        }
      };
      request.onerror = (event: any) => {
        reject(event.error);
      };
    });
  }

  /**
    * permet de retourner la ville a partir de son nom
    * @param {string} nom - nom de la ville
    * @return Ville
  */
  async getVilleByNom(nom: string): Promise<Ville> {
    let db = await this.openDB();
    return new Promise<Ville>((resolve, reject) => {
      let villePromise = this.getValue<Ville>(db, "ville", nom);
      villePromise.then((ville: Ville) => {
        resolve(ville);
      });
    });
  }

  /**
    * permet de retourner des villes a partir de leur région d'appartenance
    * @param {string} key - nom de la region
    * @return Ville[]
  */
  async getVilleByRegion(key: string): Promise<Ville[]> {
    let db = await this.openDB();
    return new Promise<Ville[]>((resolve, reject) => {
      let villePromise = this.getByIndex<Ville>(db, "ville", "region", key);
      villePromise.then((villes: Ville[]) => {
        resolve(villes);
      });
    });
  }

  /**
  * permet de retourner des villes a partir de leur pays d'appartenance
  * @param {string} key - nom du pays
  * @return Ville[]
*/
  async getVilleByPays(key: string): Promise<Ville[]> {
    let db = await this.openDB();
    return new Promise<Ville[]>((resolve, reject) => {
      let villePromise = this.getByIndex<Ville>(db, "ville", "pays", key);
      villePromise.then((villes: Ville[]) => {
        resolve(villes);
      });
    });
  }

  /**
    * permet de rechercher des éléments ayant une valeur donnée dans un index donné
    * @param {IDBDatabase} db - base de donnée
    * @param {string} storeName - nom de la table
    * @param {string} index - nom de l'index
    * @param {any} key - valeur de l'index en question (exemple "Yaounde" pour l'index "ville") 
    * @return T[]
  */
  getByIndex<T>(db: IDBDatabase, storeName: string, indexName: string, key: any): Promise<T[]> {
    let results = [];
    return new Promise<T[]>((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      //on peut aussi faire index.get si on souhaite lire qu'une seule valeur
      const request = index.openCursor(key);
      request.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = (event: any) => {
        reject(event.error);
      };
    });
  }

  // Ajouté
  async getUserByUserName(username: string): Promise<Utilisateur> {
    let db = await this.openDB();
    return new Promise<Utilisateur>((resolve, reject) => {
      this.getValue<Utilisateur>(db, "utilisateur", username).then(
        (utilisateur: Utilisateur) => {
          resolve(utilisateur);
        }
      );
    });
  }

  
  /**
   * Retourne tous les pays du monde
   * @param {} 
   * @returns {Array of countries}
  */
  public getCountries(){
    return ['Cameroun'];
  }

  /**
   * Retourne tout les villes d'un pays donné
   * @param {countrie : String} 
   * @returns {Array of cities}
  */
  getRegionsByCountrie(countrie){
    // Uniquement le cameroun pour l'instant
    switch(countrie){
      case 'Cameroun' :
        return ['Ouest','Extrême-Nord', 'Nord', 'Adamawoua','Est','Centre', 
                'Sud','Littoral', 'Nord-Ouest','Sud-Ouest'];
      default:
        return [];
    }
  }

  /**
   * Retourne les villes d'une region donnée
   * @param {region : String} 
   * @returns {Array of cities}
  */
  getVillesByRegion(region){
    // Normalement c'est :
    /* 
     this.getVilleByRegion(region).then(
        (ville: Ville[]) => {
            return ville;
        }
    );
    //*/
    // sauf que ca renvoit peu de villes et ne gere pas toutes les regions.
    // Fandio doit rendre ca dynamique en peuplant la BD de villes
    switch(region){
      case 'Ouest':
        return ['Baffoussam', 'Mbouda'];
      case 'Extrême-Nord': 
        return ['Maroua', 'Walay', 'Djam'];
      case 'Nord':
        return ['Garoua', 'Walay', 'Djam'];
      case 'Adamawoua':
        return ["Ngaoundere",'Walay', 'Djam'];
      case 'Est':
        return ['Bertoua', 'Abong-Mbang'];
      case 'Centre': 
        return ['Yaounde', 'Obala'];
      case 'Sud':
        return ['Ebolowa', 'Makanah'];
      case 'Littoral':
        return ['Douala', 'Ebolotowa', 'Boumniebel']; 
      case 'Nord-Ouest':
        return ['Bamenda', 'Caleb', 'Nfor', 'Mutia'];
      case 'Sud-Ouest':
        return ['Buea', 'Caleb', 'Nfor', 'Mutia'];
    }
    return [];
  }

  /**
   * Retourne tous les régions des pays de la base de données
   * @param {} 
   * @returns {Map of <pays, [regions pays]>}
  */
  public getRegions(){
    let regions = new Map(); // <pays, [regions]>
    for(let countrie of this.getCountries()){
      regions.set(countrie, this.getRegionsByCountrie(countrie));
    }
    return regions;
  }

  /**
   * Retourne tous les villes des regions/pays de la base de données
   * @param {limit_to_region : boolean} 
   * @returns {Map of <region, [ville de la region]>} si limit_to_region = true
   * @returns {Map of <pays, [<region du pays, [ville de la region]>]>} si limit_to_region = false
   * Dans le second cas c'est un map de map du prémiere cas
  */
  getCities(limit_to_region = true){
    let cities = new Map(); // <pays, [regions]>
    if(limit_to_region){
      for(let regions of this.getRegions().values()){
        for(let region of regions){
          cities.set(region, this.getVillesByRegion(region));
        }
      }
    }else{
      for(let countrie of this.getCountries()){
        let c = new Map();
        for(let region of this.getRegionsByCountrie(countrie)){
            c.set(region, this.getVillesByRegion(region))
        }
        cities.set(countrie, c)
      }
    }
    return cities;
  }
}
