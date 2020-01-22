## NB : 
- l'application ne marche que si vous avez la connexion internet, car  la méteo est récupérée en ligne.  
Pour désactiver ce comportement en develloppement, commenter le bloc 40-43 au profit du bloc 46-48.  
- Connectez-vous avec {username="emma", password="emma"}  
- Ne modifier que les fichiers aux quels vous avez acces.  
- Ne creez plus les test dans le bon projet.  
- Délais : ce soir.  

# Taches pour terminer l'application

## 1) Mengong et Foko

### a) Au niveau du composant UserProfileComponent, prière de modifier la methode createForm() comme indiqué (j'ai mi le 'bon' code en commentaire) et le template en consequence pour que lors  de la visualisation/modification du profil utilisateur, les informations soient extraites de la  BD (c'est simple, fait 'LoginComponent.bdComponent.getUserCourant()' pour avoir l'utilisateur courant,  unpeu comme je l'ais fait dans createForm() pour la mettre les informations de  l'utilisateur courant dans le formulaire).

### b) J'ai modifié le formulaire du composant SignupComponent, pour mettre les vrais champs, et j'ai également modifié le template en ajoutant les champs (et c'est dévenu laid); sauf que pour des raisons  de perfection je préfere que tu gère bien les champs dateNaissance (Date), photo (file) et sexe(boutton radio)...  comme tu l'a fait pour UserProfileComponent, en groupant aussi en fieldset pour que ce soit soft et beau...

### c) Faire en sorte que le modal du template du composant ChangeLocationModalContentComponent se ferme lorsqu'on clique sur 'Enregistrer'. J'ai mi comme ecouteur de ce boutton une méthode onSave() dans laquelle je récupére les  valeurs.

### d) Dans InterfaceMeteoComponent, j'ai rendu l'attribut 'city' static pour pouvoir le modifier depuis  ChangeLocationModalContentComponent lorsqu'on change la ville, mais sa valeur ne  s'affiche plus dans le template, bien qu'elle soit bien définie. Jette y un coup d'oeil.

## e) Le responsive, de grâce..., sinon c'est mort

La tu (Mengong) peux mieux communiquer ces taches à Foko que moi, j'ai essayé de jaillir, mais je me suis perdu dans 
le code...
Merci d'avance les gars

## 2) Fandio

### a) Quand je créé un utilisateur, la promesse est résolu avec succes mais l'utilisateur n'est point dans la BD. Jette un coup d'oeil à la méthode submit() du composant SignupComponent, tu verras comment j'ai testé updateUser() et setUser(user), debugge ca stp. Merci...

### b) Rend dynamique les méthodes que j'ai ajouté à la fin de ton service , bref les methodes getCountries,  getRegionsByCountrie et getVillesByRegion (excuse cette rédondance nécessaire). Le reste est bon.

NB: Eviter de mettre tes trucs dans le test, un service reste un service. Remarque que ton composant de test à un 
template, un css et un spec.ts qui ne servent à rien (j'ai kmm géré ca). Tout les methodes que tu as mis dans le 
test devaient rester dans le  service.

## 3) Penano

### a) Completer les méthodes que j'ai introduit dans ton service.
En effet, nous avons besoin que tu aussi renvois la pluviometrie (completer getValuesByVille et implementer 
getValuesByCoord).
    
### b) Dans le constructeur du composant InterfaceMeteoComponent, Mengong choisit au hasard un temps entre  ['cloudy', 'rainy', 'sunny', 'stormy']. Il est question pour toi de rétourner dans la methode getTime() de ton service le temps actuel (entre ['cloudy', 'rainy', 'sunny', 'stormy']) en fonction des conditions métérologiques.

Bien vouloir voir comment j'utilise ton service dans InterfaceMeteoComponent

## 4) Nanda
### a) Completer le méthode getVilleName() qui rétourne la ville courante en utilisant les coordonnées géographiques.

### b) implementer le choix de la position 
En effet, j'appelle ton service dans la méthode ngOnInit() du composant InterfaceMeteoComponent. Tu as donc le droit 
d'ajouter les choses à la suite de ceux-ci pour implementer le choix de la position. Mais toujours faire les 
méthodes dans le service et les appélées comme moi dans les composants.
Au bésoin tu pourras faire ca ailleur et me donner pour que j'intègre.

## 5) Tikeng 
### a) Un truc ne servant à rien si ca vous interesse : app.module.ts, des lignes 64 à 70
### b) J'integre vos traveaux demain Dimanche 04/01/2020