import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldService } from '../services/field.service';
import { FormStructure} from '../models/entitys-util';
import { EntitysService } from '../services/entitys.service';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})

/**
 * paths : 
      * (1) 'form/:entity_class/:entity_id'  
      * (2) 'form/:entity_class/new'
 * @class
 * @classdesc 
 * (1) 
    * Modifier  les informations de l’entité de type entity_class ayant l’id  
    * entity_id ; 404 si entity_class n’est pas une table de la BD ou plus
    * généralement un modèle, ou si l’entité de type entity_class  ayant 
    * l’identifiant  entity_id  n’existe pas en BD.  
  * Exemple : «form/Enregistreur/5» pour modifier les informations de l’enregistreur
              ayant l’id 5 dans la base de données. 
 * (2) 
    * Créer une nouvelle entité de type entity_class; 404 si entity_class n’est 
    * pas une table de la BD ou plus généralement un modèle.  
  * Exemple : «form/Enregistreur/new» pour créer un nouveau enregistreur.
*/
export class AppFormComponent implements OnInit {

  formStructure :  FormStructure; //todo : convertir en un tableau de form structure plus tard
  entityClass : string;
  entityId : string;

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
  
  wichEntity(){
    //this.entityId = this.router.url.split('/')[3]; // '/form/:entity_class/:entity_id'
    this.entityId = this.route.snapshot.params['entity_id'];
    console.log(" console.log(this.entityId) --------------");
    console.log(this.entityId);
    if(this.entityId){
    //if(false){
      return { entityClassName : this.entityClass, type : 'modification',  id : this.entityId}
    }else{
      return { entityClassName : this.entityClass, type : 'enregistrement' }
    }
  }
}
