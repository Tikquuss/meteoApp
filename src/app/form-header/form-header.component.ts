import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit {

  @Input() headerAppRoot : {
    routerLink : string,
    label : String
  }[]= [
    {
      routerLink : '/form/enregistreur/modify',
      label : 'Enregistreur'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
