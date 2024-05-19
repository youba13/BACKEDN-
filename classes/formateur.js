class Formateur {
    constructor(nom, prenom, dateNaissance, adress, numTelephone, email, specialite, matieres) {
        this._idFormateur = _idFormateur;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.adress = adress;
        this.numTelephone = numTelephone;
        this.email = email;
        this.matieres = matieres
        this.specialite = specialite
        this.presences = [];
        this.absences = [];
        this.formateur_Paiements = [];
        this.groups = [];
        this.seances = []



    }


}
module.exports = {
    Formateur
}