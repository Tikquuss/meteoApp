import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../models/field.model';

@Component({
  selector: 'app-single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.css']
})

export class SingleFieldComponent implements OnInit {

  @Input() field : Field<any>;
  @Input() fieldForm: FormGroup;
  errorMessage = '';
  @Output() cacheEmitter =new EventEmitter<any[]>();
  cache : any[] = [];
  @Input() value = '';
  @Input() test = '';

  constructor() { }

  ngOnInit() {
    console.log("initialisation d'un fields")
   }

  emitCache(){
     this.cacheEmitter.emit(this.cache);
  }
  
  get isValid() { 
    var valid = this.fieldForm.controls[this.field.name].valid;
    if(!valid){
      this.errorMessage = 'champs obligatoire';
    }
    return valid; 
  }
  
  onAdd(something) {
    this.value = something;
    /*
    var input = document.getElementById(this.field.type.id);
    input.value = input.value + ';' + something;
    var input_parent = input.parentNode;
    var new_element = document.createElement('input');
    new_element.value = input.value;
    var e = input.cloneNode();
    e.value = input.value;
    
    //this.cache.push(input.value);
    //console.log(this.cache);
    //input.value = '';
    input_parent.insertBefore(new_element,input);
    input_parent.insertBefore(e,input);
    input_parent.removeChild(input);
    //*/
  }
  
  onSomethingEmit(something){
    console.log('get something - - - - - - - - -');
    console.log(something);
    this.onAdd(something);
    this.cache.push(something);
    this.emitCache();
  }
}
