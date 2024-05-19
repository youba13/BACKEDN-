class Apprenant {
    constructor(_idApprenant, nom, prenom, dateNaissance, adress, numTelephone, email, niveauAcademique) {
        this._idApprenant = _idApprenant;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.adress = adress;
        this.numTelephone = numTelephone;
        this.email = email;
        this.niveauAcademique = niveauAcademique;
        this.presences = [];
        this.absences = [];
        this.apprenantPaiements = [];
        this.inscription_formation = [];
        this.groups = [];
        this.tests = [];
    }
}
class NiveauAcademique {
    constructor(niveau, filiere, annee) {
        this.niveau = niveau;
        this.filire = filiere;
        this.annee = annee;
    }
}
class ApprenantPaiment {
    constructor(cas, date, montant, notes, group, apprenant_id) {
        this.date = date;
        this.cas = cas;
        this.montant = montant;
        this.notes = notes;
        this.group = group;
        this.apprenant_id = apprenant_id;
    }
}

module.exports = {
    Apprenant,
    ApprenantPaiment,
    NiveauAcademique
}