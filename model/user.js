const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'formateur', 'apprenant'], required: true },
  // Add other fields common to all users or specific to roles, if necessary
});

const UserModel =  mongoose.model('User', userSchema);
module.exports ={UserModel,userSchema}