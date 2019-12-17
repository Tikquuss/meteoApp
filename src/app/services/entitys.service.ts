import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray  } from '@angular/forms';


import { Field } from '../models/field.model';
import { Entity } from '../models/entitys-util';
import { Utils } from '../models/entitys.model';

import { appRoutes } from '../app.module';

/**
 * Service de gestion du CRUD
 * @class
 * @classdesc Ce service est le seul capable de communiquer avec 
 * le serveur (de base) de données
*/
@Injectable()
export class EntitysService {

    /**
     * @namespace
     * @property {object}  defaults              - The default values for entitysList
     * @property {string}  defaults.entityLabel  - The default label of Entity.
     * @property {string}  defaults.routerLink   - The routerLink of Entity. 
    */
    entitysList : {
        entityLabel : string,
        routerLink : string
    }[];

    constructor(private utils : Utils) {
      this.entitysList = utils.entitysList;
    }

    /**
    * Retourne la liste de toutes les entités de la base de données
    * @param {} 
    * @returns { 
        {
          entityLabel : string,
          routerLink : string
        }[]
      }
    */
    getEntitysList(){
        return this.entitysList;
    }

    /** 
    * Teste si une entirée nommée entityClass existe
    * @param {String} [entityClass] 
    * @returns { boolean }
    */ 
    isClass(entityClass){
      // Vérifier si this.utils.entitysList contient une entityClass
      for (let element of this.utils.entitysList) {
        if(element['entityLabel'] == entityClass){
          return true;
        }
      }
      return false;
    }

    /** 
    * Rétourne un objet de type 
    * @param {String} [entityClass] 
    * @returns { boolean }
    */ 
    getClassByName(entityClass_Name){
      return this.utils.getClassByName(entityClass_Name);
    }

    saveORmodify(values, entityClassName, type, entityId){
      if(type == 'modification'){
        this.updateEntity(entityClassName, entityId, values);
      }else{
        this.createEntity(entityClassName, values)
      }
    }

    setEntityFieldsByJson(entityClass_Name, json){
      const entityClass = this.getClassByName(entityClass_Name);
      /*
      todo : utiliser Sequelize pour modifier/génerer la méthode generateFormStructureField(data?)
      de entityClass
      */
    }

    getEntitysDataByClass(entityClass){
      var entityData : Entity[] = [];
      // todo : extraire les données de la classe consernée 
      // dans la base de données envoyer 
      return entityData;
    }

    createEntity(entityClass_Name, values){
    }

    readEntity(entityClass_Name, entity_Id){
    }

    updateEntity(entityClass_Name, entity_Id, values){
    }

    deleteEntity(entityClass_Name, entity_Id){
    }
}