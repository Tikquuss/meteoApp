import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-modal',
  templateUrl: './single-modal.component.html',
  styleUrls: ['./single-modal.component.css']
})
export class SingleModalComponent {
  
  something : any;
  @Input() label : string;
  @Output() somethingEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emitSomething(){
    this.somethingEmitter.emit(this.something);
  }
}
