class formation{
    constructor(nom, formateur,description, prix, apprenants, inscriptions){
        this.nom = nom;
        this.formateur=formateur;
        this.description=description;
        this.prix=prix;
        this.apprenants=[]
        this.inscriptions=[];
    }
  
}
class formationPratique {
    constructor(nom, formateur,description, prix, seances,apprenants, inscriptions, domain, specialite, niveau, duree, dateDebut, dateFin) {
        this.nom = nom;
        this.formateur=formateur;
        this.description=description;
        this.prix=prix;
        this.apprenants=[]
        this.inscriptions=[];
        this.domain=domain;
        this.specialite=specialite;
        this.niveau=niveau;
        this.duree=duree;
        this.dateDebut=dateDebut;
        this.dateFin=dateFin;
        this.seances=seances;
    }
}
class formationDulangue {
    constructor(nom,formateur, description, prix, apprenants, inscriptions, langue, niveau, duree, dateDebut, dateFin,seances) {
        this.nom = nom;
        this.formateur=formateur;
        this.description=description;
        this.prix=prix;
        this.apprenants=[]
        this.inscriptions=[];
        this.seances=seances;
    }
}
class formationCourDesoutien {
    constructor(nom,formateur,seances, description, prix, apprenants, _idFormation, inscriptions,niveau,filiere,matiere,niveauApprenant) {
      this.nom = nom;
      this.seances=seances;
      this.formateur=formateur;
      this.description=description;
      this.prix=prix;
      this.apprenants=[]
      this._idFormation=_idFormation;
      this.inscriptions=[];
      this.niveau=niveau;
      this.filiere=filiere;
      this.matiere=matiere;
      this.niveauApprenant=niveauApprenant
    }
}

module.exports = {formationPratique,formationCourDesoutien,formationDulangue}