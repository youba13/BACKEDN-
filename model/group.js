const mongoose = require('mongoose');
const {niveauAcademiqueSchema} =require("../model/apprenant");
const { formateurSchema } = require('./formateur');
const groupSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    typeDeFormation: { type: String, required: true },
    formation:{type: mongoose.Schema.Types.ObjectId , required: true},
    apprenants: { type: [mongoose.Schema.Types.ObjectId], defaut : []},
    seances: { type: [mongoose.Schema.Types.ObjectId], defaut : []},
    niveau: { type: String },
    formateur: { type: mongoose.Schema.Types.ObjectId , ref: 'Formateur', required: true },

}); 

const GroupModel = mongoose.model('group', groupSchema);

module.exports = {GroupModel,groupSchema}; 