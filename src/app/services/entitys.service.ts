import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray  } from '@angular/forms';


import { Field } from '../models/field.model';
import { FormStructure, Entity } from '../models/entitys-util';

import { Enregistreur, Controlleur } from '../models/entitys.model';

import { appRoutes } from '../app.module';

@Injectable()
export class EntitysService {
    entitysList : {
        entityLabel : string,
        routerLink : string
      }[] = [
        {
          entityLabel : 'Enregistreur',
          routerLink : "Enregistreur"
          
        },
        {
          entityLabel : 'Controlleur',
          routerLink : 'Controlleur',
        }
      ];

    entity : Entity = new Enregistreur();
    constructor() { }

    getEntitysList(){
        return this.entitysList;
    }

    getEntitysServiceByClass(entityClass){
      var entityData : Entity[];
      // todo : extraire les données de la classe consernée 
      // dans la base de données envoyer 
      return entityData;
    }

    isClass(entityClass){
      return true;
    }

    getClassByName(entityClass_Name){
      switch(entityClass_Name){
        case 'Enregistreur' :
          return new Enregistreur();
          break;
        case 'Controlleur' :
          return new Controlleur();
          break;
        default :
          return undefined;
          break;
      }
    }
}