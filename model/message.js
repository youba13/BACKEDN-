const mongoose =require("mongoose")
const messageschema = new mongoose.Schema({
    email: { type: String , required: true },
    sujet: { type:String, required: true },
    message: { type: String,required: true  } // Assuming reference to Person schema
});
const MessageModel = mongoose.model('Message', messageschema);
module.exports ={messageschema,MessageModel}     