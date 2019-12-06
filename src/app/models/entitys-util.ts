import {Field} from './field.model';
import {Validator, ValidatorEmail} from './validator.model';

export class adresseJson{  
  TEL_MOBILE : [];
  TEL_FIXE : [];
  ICE : [];
  email : [];
  BP : string;

  constructor(options: {
    TEL_MOBILE? : [],
    TEL_FIXE? : [],
    ICE? : [],
    email? : [],
    BP? : string
  }={}) {
    this.TEL_MOBILE  = options.TEL_MOBILE || [];
    this.TEL_FIXE = options.TEL_FIXE || [];
    this.ICE = options.ICE || [];
    this.email = options.email || [];
    this.BP = options.BP || '';
  }

  generateFormStructureField(){
    let fields: Field<any>[] = [
      new Field({
        label:'TELEPHONE MOBILE',
        validator : new Validator(),
        name: 'TEL_MOBILE',
        type : {
            type: 'text',
            id: 'TEL_MOBILE',
            show : ''
        },
        value: '',
        meta_data : {
          type : 'set'
        }
      }), 
      new Field({
        label:'TELEPHONE FIXE',
        validator : new Validator(),
        name: 'TEL_FIXE',
        type : {
            type: 'text',
            id: 'TEL_FIXE',
            show : ''
        },
        value: '',
        meta_data : {
          type : 'set'
        }
      }), 
      new Field({
        label:'ICE',
        validator : new Validator(),
        name: 'ICE',
        type : {
            type: 'text',
            id: 'ICE',
            show : ''
        },
        value: '',
        meta_data : {
          type : 'set'
        }
      }), 
      new Field({
        label:'email',
        validator : new ValidatorEmail(),
        name: 'email',
        type : {
            type: 'email',
            id: 'email',
            show : ''
        },
        value: '',
        meta_data : {
          type : 'set'
        }
      }),  
      new Field({
            label:'Boite Postale',
            validator : new Validator(),
            name: 'BP',
            type : {
                type: 'text',
                id: 'BP',
                show : ''
            },
            value: ''
        })
      ]
      return fields;
  }
}

export class contactJson{  
  TEL_MOBILE : [];
  TEL_FIXE : [];
  email : [];
  localisation : string;
  
  constructor(options: {
    TEL_MOBILE? : [],
    TEL_FIXE? : [],
    email? : [],
    localisation? : string
  }={}) {
    this.TEL_MOBILE  = options.TEL_MOBILE || [];
    this.TEL_FIXE = options.TEL_FIXE || [];
    this.email = options.email || [];
    this.localisation = options.localisation || '';
  }

  generateFormStructureField(){
    let fields: Field<any>[] = [
      new Field({
        label:'TELEPHONE MOBILE',
        validator : new Validator(),
        name: 'TEL_MOBILE',
        type : {
            type: 'text',
            id: 'TEL_MOBILE',
            show : ''
        },
        value: '',
        meta_data : {
          type : 'set'
        }
      }), 
      new Field({
        label:'TELEPHONE FIXE',
        validator : new Validator(),
        name: 'TEL_FIXE',
        type : {
            type: 'text',
            id: 'TEL_FIXE',
            show : ''
        },
        value: '',
        meta_data : {
          type : 'set'
        }
      }), 
      new Field({
        label:'email',
        validator : new ValidatorEmail(),
        name: 'email',
        type : {
            type: 'email',
            id: 'email',
            show : ''
        },
        value: '',
        meta_data : {
          type : 'set'
        }
      }),
      new Field({
          label:'Localisation',
          validator : new Validator(),
          name: 'localisation',
          type : {
              type: 'text',
              id: 'localisation',
              show : ''
            },
            value: ''
        })
      ]
      return fields;
  }
}

export class champsSysteme{
  code_createur : string;
  code_modificateur : string;
  statut_vie : string;
  date_creation : Date;
  date_dernier_modification  : Date;

