import { Component, OnInit } from '@angular/core';
import { BdlocaleService } from 'src/app/services/bdlocale.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { Ville } from 'src/app/models/ville';

/**
    * component de test de fonctionnement du service de la BD
    * Pour utiliser dans l'application, il suffit de le renommer pour qu'il ait un nom decent
    * ou alors de copier ses méthodes pour les mettre dans un composant existant
    * @class TestbdComponent
  */
@Component({
  selector: 'app-testbd',
  template: ''
})
export class TestbdComponent implements OnInit {
  private _bdService: BdlocaleService;

  //userCourant est l'utilisateur courant de l'application.
  private _userCourant: Utilisateur;

  constructor(private bdService: BdlocaleService) { 
    this._bdService = bdService;
  }

  public getUserCourant(): Utilisateur{
    return this._userCourant;
  }

  public setUserCourant(userCourant: Utilisateur){
    this._userCourant = userCourant;
  }

  /**
   * permet de vérifier l'authentification de l'utilisateur
   * @param nom nom de l'utilisateur
   * @param mdp mot de passe 
   * @returns {Boolean}
   */
  async assignUser(nom: string, mdp:string): Promise<Boolean>{
    let user = await this._bdService.verify(nom, mdp);
    this._userCourant = user;
    return new Promise<Boolean>((resolve, reject) => {
      if (this._userCourant == null){
        resolve(false);
      }
      else{
        resolve(true);
      }
    });
  }

  /**
   * permet de recuperer la derniere ville recherchée par l'utilisateur
   * @param nom : nom de l'utilisateur
   */
  async getVilleUser(nom: string){
    let vi = this._bdService.getVilleByNom(nom);
    vi.then((ville)=>{
      return ville;
    });

  }

  /**
   * cette méthode permet de mettre a jour un utilisateur.
   * Elle est a utiliser lorsque l'utilisateur veut changer ses caractéristiques
   * ou alors lorsqu'il change sa ville de préférence
   * Il faut modifier ses caractéristiques avant de le passer en parametre
   * (passer userCourant en parametre pour modifier l'utilisateur courant) 
   * @param {Utilisateur} user - utilisateur déjà mis à jour (nom, prenom... ou meme sa derniere ville cherchee)
   */
  async updateUser(user: Utilisateur){
    this._bdService.setUser(user);
  }

  async ngOnInit() {
    this._bdService.initValues();
  }
}
