const mongoose = require("mongoose")
const {formateurPaiementSchema} = require("../model/paiement")
const {absenceSchema} = require("../model/absence")
const {presenceSchema} = require("../model/presence");
const { seanceSchema } = require("./seance");
const formateurSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "formateur"
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    adress: { type: String, required: true },
    numTelephone:  { type: String, required: true },
    email: { type: String, required: true }, 
    specialite: { type: String, required: false },
    matieres: { type: [String], required: false }, // Assuming matieres is an array of strings
    presences: { type: [presenceSchema], default: [] }, // Assuming reference to Presence schema
    absences: { type: [absenceSchema], default: [] }, // Assuming reference to Absence schema
    paiements: { type: [formateurPaiementSchema], default: [] }, // Assuming reference to FormateurPaiement schema
    groups: { type: [String], default: [] }, // Assuming reference to Group schema
    seances: { type: [seanceSchema], default: [] } // Assuming reference to Seance schema
});
const FormateurModel = mongoose.model('Formateur', formateurSchema);
module.exports = {FormateurModel,formateurSchema} 