  constructor(options: {
    code_createur?: string,
    code_modificateur? : string,
    statut_vie? : string,
    date_creation? : Date,
    date_dernier_modification? : Date
  } = {}) {
    this.code_createur  = options.code_createur || '';
    this.code_modificateur = options.code_modificateur || '';
    this.statut_vie = options.statut_vie || '';
    this.date_creation = options.date_creation || new Date();
    this.date_dernier_modification = options.date_dernier_modification || new Date();
  }

  generateFormStructureField(){
    let fields: Field<any>[] = [
        new Field({
            label:'Code créateur',
            validator : new Validator(),
            name: 'code_createur',
            type : {
                type: 'text',
                id: 'code_createur',
                show : ''
            },
            value: ''
        }),
        new Field({
            label:'Code modificateur',
            validator : new Validator(),
            name: 'code_modificateur',
            type : {
                type: 'text',
                id: 'code_modificateur',
                show : ''
            },
            value: ''
        }),
        new Field({
          label:'Statut vie',
          validator : new Validator(),
          name: 'statut_vie',
          type : {
              type: 'text',
              id: 'statut_vie',
              show : ''
          },
          value: '',
          meta_data : {
            type : 'dropdown_list',
            data : ['actif', 'cloturée']
          }
        }),
        new Field({
          label:'Date de creation',
          validator : new Validator(),
          name: 'date_creation',
          type : {
              type: 'date',
              id: 'date_creation',
              show : ''
          },
          value: ''
        }),
        new Field({
          label:'Date de dernier modification',
          validator : new Validator(),
          name: 'dernier_modification',
          type : {
              type: 'date',
              id: 'dernier_modification',
              show : ''
          },
          value: ''
        })
      ]
      return {legend : 'Champs systemes', fields, nb_elements_per_colonne : 5}
  }
}

export class personneInfo{
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe : string;
  adresse : adresseJson;
    
  constructor(options: {
    nom?: string,
    prenom? : string,
    dateNaissance? : Date;
    sexe? : string,
    adresse? : adresseJson
    } = {}) {
        this.nom  = options.nom || '';
        this. prenom = options.prenom || '';
        this.dateNaissance = options.dateNaissance || new Date();
        this.sexe  = options.sexe || '';
        this.adresse = options.adresse || new adresseJson();
    }

    generateFormStructureField(){
      let fields: Field<any>[] = [
          new Field({
              label:'Nom',
              validator : new Validator(),
              name: 'nom',
              type : {
                  type: 'text',
                  id: 'nom',
                  show : ''
              },
              value: ''
          }),
          new Field({
              label:'Prenom',
              validator : new Validator(),
              name: 'prenom',
              type : {
                  type: 'text',
                  id: 'prenom',
                  show : ''
              },
              value: ''
          }),
          new Field({
            label:'Date de naissance',
            validator : new Validator(),
            name: 'date_naissance',
            type : {
                type: 'date',
                id: 'date_naissance',
                show : ''
            },
            value: ''
          }),
          new Field({
            label:'Sexe',
            validator : new Validator(),
            name: 'sexe',
            type : {
                type: 'radio',
                id: 'sexe',
                show : ''
            },
            value: '',
            meta_data : {
              type : 'radio-button',
              data : ['M', 'F']
            }
          })
        ]

        return {
          legend : 'Informations personnelles', 
          fields : fields.concat(this.adresse.generateFormStructureField()),
          nb_elements_per_colonne : 3
        }
  }
}

export class FormStructure{
  entity : Entity;
  type : string; // enregistrement / modification
  fields : {
    legend? : string,
    fields? : Field<any>[],
    nb_elements_per_colonne? : number
  }[] = [];

  constructor(entity ,type){
    this.entity = entity;
    this.type = type;
    this.fields = this.entity.generateFormStructureField();
  }
}

export class Entity{
  constructor(){}
  //sauvegarder l'entité en base de données
  save(values){}
  // Contruire la structure du formulaire et rétourner, enregistrement par défaut
  generateFormStructureField(){
    return [];
  }
}

