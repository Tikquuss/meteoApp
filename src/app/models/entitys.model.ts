import {personneInfo, champsSysteme, Entity, contactJson} from './entitys-util';
import { Injectable }   from '@angular/core';

@Injectable()
export class Utils{
    public entitysList = new Map<String, any>(
        [
            ['Enregistreur', new Enregistreur],
            ['Controlleur', new Controlleur],
            ['Controle_inv', new Controle_inv],
            ['Localisation', new Localisation],
            ['Vehicule', new Vehicule],
            ['Modele', new Modele],
            ['Piece', new Piece],
            ['Type_piece', new Type_piece],
            ['Piece_invalidées', new Piece_invalidées],
            ['Organisme', new Organisme],
            ['Type_organisme', new Type_organisme]
        ]
    );
    
    getClassByName(entityClassName){
        return this.entitysList.get(entityClassName);
    }
}

export class Enregistreur extends Entity{
    matricule : string;
    info_personne : personneInfo = new personneInfo;
    champs_systemes : champsSysteme = new champsSysteme;
    grade : string;
}

export class Controlleur extends Entity{
    matricule : string;
    info_personne : personneInfo = new personneInfo;
    champs_systemes : champsSysteme = new champsSysteme;
}

class Controle_inv extends Entity{
    ID_controlleur : string;
    ID_vehicule : string;
    date : Date;
    champs_systemes : champsSysteme = new champsSysteme;
    ID_localisation : string;
}

class Localisation extends Entity{
    GPS : string; //todo : génerer un json
    poste : string;
    libelle : string;
}

class Vehicule extends Entity{
    immatriculation : string;
    champs_systemes : champsSysteme = new champsSysteme;
    ID_modele : string;
}

class Modele extends Entity{
    marque : string;
    description : string;
    categorie : string;
    champs_systemes : champsSysteme = new champsSysteme;
}

class Piece extends Entity{
    ID_vehicule : string;
    ID_provenance : string;
    ID_type : string;
    champs_systemes : champsSysteme = new champsSysteme;
    date_delivrance : Date;
    date_expiration : Date;  
}

class Type_piece extends Entity{
    libelle : string;
    est_renouvelable : boolean;
    
}

class Piece_invalidées extends Entity{
    ID_controlleur : string;
    champs_systemes : champsSysteme = new champsSysteme;
}

class Organisme extends Entity{
    nom : string;
    ID_type : string;
    champs_systemes : champsSysteme = new champsSysteme;
    contact_json : contactJson = new contactJson;
}

class Type_organisme extends Entity{
    libelle : string;
    champs_systemes : champsSysteme = new champsSysteme;
}

