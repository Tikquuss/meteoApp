import {personneInfo, champsSysteme, Entity, contactJson} from './entitys-util';
import {Field} from './field.model';
import {Validator} from './validator.model'
import { Injectable }   from '@angular/core';

@Injectable()
export class Utils{
    
    entitysList = [
        {
          entityLabel : 'Enregistreur',
          routerLink : "Enregistreur"
        },
        {
          entityLabel : 'Controlleur',
          routerLink : 'Controlleur',
        },
        {
          entityLabel : 'Controle_inv',
          routerLink : 'Controle_inv',
        },
        {
          entityLabel : 'Localisation',
          routerLink : 'Localisation',
        },
        {
          entityLabel : 'Vehicule',
          routerLink : 'Vehicule',
        },
        {
          entityLabel : 'Modele',
          routerLink : 'Modele',
        },
        {
          entityLabel : 'Piece',
          routerLink : 'Piece',
        },
        {
          entityLabel : 'Type_piece',
          routerLink : 'Type_piece',
        },
        {
          entityLabel : 'Piece_invalidées',
          routerLink : 'Piece_invalidées',
        },
        {
          entityLabel : 'Organisme',
          routerLink : 'Organisme',
        },
        {
          entityLabel : 'Type_organisme',
          routerLink : 'Type_organisme',
        }
    ];
    
    getClassByName(entityClass_Name){
        switch(entityClass_Name){
            case 'Enregistreur' :
                return new Enregistreur();
            case 'Controlleur' :
                return new Controlleur();
            case 'Controle_inv' : 
                return new Controle_inv();
            case 'Localisation' :
                return new Localisation();
            case 'Vehicule' :
                return new Vehicule();
            case 'Modele' :
                return new Modele();
            case 'Piece' :
                return new Piece();
            case 'Type_piece' :
                return new Type_piece();
            case 'Piece_invalidées' :
                return new Piece_invalidées();
            case 'Organisme' :
                return new Organisme();
            case 'Type_organisme' :
                return new Type_organisme();
        }
    }
}
  
export class Enregistreur extends Entity{
    matricule : string;
    info_personne : personneInfo = new personneInfo;
    champs_systemes : champsSysteme = new champsSysteme;
    grade : string;
    
    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Matricule',
                validator : new Validator({required : true}),
                name: 'matricule',
                type : {
                    type: 'text',
                    id: 'matricule',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:'Grade',
                validator : new Validator(),
                name: 'grade',
                type : {
                    type: 'number',
                    id: 'grade',
                    show : ''
                },
                value: '3'
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 2},
                this.info_personne.generateFormStructureField(data),
                this.champs_systemes.generateFormStructureField(data)
            ];     
    }
}

export class Controlleur extends Entity{
    matricule : string;
    info_personne : personneInfo = new personneInfo;
    champs_systemes : champsSysteme = new champsSysteme;
    
    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Matricule',
                validator : new Validator({required : true}),
                name: 'matricule',
                type : {
                    type: 'text',
                    id: 'matricule',
                    show : ''
                },
                value: ''
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 1},
                this.info_personne.generateFormStructureField(data),
                this.champs_systemes.generateFormStructureField(data)
        ];  
    }
}

class Controle_inv extends Entity{
    ID_controlleur : string;
    ID_vehicule : string;
    date : Date;
    champs_systemes : champsSysteme = new champsSysteme;
    ID_localisation : string;
    
    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Identifiant du controlleur',
                validator : new Validator(),
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
            }),
            new Field({
                label:'Identifiant du véhicule',
                validator : new Validator(),
                name: 'id_vehicule',
                type : {
                    type: 'text',
                    id: 'id_vehicule',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'dropdown_list',
                    data : [] //Etraire de la base de données
                }
            }),
            new Field({
                label:'date',
                validator : new Validator(),
                name: 'date',
                type : {
                    type: 'Date',
                    id: 'immatriculation',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'dropdown_list',
                    data : [] //Etraire de la base de données
                }
            }),
            new Field({
                label:'Idtifiant localisation',
                validator : new Validator(),
                name: 'id_localisation',
                type : {
                    type: 'text',
                    id: 'id_localisation',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'dropdown_list',
                    data : [] //Etraire de la base de données
                }
            })
        ]
        
        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 2},
                this.champs_systemes.generateFormStructureField(data)
        ];  
    }
}

class Localisation extends Entity{
    GPS : string; //todo : génerer un json
    poste : string;
    libelle : string;

    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'GPS',
                validator : new Validator(),
                name: 'gps',
                type : {
                    type: 'text',
                    id: 'gps',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:'poste',
                validator : new Validator(),
                name: 'poste',
                type : {
                    type: 'text',
                    id: 'poste',
                    show : ''
                },
                value: '',
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [{legend : '', fields : fields, nb_elements_per_colonne : 2}];  
    }
}

