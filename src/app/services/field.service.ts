import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray  } from '@angular/forms';


import { Field } from '../models/field.model';
import { FormStructure, Entity } from '../models/entitys-util';

import { Enregistreur, Controlleur } from '../models/entitys.model';

import { appRoutes } from '../app.module';

@Injectable()
export class FieldService {
    entity : Entity = new Enregistreur();
    constructor(private formBuilder : FormBuilder) { }
    
    toFormGroup(fields: { legend? : string, fields? : Field<any>[]}[] = []) {
        let group: any = {};
        /*
        fields.forEach(fields => {
            fields.fields.forEach(field => {
                var validator = field.validator.toArray();
                group[field.name] = validator.length != 0 ? 
                                    new FormControl(field.value || '', validator)
                                    : 
                                    //new FormArray([]);
                                    new FormControl(field.value || '');
                
                if(field.meta_data.type != 'set'){
                    group[field.name] = validator.length != 0 ? 
                                    new FormControl(field.value || '', validator)
                                    : 
                                    new FormControl(field.value || '');
                    
                }else{
                    group[field.name] = validator.length != 0 ? 
                                    new FormControl(field.value || '', validator)
                                    : 
                                    new FormControl(field.value || '');
                    //group[field.name] = this.formBuilder.array([]);
                    //group[field.name] = new FormArray([]);
                }
                
            }); 
        });
        return new FormGroup(group);
        //*/
        //*
        fields.forEach(fields => {
            fields.fields.forEach(field => {
                var validator = field.validator.toArray();
                if(field.meta_data.type != 'set'){
                    group[field.name] = validator.length != 0 ? 
                                    [field.value || '', validator]
                                    : 
                                    field.value || '';
                    
                }else{
                     group[field.name] = validator.length != 0 ? 
                                    [field.value || '', validator]
                                    : 
                                    field.value || '';
                    //group[field.name] = this.formBuilder.array([]);
                }    
            }) 
        });
        return this.formBuilder.group(group);
        //*/
    }

    // Todo: rendre asynchronous
    getFormStructure(formStructureParameters : {
            entity : Entity,
            type : string
        }){
        /*
        appRoutes.push({
            path: '', 
            component:  FormStructure
        })
        console.log("appRoutes is modified -----------------------------");
        console.log(appRoutes);
        //*/
        return new FormStructure(formStructureParameters.entity, formStructureParameters.type);
    }
}