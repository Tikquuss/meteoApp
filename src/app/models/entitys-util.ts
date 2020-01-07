import {Field} from './field.model';
import {Validator, ValidatorEmail} from './validator.model';

export class FormStructure{
  entityClassName : string;
  entity? : Object;
  fields : {
    legend? : string,
    fields? : Field<any>[],
    nb_elements_per_colonne? : number
  }[] = [];

  constructor(
    options : {entityClassName : string, entity? : Object, jsonOfForm? : {}}, 
    entity : Entity 
  ){
    this.entityClassName = options.entityClassName;
    this.entity = options.entity;
    this.fields = entity.generateFormStructureField(
      {jsonOfForm : options.jsonOfForm, data:options.entity}
    );
  }
}

export class Entity{
  generateFormStructureField(options: {jsonOfForm?, data?}){
    let fields = Entity.BuiltFormStructureFieldForOneFieldset(options, "own_information");
    let r = [{legend : '', fields : fields, nb_elements_per_colonne : 2}]
    if(options.jsonOfForm["champs_systemes"]){
      r.push(champsSysteme.generateFormStructureField(options))
    }
    if(options.jsonOfForm["info_personne"]){
      r.push(personneInfo.generateFormStructureField(options));
    }
    return r;
  }

  public static BuiltFormStructureFieldForOneFieldset(options:{jsonOfForm?,data?},...args){
    let fields : Field<any>[]=[];
    if(options.jsonOfForm){
      let jsonfieldSet = options.jsonOfForm
      args.forEach(singleField => {
        jsonfieldSet = jsonfieldSet[singleField]
      });
      for(let jsonfield of jsonfieldSet){
        fields.push(
          new Field({
            label:jsonfield.label,
            validator : (jsonfield.type!='email') ? new Validator(jsonfield.validator||{}):
                                           new ValidatorEmail(jsonfield.validator||{}),
            name: jsonfield.name,
            type : jsonfield.type,
            value: jsonfield.value || '',
            meta_data : jsonfield.meta_data || {type : 'void'}
          })
        )
      }
    }
    if(options.data){
      for(let field of fields){
        field.value = options.data[field.name]
        field.meta_data.checked = field.value;
      }
    }
    return fields;
  }
}

/**
 * json
 * @class
 * @classdesc macro des adresses
*/
export class adresseJson{  
  TEL_MOBILE : [];
  TEL_FIXE : [];
  ICE : [];
  email : [];
  BP : string;

  public static generateFormStructureField(options: {jsonOfForm?, data?}){
    return Entity.BuiltFormStructureFieldForOneFieldset(
      options,
      "info_personne", 
      "adresseJson"
    )
  }
}

/**
 * json
 * @class
 * @classdesc macro des contacts
*/
export class contactJson{  
  TEL_MOBILE : [];
  TEL_FIXE : [];
  email : [];
  localisation : string;
  
  generateFormStructureField(options: {jsonOfForm?, data?}){
    return Entity.BuiltFormStructureFieldForOneFieldset(
      options,
      "contact_json"
    );
  }
}

export class champsSysteme{
  code_createur : string;
  code_modificateur : string;
  statut_vie : string;
  date_creation : Date;
  date_dernier_modification  : Date;

  public static generateFormStructureField(options: {jsonOfForm?, data?}){
    return {legend : 'Champs systemes', 
            fields : Entity.BuiltFormStructureFieldForOneFieldset(
                        options,
                        "champs_systemes"
                    ), 
            nb_elements_per_colonne : 5
          }
  }
}

export class personneInfo{
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe : string;
  adresse : adresseJson;

  public static generateFormStructureField(options: {jsonOfForm?, data?}){
    return {
      legend : 'Informations personnelles', 
      fields :  Entity.BuiltFormStructureFieldForOneFieldset(
                    options, "info_personne","personneInfo"
                ).concat(adresseJson.generateFormStructureField(options)),
      nb_elements_per_colonne : 3
    }
  }
}



