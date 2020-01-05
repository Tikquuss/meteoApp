import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { resolve } from 'q';
import { Utilisateur } from '../models/utilisateur';
import { Ville } from '../models/ville';
import { Pays } from '../models/pays';
import { Region } from '../models/region';

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
      const request = window.indexedDB.open("myDatabase", 4);

      request.onupgradeneeded = (event: any) => {
        //C'est ici qu'on créé ou modifie la structure de la base

        let db = event.target.result;

        //console.log("onupgradeneeded")
        //db.deleteObjectStore("utilisateur");

        //creation de pays
        if (!db.objectStoreNames.contains("pays")) {
          var store = db.createObjectStore("pays", { keyPath: "nom" });
        }

        //creation de region
        if (!db.objectStoreNames.contains("region")) {
          var store = db.createObjectStore("region", { keyPath: "nom" });
          store.createIndex('pays', 'pays', { unique: false });
        }

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
        if (v === true) {
          resolve(v);
        }
        else {
          reject(v);
        }
      })
    });
  }

  /**
   * initialisation des Regions du Cameroun
   */
  async initRegions() {
    let db = await this.openDB();

    await this.setValue(db, "pays",
      { nom: "Adamaoua", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Centre", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Est", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Extrême-Nord", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Littoral", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Nord", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Nord-Ouest", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Ouest", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Sud", pays: "Cameroun" });

    await this.setValue(db, "pays",
      { nom: "Sud-Ouest", pays: "Cameroun" });
  }
  /**
    * initialise la bd avec un utilisateur et différentes villes
  */
  async initValues() {
    let db = await this.openDB();

    //initialisation d'un utilisateur par defaut
    //await this.setValue(db, "utilisateur", { nom: "Fandio", sexe: "Homme", ville: "Yaounde", photo: "tof", mdp: "esdras" });

    //initialisation du pays
    await this.setValue(db, "pays",
      { nom: "Cameroun" });

    this.initRegions();
    this.initVilles();
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
        if (use !== undefined && use !== null) {
          if (use.mdp === mdp) {
            resolve(use);
          }
          resolve(null);
        }
        else {
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
  /**
   * Pour supprimer un utilisateur de la BD
   * @param {key : Utilisateur} 
   * @returns {}
  */
  async removeUser(key: any): Promise<Boolean> {
    let db = await this.openDB();
    return this.delete(db, 'utilisateur', key);
  }

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
     * permet de supprimer un element d'un tableau
   */
  delete<T>(db: IDBDatabase, storeName: string, key: string): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      request.onsuccess = event => {
        resolve(true);
      };
      request.onerror = (event: any) => {
        reject(event.error);
      };
    });
  }

  /**
   * permet de recuperer tous les elements d'une table
   * @param storeName 
   */
  async getAll<T>(storeName: string): Promise<T[]> {
    let db = await this.openDB();
    let results = [];
    return new Promise<T[]>((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);

      const request = store.getAll();
      request.onsuccess = (event: any) => {
        resolve(request.result);
      };
      request.onerror = (event: any) => {
        reject(event.error);
      };
    });
  }

  /**
   * Retourne tous les pays du monde
   * @param {} 
   * @returns {Array of countries}
  */
  async getCountries(): Promise<string[]> {
    let co = await this.getAll<Pays>('pays');
    let results = [];
    return new Promise<string[]>((resolve, reject) =>{
      for (let pays of co) {
        results.concat(pays.nom);
      }
      resolve(results);
    });
  }

  /**
   * Retourne tout les villes d'un pays donné
   * @param {countrie : String} 
   * @returns {Array of cities}
  */
  async getRegionsByCountrie(country): Promise<string[]> {
    let db = await this.openDB();
    let co = await this.getByIndex<Region>(db, 'region', 'pays', country);
    let results = [];
    return new Promise<string[]>((resolve, reject)=>{
      for (let region of co) {
        results.concat(region.nom);
      }
      resolve(results);
    });
  }

  /**
   * Retourne les villes d'une region donnée
   * @param {region : String} 
   * @returns {Array of cities}
  */
  async getVillesByRegion(region): Promise<string[]> {
    let co = await this.getVilleByRegion(region);
    let results = [];
    return new Promise<string[]>((resolve, reject)=>{
      for (let ville of co) {
        results.concat(ville.nom);
      }
      resolve(results);
    });
  }

  /**
   * Retourne tous les régions des pays de la base de données
   * @param {} 
   * @returns {Map of <pays, [ce pays]>}
  */
  public async getRegions() {
    let ce = new Map(); // <pays, [ce]>
    let countries = await this.getCountries();
    for (let countrie of countries) {
      ce.set(countrie, this.getRegionsByCountrie(countrie));
    }
    return ce;
  }

  /**
   * Retourne tous les villes des ce/pays de la base de données
   * @param {limit_to_region : boolean} 
   * @returns {Map of <region, [ville de la region]>} si limit_to_region = true
   * @returns {Map of <pays, [<region du pays, [ville de la region]>]>} si limit_to_region = false
   * Dans le second cas c'est un map de map du prémiere cas
  */
  async getCities(limit_to_region = true) {
    let cities = new Map(); // <pays, [regions]>
    if (limit_to_region) {
      for (let ce of (await this.getRegions()).values()) {
        for (let region of ce) {
          cities.set(region, this.getVillesByRegion(region));
        }
      }
    } else {
      for (let countrie of (await this.getCountries())) {
        let c = new Map();
        for (let region of (await this.getRegionsByCountrie(countrie))) {
          c.set(region, this.getVillesByRegion(region))
        }
        cities.set(countrie, c)
      }
    }
    return cities;
  }

  async initVilles() {
    let db = await this.openDB();

    let ad = "Adamaoua";
    let ce = "Centre";
    let es = "Est";
    let li = "Littoral";
    let nd = "Nord";
    let no = "Nord-Ouest";
    let sd = "Sud";
    let so = "Sud-Ouest";
    let ou = "Ouest";
    let ex = "Extrême-Nord";


    //creation des villes de la region de l'adamaoua
    await this.setValue(db, "ville",
      { nom: "Ngaoundere", posX: 7.320, posY: 13.580, region: ad, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Meiganga", posX: 6.520, posY: 14.290, region: ad, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Djang", posX: 5.460, posY: 10.050, region: ad, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Banyo", posX: 6.750, posY: 11.810, region: ad, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Tibati", posX: 6.470, posY: 12.620, region: ad, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Tignere", posX: 7.370, posY: 12.650, region: ad, pays: "Cameroun" });

    //creation des villes de la region du centre
    await this.setValue(db, "ville",
      { nom: "Yaounde", posX: 3.870, posY: 11.520, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Obala", posX: 4.170, posY: 11.530, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mbalmayo", posX: 3.520, posY: 11.500, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bafia", posX: 4.750, posY: 11.230, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Akonolinga", posX: 3.770, posY: 12.250, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Eseka", posX: 3.650, posY: 10.770, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Obala", posX: 4.170, posY: 11.530, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Nanga eboko", posX: 4.670, posY: 12.370, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Nkoteng", posX: 4.510, posY: 12.030, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mfou", posX: 3.970, posY: 11.930, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Monatele", posX: 4.270, posY: 11.270, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Saa", posX: 4.370, posY: 11.450, region: ce, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Ombessa", posX: 4.600, posY: 11.250, region: ce, pays: "Cameroun" });

    //creation des villes de la region de l'est
    await this.setValue(db, "ville",
      { nom: "Bertoua", posX: 4.580, posY: 13.680, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Batouri", posX: 4.430, posY: 14.360, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Garoua boulai", posX: 5.890, posY: 14.550, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Yokadouma", posX: 3.510, posY: 15.050, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Lomie", posX: 3.160, posY: 13.620, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Moloundou", posX: 2.050, posY: 15.200, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Abong mbang", posX: 3.990, posY: 13.170, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Betare Oya", posX: 5.600, posY: 14.080, region: es, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Doume", posX: 4.250, posY: 13.450, region: es, pays: "Cameroun" });


    //creation des villes de la region de l'extreme nord
    await this.setValue(db, "ville",
      { nom: "Kousseri", posX: 12.080, posY: 15.030, region: ex, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Maroua", posX: 10.580, posY: 14.330, region: ex, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Kaele", posX: 10.120, posY: 14.450, region: ex, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mokolo", posX: 10.750, posY: 13.810, region: ex, pays: "Cameroun" });
    await this.setValue(db, "ville",
      { nom: "Yagoua", posX: 10.350, posY: 15.240, region: ex, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mora", posX: 11.040, posY: 14.140, region: ex, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bogo", posX: 10.740, posY: 14.600, region: ex, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mindif", posX: 10.400, posY: 14.430, region: ex, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Meri", posX: 10.790, posY: 14.100, region: ex, pays: "Cameroun" });

    //creation des villes de la region du littoral
    await this.setValue(db, "ville",
      { nom: "Douala", posX: 4.060, posY: 9.710, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Loum", posX: 4.720, posY: 9.730, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Edea", posX: 3.800, posY: 10.120, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Nkongsamba", posX: 4.960, posY: 9.940, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mbanga", posX: 4.510, posY: 9.570, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Manjo", posX: 4.850, posY: 9.820, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Melong", posX: 5.120, posY: 9.940, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Yabassi", posX: 4.470, posY: 9.970, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Dibombari", posX: 4.170, posY: 9.670, region: li, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bonaberi", posX: 4.080, posY: 9.670, region: li, pays: "Cameroun" });

    //creation des villes de la region du nord

    await this.setValue(db, "ville",
      { nom: "Garoua", posX: 9.300, posY: 13.390, region: nd, pays: "Cameroun" });
    await this.setValue(db, "ville",
      { nom: "Guider", posX: 9.930, posY: 13.940, region: nd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Lagdo", posX: 9.050, posY: 13.730, region: nd, pays: "Cameroun" });
    await this.setValue(db, "ville",
      { nom: "Figuil", posX: 9.760, posY: 13.960, region: nd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Tchollire", posX: 8.400, posY: 14.170, region: nd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Poli", posX: 8.470, posY: 13.240, region: nd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Rey bouba", posX: 8.670, posY: 14.180, region: nd, pays: "Cameroun" });

    //creation des villes de la region du nord-ouest
    await this.setValue(db, "ville",
      { nom: "Bamenda", posX: 5.960, posY: 10.150, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Kumbo", posX: 6.220, posY: 10.680, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Wum", posX: 6.400, posY: 10.070, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Ndop", posX: 6.070, posY: 10.470, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Fundong", posX: 6.250, posY: 10.270, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bali", posX: 5.900, posY: 10.010, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Nkambe", posX: 6.600, posY: 10.680, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Njinikom", posX: 6.240, posY: 10.280, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bafut", posX: 6.080, posY: 10.100, region: no, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mbengwi", posX: 6.020, posY: 10.000, region: no, pays: "Cameroun" });

    //creation des villes de la region de l'ouest
    await this.setValue(db, "ville",
      { nom: "Bafoussam", posX: 5.490, posY: 10.410, region: ou, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bangangte", posX: 5.150, posY: 10.510, region: ou, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Foumban", posX: 5.730, posY: 10.900, region: ou, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mbouda", posX: 5.640, posY: 10.250, region: ou, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bana", posX: 5.150, posY: 10.260, region: ou, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Foumbot", posX: 5.520, posY: 10.630, region: ou, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Bafang", posX: 5.170, posY: 10.180, region: ou, pays: "Cameroun" });

    //creation des villes de la region du sud
    await this.setValue(db, "ville",
      { nom: "Limbe", posX: 4.020, posY: 9.190, region: sd, pays: "Cameroun" });
    await this.setValue(db, "ville",
      { nom: "Ebolowa", posX: 2.930, posY: 11.140, region: sd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Sangmelima", posX: 2.940, posY: 11.970, region: sd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Kribi", posX: 2.940, posY: 9.910, region: sd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Djoum", posX: 2.670, posY: 12.670, region: sd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mvangue", posX: 2.970, posY: 11.520, region: sd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Akom", posX: 2.790, posY: 10.560, region: sd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Lolodorf", posX: 3.250, posY: 10.720, region: sd, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Ambam", posX: 2.390, posY: 11.280, region: sd, pays: "Cameroun" });

    //creation des villes de la region du sud-ouest
    await this.setValue(db, "ville",
      { nom: "Kumba", posX: 4.640, posY: 9.440, region: so, pays: "Cameroun" });
    await this.setValue(db, "ville",
      { nom: "Buea", posX: 4.160, posY: 9.230, region: so, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mutengene", posX: 4.080, posY: 9.280, region: so, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Tiko", posX: 4.080, posY: 9.370, region: so, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Fontem", posX: 5.470, posY: 9.880, region: so, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Mamfe", posX: 5.780, posY: 9.290, region: so, pays: "Cameroun" });

    await this.setValue(db, "ville",
      { nom: "Idenao", posX: 4.240, posY: 8.980, region: so, pays: "Cameroun" });
    await this.setValue(db, "ville",
      { nom: "Muyuka", posX: 4.290, posY: 9.420, region: so, pays: "Cameroun" });

  }
}
