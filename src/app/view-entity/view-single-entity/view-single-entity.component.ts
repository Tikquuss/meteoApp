import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Entity } from '../../models/entitys-util';
import { EntitysService } from '../../services/entitys.service';

/**
 * path: 'form/:entity_class/view/:entity_id'
 * @class
 * @classdesc Voir  les informations de l’entité de type entity_class ayant 
 * l’identifiant entity_id ;404 si entity_class n’est pas une table de la BD ou 
 * plus généralement un modèle, ou si l’entité de type entity_class  ayant 
 * l’identifiant  entity_id  n’existe pas en BD.  
 * Exemple : «form/Enregistreur/view/5» pour visualiser l’enregistreur ayant l’id 
 * 5 dans la base de données.
*/

@Component({
  selector: 'app-view-single-entity',
  templateUrl: './view-single-entity.component.html',
  styleUrls: ['./view-single-entity.component.css']
})
export class ViewSingleEntityComponent implements OnInit {

  // todo : enlever l'attribut apres avoir fait le template
  entityClass : string;
  entityId : string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entitysService : EntitysService) { 
                
      this.entityClass = this.route.snapshot.params['entity_class'];
      this.entityId = this.route.snapshot.params['entity_id'];
      if(this.entitysService.isClass(this.entityClass)){
        //this.entityData = this.entitysService.getEntitysServiceByClass(this.entityClass);
      }else{
        this.router.navigate(['/form/404']);
      }
  }

  ngOnInit() {
  }

  rollback(){
    this.router.navigate(['/form/view/'+this.entityClass]);
  }

}
