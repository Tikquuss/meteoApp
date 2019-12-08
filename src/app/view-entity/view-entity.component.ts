import { Component, OnInit, Input } from '@angular/core';
import { EntitysService } from '../services/entitys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-entity',
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.css']
})
export class ViewEntityComponent implements OnInit {

  entitysList : {
    entityLabel : string,
    routerLink : string,
  }[];

  constructor(private entitysService : EntitysService,
              private router: Router) { 
    this.entitysList = entitysService.getEntitysList()
  }

  ngOnInit() {
  }

  List(link){
    this.router.navigate(['/form/'+link]);
  }
  
  New(link){
    this.router.navigate(['/form/'+link+'/new']);
  }
}
