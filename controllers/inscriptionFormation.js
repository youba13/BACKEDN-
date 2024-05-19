const { ApprenantModel } = require("../model/apprenant")
const { FormationCourDesoutienModel, FormationDelangueModel, FormationPratiqueModel } = require("../model/formation")
const { GroupModel } = require("../model/group")
const { InscriptionFormationModel } = require("../model/inscritpion-formation")

const getIscriptions = async (req, res) => {
    try {
        const allApprenants = await InscriptionFormationModel.find();
        res.json(allApprenants); 
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
};
const inscrirAuFormation = async (req,res) => {
    const data = req.body
    const apprenant =await ApprenantModel.findById(data.apprenant)
    const group =await GroupModel.findById(data.group)
    if(!group || !apprenant) return res.status(404).json({meessage :" cant find group or apprenant"})
    data.apprenant = apprenant
    data.group = group
    const inscriptionInstance = new InscriptionFormationModel(data)
    inscriptionInstance.save()
        .then(() => {
            res.json({ message: "inscription reçu",inscriptionInstance })
        })
        .catch((err)=>{
            res.json({message:err.message})
        })
}
const comfirmInscription = async (req,res)=> { 
  
    const data = req.body.inscription
    console.log(data)
   try{
    const inscription = await InscriptionFormationModel.findById(data)
    const idgroup  = inscription.group._id
    const idapprenant =inscription.apprenant._id
   const apprenant =await ApprenantModel.findById(idapprenant)
   const group = await GroupModel.findById(idgroup)
   const result = await InscriptionFormationModel.findByIdAndDelete(data)
  
   group.apprenants.push(idapprenant)
   apprenant.groups.push(idgroup)
   group.save()
   apprenant.save()
   res.json({message:"operation completed"})
   }catch(err){
    res.json({message : err.message})
   }
   
}

const supprimerInscription =async (req,res)=>{
    try{
        const inscription = await InscriptionFormationModel.findByIdAndDelete(req.params.id)
        if(!inscription) return res.status(404).json({message: "inscription not found"})
        
        res.status(200).json({message : "operation completed"})
}catch(err){
    res.json({message: "error deleting inscription" , error : err})
}
   
}

module.exports ={getIscriptions,supprimerInscription,comfirmInscription,inscrirAuFormation}
