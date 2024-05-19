const mongoose =require("mongoose")
const presenceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    seance: { type: mongoose.Schema.Types.ObjectId, required: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' } // Assuming reference to Person schema
});
const PresenceModel = mongoose.model('Presence', presenceSchema);
module.exports ={presenceSchema,PresenceModel}