class Vehicule extends Entity{
    immatriculation : string;
    champs_systemes : champsSysteme = new champsSysteme;
    ID_modele : string;

    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Immatriculation',
                validator : new Validator(),
                name: 'immatriculation',
                type : {
                    type: 'text',
                    id: 'immatriculation',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:'ID_modele',
                validator : new Validator(),
                name: 'immatriculation',
                type : {
                    type: 'text',
                    id: 'immatriculation',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'dropdown_list',
                    data : [] //Etraire de la base de données
                }
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 2},
                this.champs_systemes.generateFormStructureField(data)
        ];  
    }
}

class Modele extends Entity{
    marque : string;
    description : string;
    categorie : string;
    champs_systemes : champsSysteme = new champsSysteme;

    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Marque',
                validator : new Validator(),
                name: 'marque',
                type : {
                    type: 'text',
                    id: 'marque',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:'Description',
                validator : new Validator(),
                name: 'description',
                type : {
                    type: 'textarea',
                    id: 'description',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'textarea',
                    data : [] //css du textarea
                }
            }),
            new Field({
                label:'Categorie',
                validator : new Validator(),
                name: 'categorie',
                type : {
                    type: 'text',
                    id: 'categorie',
                    show : ''
                },
                value: '',
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 3},
                this.champs_systemes.generateFormStructureField(data)
        ];  
    }
}

class Piece extends Entity{
    ID_vehicule : string;
    ID_provenance : string;
    ID_type : string;
    champs_systemes : champsSysteme = new champsSysteme;
    date_delivrance : Date;
    date_expiration : Date;
    
    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Identifiant du véhicule',
                validator : new Validator(),
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
            }),
            new Field({
                label:'Identifiant de la provenance',
                validator : new Validator(),
                name: 'id_provenance',
                type : {
                    type: 'text',
                    id: 'id_provenance',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:'Identifiant du type',
                validator : new Validator(),
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
            }),
            new Field({
                label:' Date de delivrance',
                validator : new Validator(),
                name: 'date_delivrance',
                type : {
                    type: 'Date',
                    id: 'date_delivrance',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:"Date d'expiration",
                validator : new Validator(),
                name: 'date_expiration',
                type : {
                    type: 'Date',
                    id: 'date_expiration',
                    show : ''
                },
                value: '',
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 2},
                this.champs_systemes.generateFormStructureField(data)
        ];  
    }
}

class Type_piece extends Entity{
    libelle : string;
    est_renouvelable : boolean;

    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Libelle',
                validator : new Validator(),
                name: 'libelle',
                type : {
                    type: 'text',
                    id: 'libelle',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:'Rénouvelable ?',
                validator : new Validator(),
                name: 'est_renouvelable',
                type : {
                    type: 'radio',
                    id: 'est_renouvelable',
                    show : ''
                },
                value: '',
                meta_data : {
                    type : 'radio-button',
                    data : ['Oui', 'Non']
                }
            })
        ]
        
        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }
        
        return [{legend : '', fields : fields, nb_elements_per_colonne : 2}];  
    }
}

class Piece_invalidées extends Entity{
    ID_controlleur : string;
    champs_systemes : champsSysteme = new champsSysteme;
    
    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Identifiant du controlleur',
                validator : new Validator(),
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
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 1},
                this.champs_systemes.generateFormStructureField(data)
        ];  
    }
}

class Organisme extends Entity{
    nom : string;
    ID_type : string;
    champs_systemes : champsSysteme = new champsSysteme;
    contact_json : contactJson = new contactJson;
    
    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Nom',
                validator : new Validator({required : true}),
                name: 'nom',
                type : {
                    type: 'text',
                    id: 'nom',
                    show : ''
                },
                value: ''
            }),
            new Field({
                label:'ID_type',
                validator : new Validator({required : true}),
                name: 'id_type',
                type : {
                    type: 'text',
                    id: 'id_type',
                    show : ''
                },
                value: ''
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 2},
                this.champs_systemes.generateFormStructureField(data),
                {legend : 'Contacts', fields : this.contact_json.generateFormStructureField(data)}
        ];  
    }
}

class Type_organisme extends Entity{
    libelle : string;
    champs_systemes : champsSysteme = new champsSysteme;
    
    generateFormStructureField(data?){
        let fields : Field<any>[] = [
            new Field({
                label:'Libelle',
                validator : new Validator({required : true}),
                name: 'libelle',
                type : {
                    type: 'text',
                    id: 'libelle',
                    show : ''
                },
                value: ''
            })
        ]

        if(data){
            for(let field of fields){
              field.value = data[field.name]
            }
        }

        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 1},
                this.champs_systemes.generateFormStructureField(data)
        ];  
    }
}
