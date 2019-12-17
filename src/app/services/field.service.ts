import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray  } from '@angular/forms';
import * as $ from 'jquery';

import { Field } from '../models/field.model';
import { FormStructure} from '../models/entitys-util';
import { Utils } from '../models/entitys.model'
import { EntitysService } from './entitys.service';

@Injectable()
export class FieldService {
    constructor(private formBuilder : FormBuilder,
                private utils : Utils,
                private entitysService : EntitysService) { }
    
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
                        entityClassName : string,
                        type : string,
                        id? : string
                    }){
        if(formStructureParameters.type == "modification")
            return new FormStructure(
                formStructureParameters, 
                this.utils.getClassByName(formStructureParameters.entityClassName),
                this.entitysService.readEntity(
                    formStructureParameters.entityClassName, formStructureParameters.id
                )
            );
        else
            return new FormStructure(
                formStructureParameters, 
                this.utils.getClassByName(formStructureParameters.entityClassName)
            );
                
    }
}