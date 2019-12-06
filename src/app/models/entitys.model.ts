import {personneInfo, champsSysteme, Entity} from './entitys-util';
import {Field} from './field.model';
import {Validator} from './validator.model'
  
export class Enregistreur extends Entity{
    matricule : string;
    info_personne : personneInfo = new personneInfo;
    champs_systemes : champsSysteme = new champsSysteme;
    grade : string;
    
    save(values){  
    }

    generateFormStructureField(){
        let fields: Field<any>[] = [
            new Field({
                label:'Matricule',
                validator : new Validator(),
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
        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 2},
                this.info_personne.generateFormStructureField(),
                this.champs_systemes.generateFormStructureField()
            ];     
    }
}

export class Controlleur extends Entity{
    matricule : string;
    info_personne : personneInfo = new personneInfo;
    champs_systemes : champsSysteme = new champsSysteme;
    
    save(values){  
    } 

    generateFormStructureField(){
        let fields: Field<any>[] = [
            new Field({
                label:'Matricule',
                validator : new Validator(),
                name: 'matricule',
                type : {
                    type: 'text',
                    id: 'matricule',
                    show : ''
                },
                value: ''
            })
        ]
        return [
                {legend : '', fields : fields, nb_elements_per_colonne : 1},
                this.info_personne.generateFormStructureField(),
                this.champs_systemes.generateFormStructureField()
        ];
          
    }
}

class Vehicule extends Entity{
    immatriculation : string;
    champs_systemes : champsSysteme;
    ID_modele : string;
    
    save(values){
    }
}

class Piece extends Entity{
    ID_vehicule : string;
    ID_provenance : string;
    ID_type : string;
    champs_systemes : champsSysteme;
    date_delivrance : Date;
    date_expiration : Date;
    
    save(values){
    }
}

export const rootableEntitys : {
    entity? : Entity,
    root? : string
}[] = [
    {
        entity : new Enregistreur(),
        root : '/enregistreur'
    }
]