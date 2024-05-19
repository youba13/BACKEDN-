const mongoose = require("mongoose");
const { apprenantSchema } = require("./apprenant");
const { groupSchema } = require("./group");
const inscriptionFormationSchema = new mongoose.Schema({
    apprenant: { type: apprenantSchema , ref: 'Apprenant' },
    group: { type: groupSchema, ref: 'group' },
    inscriptionDate: { type: Date, default: Date.now }
  });

const InscriptionFormationModel = mongoose.model('Enrollment', inscriptionFormationSchema);
module.exports ={InscriptionFormationModel,inscriptionFormationSchema}