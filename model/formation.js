const mongoose = require('mongoose');

// Define the schema for formationPratiqur
const formationPratiqueSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    img: {type: String },
    type: { type: String, required: false,default :"Fomration Pratique" },
   
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    inscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inscription' }],
    domain: { type: String, required: true },
    specialite: { type: String, required: true },
   
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Groups' }],
    duree: { type: Number, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true }
}); 
 
// Define the schema for formationDulangue
const formationDelangueSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    type: { type: String, required: false,default :"Formation De Langue" },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    img: {type: String },
    _idFormation: { type: String, },
    inscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inscription' }],
    langue: { type: String, required: true },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Groups' }],
    duree: { type: Number, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true }
});

// Define the schema for formationCourDesoutien
const formationCourDesoutienSchema = new mongoose.Schema({
    img: {type: String },
    nom: { type: String, required: true },
    type: { type: String, required: false, default :"Cour De Soutien" },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    groups: { type: [String],default :[], ref: 'Groups' },
    inscriptions: { type: [String],default :[], ref: 'Inscription' },
    niveau: { type: String, required: true },
    filiere: { type: String },        
    annee: { type: String, required: true },
    matiere: { type: String, required: true }
});

// Create models based on the schemas 
const FormationPratiqueModel = mongoose.model('FormationPratiqur', formationPratiqueSchema);
const FormationDelangueModel = mongoose.model('FormationDulangue', formationDelangueSchema);
const FormationCourDesoutienModel = mongoose.model('FormationCourDesoutien', formationCourDesoutienSchema);

module.exports = { FormationPratiqueModel, FormationDelangueModel, FormationCourDesoutienModel };