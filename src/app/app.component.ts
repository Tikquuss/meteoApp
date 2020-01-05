import {Component, ViewEncapsulation, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'meteoApp';

  constructor(@Inject(DOCUMENT) private document: any) { }

  getDoc() {
    return this.document;
  }
}
