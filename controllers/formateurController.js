const mongoose = require("mongoose")
const path = require("path")
const {UserModel}= require("../model/user")
const bcrypt =require("bcrypt")
const {FormateurModel} = require("../model/formateur")
const { FormateurPaiementModel } = require("../model/paiement")

const getAllFormateurs = async (req, res) => {
    try {
        const allFormateurs = await FormateurModel.find();
        res.json(allFormateurs);
    } catch (error) {
        res.json({ message: error.message });
    }
};


const createFormateur = async (req, res) => {
    const data = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    data.password = hashedPass
    const Formateurinstance = new FormateurModel(data)
    const result = await UserModel.findOne({email : Formateurinstance.email})
    if(result) return res.status(404).json("email already in use")
    const user =new UserModel({email:data.email ,password :hashedPass,role:"formateur"})
    user._id=Formateurinstance._id
    user.save()
    Formateurinstance.save()
        .then(() => {
            return res.json({ message: "Formateur a ete cree avec succee" })
        }).catch((err) => {
            return res.json({ message: err.message })
        })
}
const deleteFormateur = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFormateur = await FormateurModel.findByIdAndDelete(id);
        if (!updatedFormateur) {
            return res.status(404).json({ message: "Formateur not found" });
        }
        res.json({ message: "Formateur deleted successfully", updatedFormateur });
    } catch (error) {
        console.error("Error deleting Formateur:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const updateFormateur = async (req, res) => {
    const data = req.body
    
    const updatedFormateur = await FormateurModel.findByIdAndUpdate(req.params.id, data);
    try {
        if (!updatedFormateur) {
            return res.status(404).json({ message: "Formateur not found" });
        }
        res.json({ message: "Formateur updated successfully", updatedFormateur });
    } catch (err) {
        console.error("Error creating Formateur:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const afficherInfoFormateur = async (req, res) => {
    const FormateurId = req.params.id
    const foundFormateur = await FormateurModel.findById(FormateurId)

    try {
        if (!foundFormateur) {
            return res.status(404).json({ message: "Formateur not found" });
        }
        return res.json( foundFormateur );
    } catch (err) {
        console.error("Error finding Formateur:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

};






//// Opreations Paiements/////

const ajouterPaiementFormateur = async (req, res) => {
    const formateurid = req.params.id
    const data = req.body
    if (!formateurid) return res.sendStatus(404).json("id was not found")
   
   

    const foundApprenant = await FormateurModel.findById(formateurid)
   
    try {
        if (!foundApprenant) {
            return res.status(404).json({ message: "Formateur not found" });
        }
        const paiement = new FormateurPaiementModel(data)
        paiement.save()
       foundApprenant.paiements.push(paiement)
      
       foundApprenant.save()
        res.json({message: "paiement a ete ajoutee avec succee"})
    } catch (err) {
        console.error("erreur d ajouter le paiment:", err);
         res.json({ message: "Internal server error" });
    }


}

const afficherPaiementFormateurById = async (req, res) => {
    const paiementId = req.params.id
    const foundPaiement = await FormateurPaimentModel.findById(paiementId)

    try {
        if (!foundPaiement) {
            return res.status(404).json({ message: "paiement was not found" });
        }
        return res.json({ message: "voila votre resultat", foundPaiement });
    } catch (err) {
        console.error("Error finding Formateur:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

};
const supprimerPaimenetFormateur = async (req, res) => {
    const formateurid = req.params.idformateur
    const paiementid = req.params.idpaiement
    try {
        const foundFormateur = await FormateurModel.findById(formateurid)
        const foundPaiemant = await FormateurPaiementModel.findById(paiementid)
        if (!foundFormateur || !foundPaiemant) {
            return res.status(404).json({ message: "formateur or paiement not found" });
        }
        foundFormateur.paiements=foundFormateur.paiements.filter((paiement)=> paiement._id.toString() !== paiementid)
        foundFormateur.save()
        const result = await FormateurPaiementModel.findByIdAndDelete( paiementid)
        res.json({status : 200 , message: "deleteing done"})
       
    } catch (err) {
        console.error("erreur de suprimer le paiment:", err);
         res.json({ message: "Internal server error" });
    }

}
const getPaiementFormateur = async (req,res)=>{
    const apprenantid = req.params.id
    const apprenant = await FormateurModel.findById(apprenantid)
    const paiements = []
    
  try{  
    await Promise.all(apprenant.paiements.map(async (item)=>{
        const paiement =await FormateurPaiementModel.findOne({_id: item})
        if(paiement){paiements.push(paiement)}
    }))
    res.json(paiements)
}catch(err){
    res.json(err) 
} 
    
}
module.exports = {getPaiementFormateur,supprimerPaimenetFormateur, createFormateur, deleteFormateur, updateFormateur, ajouterPaiementFormateur, getAllFormateurs, afficherInfoFormateur, afficherPaiementFormateurById };