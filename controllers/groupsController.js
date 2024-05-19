const {GroupModel} = require("../model/group")
const { ApprenantModel } = require("../model/apprenant");
const { FormateurModel } = require("../model/formateur");

const mongoose = require("mongoose");
const { FormationCourDesoutienModel, FormationPratiqueModel, FormationDelangueModel } = require("../model/formation");
const { ObjectId } = mongoose.Types;
const getAllGroups = async (req,res)=>{
    try {
        const allGroups = await GroupModel.find();
        res.json(allGroups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 
const getOneGroup = async (req,res)=>{
    const id = req.params.id
    const group = await GroupModel.findById(id)
    res.json(group)
}
const createGroup = async (req, res) => {
    try{
    const data = req.body
    
    const formation = data.formation
    const group = data.group
  
    const groupInstance =new GroupModel(group)
    console.log(groupInstance)
    const formateur  = await FormateurModel.findById(group.formateur)
    formateur.groups.push(groupInstance._id)
    formateur.save() 
    groupInstance.save()  
    if(formation.type === 'Cour De Soutien'){
      const result=  await FormationCourDesoutienModel.findById(formation._id)
      
      result.groups.push(groupInstance._id) 
      result.save() 
    }else  if(formation.type === "Formation De Langue"){
        const result=  await FormationDelangueModel.findById(formation._id)
        result.groups.push(groupInstance._id)
        result.save()
    }else  if(formation.type === "Formation Pratique"){
        const result=  await FormationPratiqueModel.findById(formation._id)
        result.groups.push(groupInstance._id)
        result.save()
    }
    
    res.status(200).json({message : "operation completed"})
}catch(err){
    res.json({message: err})
}

}
const deleteGroup = async (req, res) => {
 
    try {
        const id = req.params.id;
        const deletedGroup = await GroupModel.findById(id);
        if (!deletedGroup) {
            return res.json({ message: "group not found" });
        }
       // const formateur = await FormateurModel.findById(deletedGroup.formateur)
        //formateur.groups = formateur.groups.filter((item)=> item === deletedGroup._id.toString())
        if(deletedGroup.typeDeFormation === 'Cour De Soutien'){
            const result=  await FormationCourDesoutienModel.findById(deletedGroup.formation.toString())
             result.groups = result.groups.filter((item) => item !== deletedGroup._id.toString())
            console.log(result)  
            result.save()
          }else  if(deletedGroup.typeDeFormation === "Formation De Langue"){
            const result=  await FormationDelangueModel.findById(deletedGroup.formation.toString())
            result.groups = result.groups.filter((item) => item !== deletedGroup._id.toString())
             console.log(result)
            result.save()
          }else  if(deletedGroup.typeDeFormation === "Formation Pratique"){
            const result=  await FormationPratiqueModel.findById(deletedGroup.formation.toString())
             result.groups = result.groups.filter((item) => item !== deletedGroup._id.toString())
            console.log(result)   
            result.save() 
          }
          const groupdeleted = await GroupModel.findByIdAndDelete(id)
          res.status(200).json({message : "operation completed"})
    } catch (error) {
        console.error("Error deleting group:", error);
        res.json({ message: "Internal server error" });
    }
}
const updateGroup = async (req, res) => {
    const data = req.body
    const id = req.params.id
    await GroupModel.findByIdAndUpdate(id, data)
        .then(() => {
            res.json({ message: "operation is completed" })
        })
        .catch((err) => {
            res.json({ messaeg: err.message })
        })

}



////ajouter appreant a un group /////
const ajouterApprenantGroup = async (req, res) => {
    const idApprenant = req.params.idApprenant
    const idGroup = req.params.idGroup
    const foundGroup = await GroupModel.findById(idGroup)
    const foundApprenant = await ApprenantModel.findById(idApprenant)
    if (!foundGroup || !foundApprenant) return res.status(404).json({ message: 'error finding group or apprenant' })
    try {      
        foundApprenant.groups.push(foundGroup._id)
        foundGroup.apprenants.push(idApprenant)
        foundGroup.save()
        foundApprenant.save()
        res.json({ message: "operation completed !" })

    } catch (err) {
        res.json({ message: err.message })
    }
}
const deleteApprenantGroup = async (req, res) => {
    const idApprenant = req.params.idApprenant
    const idGroup = req.params.idGroup
    try {
        const foundGroup = await GroupModel.findById(idGroup)
        const foundApprenant = await ApprenantModel.findById(idApprenant)
        foundApprenant.groups =foundApprenant.groups.filter(element => element.toString() !== foundGroup._id.toString())
        foundGroup.apprenants = foundGroup.apprenants.filter(element => element.toString() !== foundApprenant._id.toString())
        foundApprenant.save()
        foundGroup.save()
        res.json({ message: "aprenant deleted from group !" })
    } catch (err) {
        res.json({ message: err.message })
    }

}
const  getGroupsByIds = async (req,res)=> {
    try {
        // Ensure all ids are valid MongoDB ObjectIds
        
        const objectIds = req.params.id.split(',')
        console.log(objectIds)
        
        const items = await GroupModel.find({
            '_id': { $in: objectIds }
        });

        return res.json({items}) ;
    } catch (error) {
        console.error('Failed to retrieve items by IDs:', error);
        throw error;
    }
}
module.exports = { getOneGroup,getGroupsByIds,createGroup, deleteGroup, updateGroup, ajouterApprenantGroup, deleteApprenantGroup ,getAllGroups}