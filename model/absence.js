const mongoose =require("mongoose")
const absenceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    seance: { type: mongoose.Schema.Types.ObjectId, required: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' } // Assuming reference to Person schema
});
const AbsenceModel = mongoose.model('Absence', absenceSchema);
module.exports = {AbsenceModel,absenceSchema}