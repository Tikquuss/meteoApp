import { Component, OnInit, Input } from '@angular/core';
import { EntitysService } from '../services/entitys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-entity',
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.css']
})
export class ViewEntityComponent implements OnInit {

  
  entitysNameList : Iterator<String>;

  constructor(private entitysService : EntitysService,
              private router: Router) { 
    this.entitysNameList = entitysService.getEntitysList().keys();
    if('Type_organisme' in this.entitysNameList){
      console.log("Type_organisme-----------");
    }
  }

  ngOnInit() {
  }

  /**
   * @description ecouteur du bouton liste
   * @param link=nom de la classe de l'entité
   */
  List(link){
    console.log('rrrrrrrrrrrrrrrrr',link)
    this.router.navigate(['/form/'+link]);
  }
  
  /**
   * @description ecouteur du bouton Nouveau
   * @param link=nom de la classe de l'entité
   */
  New(link){
    this.router.navigate(['/form/'+link+'/new']);
  }
}
