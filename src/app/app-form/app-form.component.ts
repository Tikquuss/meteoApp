import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldService } from '../services/field.service';
import { EntitysService } from '../services/entitys.service';

import { FormStructure} from '../models/entitys-util';

import { FormBuilderComponent } from '../form-builder/form-builder.component';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})

/**
 * paths : 
      * (1) 'form/:entity_class/:entity'  
      * (2) 'form/:entity_class/new'
 * @class
 * @classdesc 
 * (1) 
    * Modifier  les informations de l’entité entity de type entity_class; 404 si 
    * entity_class n’est pas une table de la BD ou plus généralement un modèle  
  * Exemple : «form/Enregistreur/__» pour modifier les informations de l’enregistreur
            __ dans la base de données. 
 * (2) 
    * Créer une nouvelle entité de type entity_class; 404 si entity_class n’est 
    * pas une table de la BD ou plus généralement un modèle.  
  * Exemple : «form/Enregistreur/new» pour créer un nouveau enregistreur.
*/
export class AppFormComponent implements OnInit {

  formStructure :  FormStructure; //todo : convertir en un tableau de form structure plus tard
  entityClass : string;
  type : String;

  constructor(private fieldService: FieldService, 
              private router: Router,
              private route: ActivatedRoute,
              private entitysService : EntitysService) {
    this.entityClass = this.route.snapshot.params['entity_class'];
    if(this.entitysService.isClass(this.entityClass)){
      this.formStructure = this.fieldService.getFormStructure(this.wichEntity());
    }else{
      this.router.navigate(['/form/404']);
    }
  }

  ngOnInit() {
  }
  
  /**
     * @namespace
     * @return {
            entityClassName : this.entityClass,   
            entity , // si modification
      }
  */
  wichEntity(){
    let new_or_entity = this.route.snapshot.params['entity'];
    if(new_or_entity == 'new'){
      FormBuilderComponent.type = 'enregistrement';
      return { 
        entityClassName : this.entityClass, 
        jsonOfForm : this.entitysService.getJsonOfForm(this.entityClass)
      }
    }else{
      FormBuilderComponent.type = 'modification';
      return { 
        entityClassName : this.entityClass, 
        entity : JSON.parse(new_or_entity),
        jsonOfForm : this.entitysService.getJsonOfForm(this.entityClass)
      }
    }
  }
}
