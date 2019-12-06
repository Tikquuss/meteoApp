import {Validator} from './validator.model'

export class Field<T>{

    label: string;
    validator : Validator;
    name: string;
    type : {
      type? : string,
      id? : string,
      show? : string
    };
    value: T;
    meta_data : {
      type? : string,
      data? : any[]
    };
    
    constructor(options: {
        label?: string,
        validator? : Validator,
        name? : string,
        type? : {
          type? : string,
          id? : string,
          show? : string
        },
        value? : T,
        meta_data? : {
          type? : string,
          data? : any[]
        }
      } = {}) {
        this.label  = options.label || '';
        this.validator  = options.validator || new Validator();
        this.name = options.name || '';
        this.type = options.type || {};
        this.value = options.value;
        this.meta_data = options.meta_data || {type : ''};
    }
  }