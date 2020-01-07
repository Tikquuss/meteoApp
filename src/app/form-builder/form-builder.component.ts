import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup} from '@angular/forms';

import { FormStructure } from '../models/entitys-util'; 
import { Field } from '../models/field.model';
import { FieldService } from '../services/field.service';
import { EntitysService } from '../services/entitys.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})

/**
 * @class
 * @classdesc classe qui construit réellement le formulaire
*/
export class FormBuilderComponent implements OnInit {
  @Input() formStructure :  FormStructure;
  form: FormGroup;
  // permet de restructurer le formulaire en fieldset
  fieldsRestructure : {
    legend? : string,
    fields? : Field<any>[][],
    nb_elements_per_colonne? : number
  }[];

  public static type : string; // modification / enregistrement

  // test unitaires
  cache = {};
  test : string = '';

  constructor(private fieldService: FieldService, 
              private router: Router,
              private entitysService : EntitysService) {  }

  ngOnInit() { 
    this.form = this.fieldService.toFormGroup(this.formStructure.fields); 
    this.fieldsRestructure = this.restructureForm();
    this.fillCache(undefined);
  }

  onSubmit() {
    this.entitysService.saveORmodify(this.form.value, 
                                     this.formStructure.entityClassName,
                                     FormBuilderComponent.type
                                     )
    this.router.navigate(['/form/view']);
  }

  //lasySave(){
    //this.onSubmit();
  //}

  // test unitaire
  fillCache(data){
    if(data == undefined){
      this.formStructure.fields.forEach(fields => {
        fields.fields.forEach(field => {
          if(field.meta_data.type == 'set'){
            this.cache[field.name] = '';
          }
        });
      });
    }else{
      this.formStructure.fields.forEach(fields => {
        fields.fields.forEach(field => {
          if(field.meta_data.type == 'set' && data[field.name] != "" && data[field.name] != undefined){
            this.cache[field.name] = this.cache[field.name]+"øø"+data[field.name];
          }
        });
      });
    }
  }

  // test unitaire
  onCacheEmit(cache){
    console.log("le cache a été émit");
    console.log(cache);
    for(let s of cache){
      //this.test = this.test + 's' + s; 
    }
  }

  oldIndex(liste){
    var i = 0;
    for(let i in liste){
      
    }
    //return 	[liste[i] for i in range(len(liste)) if not i%2];
    //return [elt for idx, elt in enumerate(liste) if idx % 2 != 0]
  }

  /**
   * @description methode de restructuration, et de gestion des style
   * @deprecated ne marche pas en core
   */
  restructureForm(){
    var fieldsRestructure : {
      legend? : string,
      fields? : Field<any>[][],
      nb_elements_per_colonne? : number
    }[] = [];
    var length, i = 0, j = 0;
    
    for(let element of this.formStructure.fields){
      //fieldsRestructure[j].legend = element.legend;
      //fieldsRestructure[j].nb_elements_per_colonne = element.nb_elements_per_colonne;

      var f : {
        legend : string,
        fields : Field<any>[][],
        nb_elements_per_colonne : number
      };

      //f.legend = element.legend;
      //f.nb_elements_per_colonne = element.nb_elements_per_colonne;

      length = element.fields.length;
      //var i = 0;
      while(length > element.nb_elements_per_colonne){
        //console.log(i+" ------ "+(i+element.nb_elements_per_colonne));
          //console.log(element.fields.slice(i, i+element.nb_elements_per_colonne));
        if(i == 0){
          f = {
            legend : element.legend,
            fields : [element.fields.slice(i, i+element.nb_elements_per_colonne)],
            nb_elements_per_colonne : element.nb_elements_per_colonne
          }
        }else{
          f.fields.push(element.fields.slice(i, i+element.nb_elements_per_colonne));
        }
        i += element.nb_elements_per_colonne;
        length -= element.nb_elements_per_colonne;
      }
      //console.log('reste ----------------------');
      //console.log(element.fields.slice(i, i+element.fields.length));
      if(i == 0){
        f = {
          legend : element.legend,
          fields : [element.fields.slice(i, i+element.fields.length)],
          nb_elements_per_colonne : element.nb_elements_per_colonne
        }
      }else{
        f.fields.push(element.fields.slice(i, i+element.fields.length));
      }
      i=0;
      j++;
      fieldsRestructure.push(f);
    }
    /*
    var new_fieldsRestructure: {
      legend? : string,
      fields? : Field<any>[][],
      nb_elements_per_colonne? : number
    }[] = [];
    for(let elements of fieldsRestructure){
      var new_element;
      new_element.legend = elements.legend;
      new_element.nb_elements_per_colonne = elements.nb_elements_per_colonne;
      for(let table of elements.fields){
        var new_table;
        for(let field of table){
          new_table.push(new Field<any>(field));
        }
        new_element.fields = new_table;
      }
      new_fieldsRestructure.push(new_element);
    }
    //*/
    return fieldsRestructure;
  }

  toField(field){
    var f : Field<any> =  new Field<any>(field);
    console.log(f);
    return f;
  }
}
