import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Entity } from '../../models/entitys-util';
import { EntitysService } from '../../services/entitys.service';

@Component({
  selector: 'app-view-data-of-entity',
  templateUrl: './view-data-of-entity.component.html',
  styleUrls: ['./view-data-of-entity.component.css']
})

/**
 * path: 'form/:entity_class'
 * @class
 * @classdesc Voir toutes les occurrences de entity_class stockées dans 
 * la base de données; `404` si entity_class n’est pas une table de la BD 
 * ou plus généralement un modèle.  
 * Exemple : «form/Enregistreur» permet de visualiser les enregistreurs 
 * présents dans la base de données.
*/

export class ViewDataOfEntityComponent implements OnInit {

  entityData : Entity[];
  // todo : enlever ces attribut apres avoir fait le template
  entityClass : string;
  Table = [1, 2, 3];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private entitysService : EntitysService) {
    this.entityClass = this.route.snapshot.params['entity_class'];
    console.log(this.entityClass);
    if(this.entitysService.isClass(this.entityClass) && this.entityClass != '404'){
      this.entityData = this.entitysService.getEntitysServiceByClass(this.entityClass);
    }else{
      this.router.navigate(['/form/404']);
    }
  }

  ngOnInit() {
  }

  rollback(){
    this.router.navigate(['/form/view']);
  }

  Detail(i){
    this.router.navigate(['/form/'+this.entityClass+'/view/'+i]);
  }
}
