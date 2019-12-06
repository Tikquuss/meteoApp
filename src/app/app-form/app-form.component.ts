import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FieldService } from '../services/field.service';
import { FormStructure, Entity } from '../models/entitys-util';
import { appRoutes } from '../app.module';
import { rootableEntitys, Enregistreur } from '../models/entitys.model';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {

  formStructure :  FormStructure; //todo : convertir en un tableau de form structure plus tard
  
  constructor(private fieldService: FieldService, private router: Router) {
    this.ComputeAppRoutes();
    this.formStructure = this.fieldService.getFormStructure(this.wichEntity());
  }

  ngOnInit() {
  }
  
  wichEntity(){
    var formStructureParameters : {
      entity : Entity,
      type : string 
    } =
    {
      entity : new Entity(),
      type : ''
    }

    switch(this.router.url){
      case '/form' :
        formStructureParameters = {
          entity : new Enregistreur(), 
          type : "enregistrement"
        }
        break;
      case '/form/enregistreur/modify' :
        formStructureParameters = {
          entity : new Enregistreur(), 
          type : "modification"
        }
        break;
    }

    return formStructureParameters;
  }

  headerAppRoot(){
    return [
      {
        routerLink : '/form/enregistreur/modify',
        label : 'Enregistreur'
      }
    ]
  }

  ComputeAppRoutes(){
    for(let entityRootInfo of rootableEntitys){
      appRoutes.push({ 
        path: entityRootInfo.root, 
        component:  AppFormComponent 
      });
    }
  }
}
