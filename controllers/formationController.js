const mongoose = require("mongoose")
const { FormationPratiqueModel, FormationDelangueModel, FormationCourDesoutienModel } = require("../model/formation")
const { ApprenantModel } = require("../model/apprenant")

const getAllFormation = async (req, res) => {
    try {
        const allFormationPratique = await FormationPratiqueModel.find();
        const allFormationDulangue = await FormationDelangueModel.find();
        const FormationCourDesoutien = await FormationCourDesoutienModel.find();
        const allFormations = [allFormationPratique, allFormationDulangue, FormationCourDesoutien]
        res.json(allFormations);
    } catch (error) {
        res.json({ message: error.message });
    }
} 
const getFormationCourDeSoutien = async (req,res)=>{
    try{
        console.log(req.params.id)
        const FormationCourDesoutien = await FormationCourDesoutienModel.findById(req.params.id);
        res.json(FormationCourDesoutien)
    }catch(err){
      res.json(err)
    }
}
const getFormationPratique = async (req,res)=>{
    try{
        console.log(req.params.id)
        const FormationCourDesoutien = await FormationPratiqueModel.findById(req.params.id);
        if(!FormationCourDesoutien) return res.status(404).json({message : "not found"})
        res.json(FormationCourDesoutien)
    }catch(err){
      res.json(err)
    }
}
const getFormationDeLangue = async (req,res)=>{
    try{
        console.log(req.params.id)
        const FormationCourDesoutien = await FormationDelangueModel.findById(req.params.id);
        res.json(FormationCourDesoutien)
    }catch(err){
      res.json(err)
    }
}
const afficherAllCourDeSoutien = async (req, res) => {
    try {
       
        const FormationCourDesoutien = await FormationCourDesoutienModel.find();
        
        res.json(FormationCourDesoutien);
    } catch (error) {
        res.json({ message: error.message });
    }
} 
const afficherAllFormationPratique = async (req, res) => {
    try {
       
        const FormationCourDesoutien = await FormationPratiqueModel.find();
        
        res.json(FormationCourDesoutien);
    } catch (error) {
        res.json({ message: error.message });
    }
} 
const afficherAllFormationDeLangue = async (req, res) => {
    try {
       
        const FormationCourDesoutien = await FormationDelangueModel.find();
        
        res.json(FormationCourDesoutien);
    } catch (error) {
        res.json({ message: error.message });
    }
} 
//////// create Formation ///////////
const createFormationPratique = (req, res) => {
    const data = req.body
    console.log(data)
    
    try {
        const formationInstance = new FormationPratiqueModel(data)
        formationInstance.save()
            .then(() => {
                return res.json({ message: "la formation a ete cree avec succee", data })
            }).catch((err) => {
                res.json({ message: err.message })
            })
    } catch (err) {
        return res.json({ message: err.message })
    }
}
const createFormationCourDeSoutien = (req, res) => {
    const data = req.body
    console.log(data)
    try {
        // req.file is the 'img' file
        // req.body will hold the text fields, if there were any
        const newFormationData = {
            ...req.body,
            img: req.file ? req.file.path : undefined  // Store file path in the database
        };
        console.log(newFormationData)
        const formationInstance = new FormationCourDesoutienModel(newFormationData)
        formationInstance.save()
            .then(() => {
                return res.json({ message: "la formation a ete cree avec succee", data })
            }).catch((err) => {
                res.json({ message: err.message })
            })
    } catch (err) {
        return res.json({ message: err.message })
    }
}
const createFormationDeLangue = (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const formationInstance = new FormationDelangueModel(data)
        formationInstance.save()
            .then(() => {
                return res.json({ message: "la formation a ete cree avec succee", data })
            }).catch((err) => {
                res.json({ message: err.message })
            })
    } catch (err) {
        console.log(err)
         res.json({ message: err.message })
    }
} 

