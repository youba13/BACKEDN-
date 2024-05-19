const mongoose = require("mongoose")
const salleSchema = new mongoose.Schema({
   nom :{type: String ,required :true},
   capacite :{type: Number, required :true},
   description :{type : String , required :false}
   

})
const SalleModel = mongoose.model('Salle', salleSchema);
module.exports = {salleSchema,SalleModel}