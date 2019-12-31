if (!window.indexedDB) {
    alert("IndexedDB n'est pas supporté !");
}

var db;
var request = window.indexedDB.open("meteo", 1);

request.onerror = function(event) {
    alert("Une erreur a été soulevé " + this.error);
};

request.onupgradeneeded = function(event) {
    db = this.result;

    //creation de utilisateur
    var store = db.createObjectStore("utilisateur", {keyPath: "id", autoincrement: true});
    store.createIndex('nom', 'nom', {unique: false});
    store.createIndex('prenom', 'prenom', {unique: false});
    store.createIndex('dateNaissance', 'dateNaissance', {unique: false});
    store.createIndex('sexe', 'sexe', {unique: false});
    store.createIndex('photo', 'photo', {unique: false});
    store.createIndex('ville', 'ville', {unique: false});
    
    //creation de ville
    store = db.createObjectStore("ville", {keyPath: "id", autoincrement: true});
    store.createIndex('nom', 'nom', {unique: false});
    store.createIndex('posX', 'posX', {unique: false});
    store.createIndex('posY', 'posY', {unique: false});
    store.createIndex('region', 'region', {unique: false});
    store.createIndex('pays', 'pays', {unique: false});

};

request.onsuccess = function(event) {
    db = this.result;
};
