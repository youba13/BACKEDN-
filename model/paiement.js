const mongoose = require("mongoose")

const apprenantPaiementSchema = new mongoose.Schema({  
    date: { type: Date, required: true },
    montant: { type: Number, required: true },
    notes: { type: String },
    status: { type: String },
    group: { type: String },
});
const formateurPaiementSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    salair: { type: Number, required: true },
    notes: { type: String },
    group: { type: String },
    status: { type: String },
   
});
const ApprenantPaiementModel = mongoose.model('ApprenantPaiment', apprenantPaiementSchema);
const FormateurPaiementModel = mongoose.model('FormateurPaiement', formateurPaiementSchema);
module.exports ={
    ApprenantPaiementModel,
    FormateurPaiementModel,apprenantPaiementSchema,formateurPaiementSchema 
} 