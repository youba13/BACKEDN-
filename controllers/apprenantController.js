const mongoose = require("mongoose")
const bcrypt =require("bcrypt")
const path = require("path")

const { ApprenantModel, NiveauAcademiqueModel,ApprenantWaitingListModel } = require("../model/apprenant")
const {ApprenantPaiementModel} = require("../model/paiement")
const { UserModel } = require("../model/user")
const getAllApprenants = async (req, res) => {
    try {
        const allApprenants = await ApprenantModel.find({},{password : 0});
        res.json(allApprenants); 
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
};
const getOneApprenants = async (req, res) => {
    
    try {
        const idapprenant= req.params.id
        const apprenant = await ApprenantModel.findById(idapprenant);
        apprenant.password = undefined
        console.log("hello")
        res.json(apprenant);
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
};

const createApprenant = async (req, res) => {
    const data = req.body 
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const niveauAcademique = new NiveauAcademiqueModel()
    niveauAcademique.niveau = req.body.niveau
    niveauAcademique.filiere = req.body.filiere  
    niveauAcademique.annee = req.body.annee
    delete data.niveau 
    delete data.filier
    delete data.annee
    data.password=hashedPass
    data.niveauAcademique = niveauAcademique

    const apprenantinstance = new ApprenantModel(data)
    const userInstance =new UserModel({email:data.email ,password :hashedPass,role:"apprenant"})
    const emailexiste = await UserModel.findOne({email: data.email})
    if(emailexiste)return res.status(401).json({message:'email already in use'})
    userInstance._id=apprenantinstance._id
    userInstance.save() 
    apprenantinstance.save() 
        .then(() => {
            return res.json({ message: "apprenant a ete cree avec succee" })
        }).catch((err) => {
            return res.json({ message: err.message })
        })
}

const registerApprenant= async (req,res)=>{
    const data = req.body 
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const niveauAcademique = new NiveauAcademiqueModel()
    const emailExiste= await  ApprenantModel.findOne({email : data.email})
    if(emailExiste){
        return res.status(401).json({message: "email already in use"})
    }
    niveauAcademique.niveau = req.body.niveau
    niveauAcademique.filiere = req.body.filiere
    niveauAcademique.annee = req.body.annee
    delete data.niveau
    delete data.filier
    delete data.annee
    data.password=hashedPass
    data.niveauAcademique = niveauAcademique

    const apprenantinstance = new ApprenantModel(data)
    const user =new UserModel({email:data.email ,password :hashedPass,role:"apprenant"})
    user.save()
    apprenantinstance.save()
        .then(() => {
            return res.json({ message: "apprenant a ete cree avec succee" })
        }).catch((err) => {
            return res.json({ message: err.message })
        })
}

const deleteApprenant = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedApprenant = await ApprenantModel.findByIdAndDelete(id);
         const user = await UserModel.findByIdAndDelete(id)
        if (!updatedApprenant) {
            return res.status(404).json({ message: "Apprenant not found" });
        }
        res.json({updatedApprenant});
    } catch (error) {
        res.json({ message: "Internal server error" });
    }
};
const updateApprenant = async (req, res) => {
    const data = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    data.password =hashedPass
    const niveauAcademique = new NiveauAcademiqueModel()
    niveauAcademique.niveau = req.body.niveau
    niveauAcademique.filiere = req.body.filiere
    niveauAcademique.annee = req.body.annee
    delete data.niveau
    delete data.filiere
    delete data.annee
    data.niveauAcademique = niveauAcademique
    const updatedApprenant = await ApprenantModel.findByIdAndUpdate(req.params.id, data);
    const user =await UserModel.findByIdAndUpdate(req.params.id,{email:data.email,password:data.password}) 
    try {
        if (!updatedApprenant) {
            return res.status(404).json({ message: "Apprenant not found" });
        }
        res.json({ message: "Apprenant updated successfully", updatedApprenant });
    } catch (err) {
        console.error("Error creating apprenant:", err); 
        res.status(500).json({ message: "Internal server error" });
    } 
}

const afficherInfoApprenant = async (req, res) => {
    const apprenantId = req.params.id
    const foundApprenant = await ApprenantModel.findById(apprenantId)

    try {
        if (!foundApprenant) {
            return res.status(404).json({ message: "Apprenant not found" });
        }
        return res.json(foundApprenant);
    } catch (err) {
        console.error("Error finding apprenant:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

};
/// get all apprenants [done]
/// get one apprenenant [done]
/// create appprenant (admin op)[done]
/// register apprenant [not done]
///  delete apprenants [no done]
/// 





//// Opreations Paiements/////

const ajouterPaiementApprenant = async (req, res) => {
    const apprenant_id = req.params.id
    const data = req.body
    if (!apprenant_id) return res.sendStatus(404).json("id was not found")
   
   

    const foundApprenant = await ApprenantModel.findById(apprenant_id)
   
    try {
        if (!foundApprenant) {
            return res.status(404).json({ message: "Apprenant not found" });
        }
        const paiement = new ApprenantPaiementModel(data)
        paiement.save()
       foundApprenant.paiements.push(paiement)
      
       foundApprenant.save()
        res.json({message: "paiement a ete ajoutee avec succee"})
    } catch (err) {
        console.error("erreur d ajouter le paiment:", err);
         res.json({ message: "Internal server error" });
    }

}
const supprimerPaimenetApprenant = async (req, res) => {
    const apprenant_id = req.params.idapprenant
    const paiementid = req.params.idpaiement
    try {
        const foundApprenant = await ApprenantModel.findById(apprenant_id)
        const foundPaiemant = await ApprenantPaiementModel.findById(paiementid)
        if (!foundApprenant || !foundPaiemant) {
            return res.status(404).json({ message: "Apprenant or paiement not found" });
        }
        foundApprenant.paiements=foundApprenant.paiements.filter((paiement)=> paiement._id.toString() !== paiementid)
        foundApprenant.save()
        const result = await ApprenantPaiementModel.findByIdAndDelete( paiementid)
        res.json({status : 200 , message: "deleteing done"})
       
    } catch (err) {
        console.error("erreur de suprimer le paiment:", err);
         res.json({ message: "Internal server error" });
    }

}
const afficherPaiementApprenantById = async (req, res) => {
    const paiementId = req.params.id
    const foundPaiement = await ApprenantPaiementModel.findById(paiementId)

    try {
        if (!foundPaiement) {
            return res.status(404).json({ message: "paiement was not found" });
        }
        return res.json({ message: "voila votre resultat", foundPaiement });
    } catch (err) {
        console.error("Error finding apprenant:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

};
const getPaiementsApprenant = async (req,res)=>{
    const apprenantid = req.params.id
    const apprenant = await ApprenantModel.findById(apprenantid)
    const paiements = []
    
  try{  
    await Promise.all(apprenant.paiements.map(async (item)=>{
        const paiement =await ApprenantPaiementModel.findOne({_id: item})
        if(paiement){paiements.push(paiement)}
    }))
    res.json(paiements)
}catch(err){
    res.json(err)
}
    
}

module.exports = {getPaiementsApprenant,registerApprenant, getOneApprenants,supprimerPaimenetApprenant,createApprenant, deleteApprenant, updateApprenant, ajouterPaiementApprenant, getAllApprenants, afficherInfoApprenant, afficherPaiementApprenantById };