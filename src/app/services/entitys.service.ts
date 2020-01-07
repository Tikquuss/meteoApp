import { Injectable }   from '@angular/core';

import { Entity } from '../models/entitys-util';
import { Utils } from '../models/entitys.model';
import { JsonPipe } from '@angular/common';

//import { appRoutes } from '../app.module';

/**
 * Service de gestion du CRUD
 * @class
 * @classdesc Ce service est le seul capable de communiquer avec 
 * le serveur (de base) de données
*/
@Injectable()
export class EntitysService {

    /**
     * @namespace
     * @property {object}  defaults              - The default values for entitysList
    */
    entitysList : Map<String, Entity>;

    constructor(private utils : Utils) {
      this.entitysList = utils.entitysList;
    }

    /**
    * Retourne la liste de toutes les entités de la base de données
    * @param {} 
    * @returns {Map<String, Entity>} [entitysList]
    */
    getEntitysList():Map<String, Entity>{
        return this.entitysList;
    }

    /** 
    * Teste si une entirée nommée entityClass existe
    * @param {String} [entityClass] 
    * @returns { boolean }
    */ 
    isClass(entityClass):boolean{
      if(this.entitysList.get(entityClass)){
        return true;
      }
      return false;
    }

    /** 
    * Rétourne un objet de type 
    * @param {String} [entityClass] 
    * @returns { boolean }
    */ 
    getClassByName(entityClass_Name:String):Entity{
      return this.utils.getClassByName(entityClass_Name);
    }

    /** 
    * Create or Update
    * @param {Object, String, String} 
    * @returns {}
    */ 
    saveORmodify(values:Object, entityClassName:String, type:String){
      if(type == 'modification'){
        this.updateEntity(entityClassName, values);
      }else{
        this.createEntity(entityClassName, values)
      }
    }

  /**********************************************************/
  /**  
   * METHODES DEPENDANTES DU BACKEND/SERVEUR/BD 
   * @todo COMPLETER
  */ 
  /**********************************************************/

    /** 
    * @todo Recuperer les valeurs de la BD, les stringyfier (JSON) comme suit
    * @example pour entityClassName = "Type_piece",   
    *         `[{
                "libelle":"IDENTITE",
                "renouvelable": "Non"
                },
                {
                  "libelle":"PERMI",
                  "renouvelable": "Oui"
                },
                ...
                ]`
    * @description Retourne tout les (ou limits) les enregistrements d'un 
    *              table de la BD donnée
    * @param {String, number} [entityClassName, limits] 
    * @returns {string}
    */ 
    getEntitysDataByClass(entityClassName :String, limits?: number):string{
      switch(entityClassName){
        case 'Enregistreur' :
          return `[{
            "matricule":"Foko Henri",
            "username": "henrifoko",
            "email": "henrifoko@gmail.com"},
            {
            "matricule":"Farel Kengne",
            "username": "farelKN",
            "email": "farelkengne@email.com"
            }]`;
        case 'Controlleur' :
          return `[{
            "matricule":"Foko Henri",
            "username": "henrifoko",
            "email": "henrifoko@gmail.com"},
            {
            "matricule":"Farel Kengne",
            "username": "farelKN",
            "email": "farelkengne@email.com"
            }]`;
          case 'Controle_inv' : 
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
          case 'Localisation' :
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
          case 'Vehicule' :
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
          case 'Modele' :
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
          case 'Piece' :
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
          case 'Type_piece' :
            return `[{
              "libelle":"IDENTITE",
              "renouvelable": "Non"
              },
              {
                "libelle":"PERMI",
                "renouvelable": "Oui"
              }]`
          case 'Piece_invalidées' :
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
          case 'Organisme' :
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
          case 'Type_organisme' :
            return `[{
              "matricule":"Foko Henri",
              "username": "henrifoko",
              "email": "henrifoko@gmail.com"},
              {
              "matricule":"Farel Kengne",
              "username": "farelKN",
              "email": "farelkengne@email.com"
              }]`;
      } 
    }

