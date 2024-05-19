const multer = require("multer")
const {DemandeEmploiModel} =require("../model/demandeDemploi")
const path =require("path")

const handleDemandeEmploi= async (req, res) => {
    const { nom, email, numTelephone,specialite } = req.body;
    console.log({ nom, email, numTelephone,specialite  })
    const cvPath = req.file.path;

    const newUser = new DemandeEmploiModel({
        nom,
        email,
        numTelephone,
        specialite,
        cvPath
    });

    try {
        await newUser.save();
        res.status(201).send("User added successfully");
    } catch (error) {   
        res.status(400).send(error);
    }
};
const getDemandesEmploi =async (req,res)=>{
  try{
    const allDemandes = await DemandeEmploiModel.find()
    if(!allDemandes) return res.status(404).json({message :" No demandes"})
    res.json(allDemandes)
  }catch(err){
    res.json({message : err})
  }
}
  module.exports ={handleDemandeEmploi,getDemandesEmploi};