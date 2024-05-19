const mongoose = require('mongoose');
const demandeEmploiSchema = new mongoose.Schema({
    nom: {type :String  ,require},
    email: {type :String  ,require},
    numTelephone: {type :String  ,require},
    specialite: {type :String  ,require},
    cvPath: {type :String  ,require} 
  });
  const DemandeEmploiModel =mongoose.model('DemandEmploi', demandeEmploiSchema);
  module.exports={DemandeEmploiModel}