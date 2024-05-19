const { date } = require("joi")
const mongoose = require("mongoose")
///////////// USERS CLASSES//////////
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
class Formateur {
    constructor(_idFormateur, nom, prenom, dateNaissance, adress, numTelephone, email, specialite, matieres, groups) {
        this._idFormateur = _idFormateur;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.adress = adress;
        this.numTelephone = numTelephone;
        this.email = email;
        this.matieres = matieres
        this.specialite = specialite
        this.presences_id = [];
        this.absences_id = [];
        this.formateur_Paiements = [];
        this.groups_id = groups;
        this.seances_id = []



    }


}

///////// regular classes ////// 
class group {
    constructor(group_id, formateur_id, nom, niveauGroup, matiere) {
        this.group_id = group_id;
        this.nom = nom;
        this.matiere = matiere;
        this.niveauGroup=niveauGroup
        this.formateur_id = formateur_id;
        this.apprenants_id = [];
        this.seances = [];
    }
}









// Define the Mongoose schema for Absence


// Define the Mongoose schema for Presence


// Define the Mongoose schema for ApprenantPaiment



///////  SCHEMAS OF MONGOOSE //////

///// FORMATEUR //// 

    
// Define the Mongoose schema for NiveauAcademique




// Create a Mongoose model for schemas
/// formateur models///



