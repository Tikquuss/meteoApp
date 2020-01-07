import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModificationService {
    constructor() {}

    /**
     * Fonction appelée lors de la modification d'un élément du tableau.
     * @param(elt: object) Élément sélectionné par l'utilisateur
     * @returns(promesse: Promise) Élément retourné par la fontion après modification
     */
    static editer(elt: object): Promise<object> {
        // NB: Lors de la modification, l'attribut 'id' ne doit pas être modifié
        // ...
        // Ces 2 dernières lignes devront être corrigées après implémentation du
        // code de le fontion, elles ne servent que pour le test
        //alert('modification');
        return new Promise ((resole, reject) => {
            resole(elt);
        });
    }

    /**
     * Fonction appelée lors de l'ajout d'un élément dans le tableau
     * @returns(promesse: Promise) Nouvel objet à ajouter au tableau
     */
    static ajout(): Promise<object> {
        // NB: Lors de l'ajout d'un élément dans le tableau, il faudra prendre
        // soins d'éviter que des redondances d'id. Si il n'y a pas de colonne
        // id dans le tableau, renvoyer un simple objet sans id, ce dernier
        // sera calculé en fonction des éléments présents dans le tableau
        // ...
        // Ces 2 dernières lignes devront être corrigées après implémentation du
        // code de le fontion, ellent ne servent que pour le test
        alert('ajout');
        return new  Promise ((resolve, reject) => {
            resolve({
                name: 'Henri Foko',
                username: 'henrifoko',
                email: 'henrifoko@gmail.com'});
            });
    }
}
