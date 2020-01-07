import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'table-generation';
  json : string=`[{
    "nom":"Foko Henri",
    "username": "henrifoko",
    "email": "henrifoko@gmail.com"},
    {
    "nom":"Farel Kengne",
    "username": "farelKN",
    "email": "farelkengne@email.com"
    }]`;
  url = 'https://jsonplaceholder.typicode.com/users';
}
