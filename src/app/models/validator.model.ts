import { Validators } from '@angular/forms';

/**
 * Le constructeur de cette classe prend optionellement un litteral de parametres.
 * @class
 * @classdesc Rédefinition au format json de la liste des validators usuels 
*/
export class Validator{
    required: boolean;
    pattern : string;
    max_length : number;
    min_length : number;
    max_value : number;
    min_value : number;

    constructor(options: {
        required?: boolean,
        pattern? : string,
        max_length? : number,
        min_length? : number,
        max_value? : number,
        min_value? : number,
      } = {}) {
        this.required = options.required;
        this.pattern = options.pattern;
        this.max_length = options.max_length;
        this.max_length = options.min_length;
        this.max_value = options.max_value;
        this.min_value = options.min_value;
    }

  /**
   * Consolide tout nos validators dans une liste, utilisable par un formControl
   * @param {} 
   * @returns {list of validators}
  */
    toArray(){
      var validator = [], i = 0;
      
      if(this.required){
        validator[i] = Validators.required;
        i++;
      }
      if(this.pattern != undefined){
        validator[i] = Validators.pattern(this.pattern);
        i++;
      }
      if(this.max_length != undefined){
        validator[i] = Validators.maxLength(this.max_length+1);
        i++;
      }
      if(this.min_length != undefined){
        validator[i] = Validators.minLength(this.min_length);
        i++;
      }
      if(this.max_value != undefined){
        validator[i] = Validators.max(this.max_value);
        i++;
      }
      if(this.min_value != undefined){
        validator[i] = Validators.min(this.min_value);
        i++;
      }
      return validator;
    }
}

export class ValidatorEmail extends Validator{
  toArray(){
    var l = super.toArray();
    l.push(Validators.email);
    return l;
  }
}