    /**
    * @todo Recuperer de la BD les json pour formulaires, les stringyfier (JSON) comme suit
    * @example voir la structure du json rétouné
    * @description Retourne tout les (ou limits) les enregistrements d'un 
    *              table de la BD donnée
     * @description récuperer le json pour construire le formulaire de entityClass_Name
     * @param entityClassName 
     */
    getJsonOfForm(entityClassName){
      let json /*: {
        own_information? : [],
        info_personne?:[],
        champs_systemes?:[]
      }*/={};
      ////////////////////////////
      /** Structure générale **/
      let own_information_ : Array<{
        label:String,
        validator? : {
          required?: boolean,
          pattern? : string,
          max_length? : number,
          min_length? : number,
          max_value? : number,
          min_value? : number,
        },
        name: String,
        type : {
          type: String, // text, number, date, 
          id: String,
          show : boolean
        },
        value?: any,
        meta_data? : {
          type : String, // radio, set, dropdown_list, text-area
          data : Array<any>,
          checked? : any
        }
      }>;
      /////////////////////
      let adresseJson = [
        {
          label:'TELEPHONE MOBILE',
          validator : {required : true},
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
        }, 
        {
          label:'TELEPHONE FIXE',
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
        }, 
        {
          label:'ICE',
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
        }, 
        {
          label:'email',
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
        },  
        {
          label:'Boite Postale',
          name: 'BP',
          type : {
              type: 'text',
              id: 'BP',
              show : ''
          },
          value: ''
        }
      ]
      /////////////////////
      let info_personne = {
        "personneInfo":[
          {
            label:'Nom',
            validator : {required:true},
            name: 'nom',
            type : {
                type: 'text',
                id: 'nom',
                show : true
            }
          },
          {
              label:'Prenom',
              validator : {required:true},
              name: 'prenom',
              type : {
                  type: 'text',
                  id: 'prenom',
                  show : ''
              }
          },
          {
            label:'Date de naissance',
            validator : {required:true},
            name: 'date_naissance',
            type : {
                type: 'date',
                id: 'date_naissance',
                show : ''
            }
          },
          {
            label:'Sexe',
            validator : {required:true},
            name: 'sexe',
            type : {
                type: 'radio',
                id: 'sexe',
                show : ''
            },
            value: 'M',
            meta_data : {
              type : 'radio',
              data : ['M', 'F'],
              checked : 'M'
            }
          }
        ],
        "adresseJson" : adresseJson
      }
      ///////////////////
      let champs_systemes = [
        {
          label:'Code créateur',
          name: 'code_createur',
          type : {
              type: 'text',
              id: 'code_createur',
              show : ''
          },
          value: ''
        },
        {
            label:'Code modificateur',
            name: 'code_modificateur',
            type : {
                type: 'text',
                id: 'code_modificateur',
                show : ''
            },
            value: ''
        },
        {
          label:'Statut vie',
          name: 'statut_vie',
          type : {
              type: 'text',
              id: 'statut_vie',
              show : ''
          },
          value: '',
          meta_data : {
            type : 'dropdown_list',
            data : ['actif', 'cloturée'],
            checked : 'actif',
          }
        },
        {
          label:'Date de creation',
          name: 'date_creation',
          type : {
              type: 'date',
              id: 'date_creation',
              show : ''
          },
          value: ''
        },
        {
          label:'Date de dernier modification',
          name: 'dernier_modification',
          type : {
              type: 'date',
              id: 'dernier_modification',
              show : ''
          },
          value: ''
        }
      ]

      //////////////////// 
      let contact_json = [
        {
          label:'TELEPHONE MOBILE',
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
        }, 
        {
          label:'TELEPHONE FIXE',
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
        }, 
        {
          label:'email',
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
        },
        {
          label:'Localisation',
          name: 'localisation',
          type : {
            type: 'text',
            id: 'localisation',
            show : ''
          },
          value: ''
        }
      ]
      
      switch(entityClassName){
        case 'Enregistreur' :
          return {
            "own_information":[
              {
                label:'Matricule',
                validator : {required : true},
                name: 'matricule',
                type : {
                    type: 'text',
                    id: 'matricule',
                    show : true
                },
                value: ''
              },
              {
                  label:'Grade',
                  name: 'grade',
                  type : {
                      type: 'number',
                      id: 'grade',
                      show : true
                  },
                  value: '3'
              }
            ],
            "info_personne" :info_personne,
            "champs_systemes" :champs_systemes
          }
        case 'Controlleur' :
          return {
            "own_information":[
              {
                label:'Matricule',
                validator : {required : true},
                name: 'matricule',
                type : {
                    type: 'text',
                    id: 'matricule',
                    show : true
                },
                value: ''
              }
            ],
            "info_personne" :info_personne,
            "champs_systemes" :champs_systemes
          }
        case 'Controle_inv' : 
          return {
            "own_information":[
              {
                label:'Identifiant du controlleur',
                validator : {required:true},
                name: 'id_controlleur',
                type : {
                    type: 'text',
                    id: 'id_controlleur',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'dropdown_list',
                    data : [], //Etraire de la base de données
                    checked : 0
                }
              },
              {
                  label:'Identifiant du véhicule',
                  validator : {required:true},
                  name: 'id_vehicule',
                  type : {
                      type: 'text',
                      id: 'id_vehicule',
                      show : ''
                  },
                  value: '',
                  meta_data : {
                      type : 'dropdown_list',
                      data : [], //Etraire de la base de données
                      checked : 0
                  }
              },
              {
                  label:'date',
                  name: 'date',
                  type : {
                      type: 'Date',
                      id: 'immatriculation',
                      show : ''
                  }
              },
              {
                  label:'Idtifiant localisation',
                  validator : {required:true},
                  name: 'id_localisation',
                  type : {
                      type: 'text',
                      id: 'id_localisation',
                      show : ''
                  },
                  value: '',
                  meta_data : {
                      type : 'dropdown_list',
                      data : [], //Etraire de la base de données
                      checked : 0
                  }
              }
            ],
            "champs_systemes" :champs_systemes
          }
        case 'Localisation' :
          return {
            "own_information":[
              {
                label:'GPS',
                name: 'gps',
                type : {
                    type: 'text',
                    id: 'gps',
                    show : ''
                },
                value: ''
              },
              {
                  label:'poste',
                  name: 'poste',
                  type : {
                      type: 'text',
                      id: 'poste',
                      show : ''
                  },
                  value: '',
              },
              {
                label:'Libelle',
                name: 'libelle',
                type : {
                    type: 'text',
                    id: 'libelle',
                    show : ''
                }
              }
            ]
          }
        case 'Vehicule':
          return {
            "own_information":[
              {
                label:'Immatriculation',
                validator : {required:true},
                name: 'immatriculation',
                type : {
                    type: 'text',
                    id: 'immatriculation',
                    show : ''
                }
              },
              {
                  label:'ID_modele',
                  validator : {required:true},
                  name: 'id_modele',
                  type : {
                      type: 'text',
                      id: 'id_modelen',
                      show : ''
                  },
                  meta_data : {
                      type : 'dropdown_list',
                      data : [], //Etraire de la base de données
                      checked : 0
                  }
              }
            ],
            "champs_systemes" :champs_systemes
          }
        case 'Modele' :
          return {
            "own_information":[
              {
                label:'Marque',
                validator : {required:true},
                name: 'marque',
                type : {
                    type: 'text',
                    id: 'marque',
                    show : ''
                },
                value: ''
              },
              {
                  label:'Description',
                  name: 'description',
                  type : {
                      type: 'textarea',
                      id: 'description',
                      show : ''
                  },
                  value: '',
                  meta_data : {
                      type : 'textarea',
                      data : [] //css du textarea (hauteur, largeur)
                  }
              },
              {
                  label:'Categorie',
                  name: 'categorie',
                  type : {
                      type: 'text',
                      id: 'categorie',
                      show : ''
                  },
                  value: '',
              }
            ],
            "champs_systemes" :champs_systemes
          };
        case 'Piece' :
          return {
            "own_information":[
              {
                label:'Identifiant du véhicule',
                validator : {required:true},
                name: 'id_vehicule',
                type : {
                    type: 'text',
                    id: 'id_vehicule',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'dropdown_list',
                    data : [] //Etraire les infos des véhicules de la base de données
                }
              },
              {
                  label:'Identifiant de la provenance',
                  name: 'id_provenance',
                  type : {
                      type: 'text',
                      id: 'id_provenance',
                      show : ''
                  },
                  value: ''
              },
              {
                  label:'Identifiant du type',
                  name: 'id_type',
                  type : {
                      type: 'text',
                      id: 'id_type',
                      show : ''
                  },
                  value: '',
                  meta_data : {
                      type : 'dropdown_list',
                      data : [] //Etraire les infos des Types de la base de données
                  }
              },
              {
                  label:' Date de delivrance',
                  name: 'date_delivrance',
                  type : {
                      type: 'Date',
                      id: 'date_delivrance',
                      show : ''
                  },
                  value: ''
              },
              {
                  label:"Date d'expiration",
                  name: 'date_expiration',
                  type : {
                      type: 'Date',
                      id: 'date_expiration',
                      show : ''
                  },
                  value: '',
              }
            ],
            "champs_systemes" :champs_systemes
          };
        case 'Type_piece' :
          return {
            "own_information":[
              {
                label:'Libelle',
                validator : {required: true},
                name: 'libelle',
                type : {
                  type: 'text',
                  id: 'libelle',
                  show : true
                }
              },
              {
                label:'Rénouvelable ?',
                validator : {required: true},
                name: 'renouvelable',
                type : {
                  type: 'radio',
                  id: 'renouvelable',
                  show : false
                },
                value: 'Oui',
                meta_data : {
                  type : 'radio',
                  data : ['Oui', 'Non'],
                  checked : 'Oui'
                }
              }
            ]
          };
        case 'Piece_invalidées' :
          return {
            "own_information":[
              {
                label:'Identifiant du controlleur',
                validator : {required:true},
                name: 'id_controlleur',
                type : {
                    type: 'text',
                    id: 'id_controlleur',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'dropdown_list',
                    data : [] //Etraire de la base de données
                }
              }
            ],
            "champs_systemes" :champs_systemes
          };
        case 'Organisme' :
          return {
            "own_information":[
              {
                label:'Nom',
                validator : {required : true},
                name: 'nom',
                type : {
                    type: 'text',
                    id: 'nom',
                    show : ''
                },
                value: ''
              },
              {
                  label:'Identifiant du type',
                  validator : {required : true},
                  name: 'id_type',
                  type : {
                      type: 'text',
                      id: 'id_type',
                      show : ''
                  },
                  value: ''
              }
            ],
            "champs_systemes" :champs_systemes,
            "contact_json" : contact_json
          };
        case 'Type_organisme' :
          return {
            "own_information":[
              {
                label:'Libelle',
                validator : {required : true},
                name: 'libelle',
                type : {
                    type: 'text',
                    id: 'libelle',
                    show : ''
                },
                value: ''
              }
            ],
            "champs_systemes" :champs_systemes
          };
        default:
          return {}
      }
    }

    /**
     * @description CREATE
     * @param entityClass_Name 
     * @param values 
     */
    createEntity(entityClass_Name, values){
    }

    /**
     * @description READ
     * @deprecated doit être supprimée
     * @param entityClass_Name 
     * @param values 
     */
    readEntity(entityClass_Name, values){
    }

    /**
     * @description DELETE
     * @param entityClass_Name 
     * @param values 
     */
    updateEntity(entityClass_Name, values){
    }

    /**
     * @description UPDATE
     * @param entityClass_Name 
     * @param values 
     */
    deleteEntity(entityClass_Name, values){
    }
}