/// supprimer formation  //////  
const deleteFormationPratique = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFormation = await FormationPratiqueModel.findByIdAndDelete(id);
        if (!deletedFormation) {
            return res.json({ message: "formation not found" });
        }
        res.json({ message: "formation a ete supprimer", deletedFormation });
    } catch (error) {
        console.error("Error deleting formation:", error);
        res.json({ message: "Internal server error" });
    }
};
const deleteFormationDeLangue = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedFormation = await FormationDelangueModel.findByIdAndDelete(id);
        console.log(deletedFormation)
        if (!deletedFormation) {
            return res.json({ message: "formation not found" });
        }
        res.json({ message: "formation a ete supprimer", deletedFormation });
    } catch (error) {
        console.error("Error deleting formation:", error);
        res.json({ message: "Internal server error" });
    }
};
const deleteCourDeSoutien = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFormation = await FormationCourDesoutienModel.findByIdAndDelete(id);
        if (!deletedFormation) {
            return res.json({ message: "formation not found" });
        }
        res.json({ message: "formation a ete supprimer", deletedFormation });
    } catch (error) {
        console.error("Error deleting formation:", error);
        res.json({ message: "Internal server error" });
    }
};
////// updating formation //// 
const updateFormationPratique = async (req,res)=>{
    const data = req.body
    const id = req.params.id
     await FormationPratiqueModel.findByIdAndUpdate(id,data)
     .then(()=>{
        res.json({message : "operation is completed"})
     })
     .catch((err)=>{
        res.json({messaeg : err.message})
     })

}
const updateFormationDeLangue = async (req,res)=>{
    const data = req.body
    const id = req.params.id
     await FormationDelangueModel.findByIdAndUpdate(id,data)
     .then(()=>{
        res.json({message : "operation is completed"})
     })
     .catch((err)=>{
        res.json({messaeg : err.message})
     })

}
const updateFormationCourDeSoutien = async (req,res)=>{
    const data = req.body
    const id = req.params.id
     await FormationCourDesoutienModel.findByIdAndUpdate(id,data)
     .then(()=>{
        res.json({message : "operation is completed"})
     })
     .catch((err)=>{
        res.json({messaeg : err.message})
     })

}
//////ajouter apprenant a une formation ///// 
const ajouterAppreantCourDeSoutien = async (req, res) => {
    const idApprenant = req.params.idApprenant
    const idFormation = req.params.idFormation
    const foundFormation = await FormationCourDesoutienModel.findById(idFormation)
    const foundApprenant = await ApprenantModel.findById(idApprenant)
    if (!foundFormation || !foundApprenant) return res.sendStatus(404).json({ message: 'error finding formation or apprenant' })
    try {
        foundApprenant.formations.push(foundFormation._id)
        foundFormation.apprenants.push(foundApprenant._id)
        foundFormation.save()
        foundApprenant.save()
        res.json({ message: "operation completed !" })

    } catch (err) {
        res.json({ message: err.message })
    }
}
const ajouterAppreantFormationPratique = async (req, res) => {
    const idApprenant = req.params.idApprenant
    const idFormation = req.params.idFormation
    const foundFormation = await FormationPratiqueModel.findById(idFormation)
    const foundApprenant = await ApprenantModel.findById(idApprenant)
    if (!foundFormation || !foundApprenant) return res.sendStatus(404).json({ message: 'error finding formation or apprenant' })
    try {
        foundApprenant.formations.push(foundFormation._id)
        foundFormation.apprenants.push(foundApprenant._id)
        foundFormation.save()
        foundApprenant.save()
        res.json({ message: "operation completed !" })

    } catch (err) {
        res.json({ message: err.message })
    }
}


const ajouterAppreantFormationDeLangue = async (req, res) => {
    const idApprenant = req.params.idApprenant
    const idFormation = req.params.idFormation
    const foundFormation = await FormationDelangueModel.findById(idFormation)
    const foundApprenant = await ApprenantModel.findById(idApprenant)
    if (!foundFormation || !foundApprenant) return res.sendStatus(404).json({ message: 'error finding formation or apprenant' })
    try {
        foundApprenant.formations.push(foundFormation._id)
        foundFormation.apprenants.push(foundApprenant._id)
        foundFormation.save()
        foundApprenant.save()
        res.json({ message: "operation completed !" })

    } catch (err) {
        res.json({ message: err.message })
    }
}



module.exports = {
    getFormationCourDeSoutien,
    getFormationPratique,
    getFormationDeLangue,
    getAllFormation,
    afficherAllFormationPratique,
    afficherAllCourDeSoutien,
    afficherAllFormationDeLangue,
    createFormationCourDeSoutien,
    createFormationDeLangue,
    createFormationPratique,
    deleteFormationPratique,
    deleteFormationDeLangue,
    deleteCourDeSoutien,
    ajouterAppreantCourDeSoutien,
    ajouterAppreantFormationDeLangue,
    ajouterAppreantFormationPratique,
    updateFormationPratique,
    updateFormationDeLangue,
    updateFormationCourDeSoutien
}