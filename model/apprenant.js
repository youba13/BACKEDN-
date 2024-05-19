const mongoose = require("mongoose")
const {presenceSchema} =require("../model/presence")
const {absenceSchema} =require("../model/absence")
const {apprenantPaiementSchema} = require("../model/paiement");

const niveauAcademiqueSchema = new mongoose.Schema({
    niveau: { type: String,  },
    filiere: { type: String,},
    annee: { type: String , }
});
const NiveauAcademiqueModel = mongoose.model('NiveauAcademique', niveauAcademiqueSchema);

const apprenantSchema = new mongoose.Schema({
   
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, 
        default: "Apprenant"
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    adress: { type: String, required: true },
    numTelephone: { type: String, required: true },
    email: { type: String, required: true },
    niveauAcademique: { type: niveauAcademiqueSchema, required: true },
    presences: { type: [presenceSchema], default: [] }, // Array of strings
    absences: { type: [absenceSchema], default: [] }, // Array of strings
    paiements: { type: [apprenantPaiementSchema], default: [] }, // Array of strings  
    formations: { type: [String], default: [] },
    groups: { type: [String], default: [] }, // Array of strings
    tests: { type: [String], default: [] }
});
const apprenanWatingListtSchema = new mongoose.Schema({
  
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Apprenant"
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    adress: { type: String, required: true },
    numTelephone: { type: String, required: true },
    email: { type: String, required: true },
    niveauAcademique: { type: niveauAcademiqueSchema, required: true },
    presences: { type: [presenceSchema], default: [] }, // Array of strings
    absences: { type: [absenceSchema], default: [] }, // Array of strings
    paiements: { type: [apprenantPaiementSchema], default: [] }, // Array of strings
    formations: { type: [String], default: [] },
    groups: { type: [String], default: [] }, // Array of strings
    tests: { type: [String], default: [] }
});

const ApprenantModel = mongoose.model('Apprenant', apprenantSchema);
const ApprenantWaitingListModel = mongoose.model('ApprenantWaitingList', apprenanWatingListtSchema);



module.exports = {ApprenantModel,NiveauAcademiqueModel,ApprenantWaitingListModel,niveauAcademiqueSchema,apprenantSchema}
