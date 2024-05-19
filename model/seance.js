const mongoose = require('mongoose');
const {formateurSchema}=require('../model/formateur')
const {groupSchema}=require('../model/group')
const seanceSchema = new mongoose.Schema({
    contenu: { type: String, required: true },
    heureDebut: { type: String, required: true },
    heureFin: { type: String, required: true },
    date: { type: String, required: true },
    formateur: { type:mongoose.Schema.Types.ObjectId  , required: true },
    presences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Presence' }],
    absences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Absence' }],
    group: { type:  mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
}); 

const SeanceModel = mongoose.model('Seance', seanceSchema);

module.exports = {SeanceModel, seanceSchema};
