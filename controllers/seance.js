const {SeanceModel} = require("../model/seance")
const {GroupModel}= require("../model/group");
const { AbsenceModel } = require("../model/absence");
const { PresenceModel } = require("../model/presence");
const { FormateurModel } = require("../model/formateur");
const { ApprenantModel } = require("../model/apprenant");
const getAllSeances = async (req,res)=>{
    try {
        const allSeances = await SeanceModel.find();
        res.json(allSeances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getOneSeance  = async (req,res)=>{
    const id = req.params.id
    try {
        const seance = await SeanceModel.findOne({_id :id});
        const data ={}
        data.contnue = seance.contenu
        const formateur = await FormateurModel.findOne({_id : seance.formateur})
        data.formateur = formateur.nom +" "+ formateur.prenom
        data.presences =[]
        await Promise.all(seance.presences.map(async (item)=>{
            const apprenant =await ApprenantModel.findOne({_id: item})
            data.presences.push(apprenant)
        }))
        data.absences =[]
        await Promise.all(seance.absences.map(async (item)=>{ 
            const apprenant =await ApprenantModel.findOne({_id: item})
            data.absences.push(apprenant)
        }))
        const group =await GroupModel.findOne({_id :seance.group})
        data.group  = group.nom
        data.date =seance.date
        data.heureDebut = seance.heureDebut
        data.heureFin=seance.heureFin
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createSeance = async (req,res)=>{
    const data = req.body;
    const group = await GroupModel.findById(data.group)
    const formateur =await FormateurModel.findById(data.formateur)
    if(!group  || !formateur){return res.status(404).json({message:"group or formateur not found"})}
    const allpresneces = data.presences.map(objId => objId.toString());
    const filteredArray2 = allpresneces.filter(objId => !data.absences.includes(objId.toString()));
    
          
       try{
// Filter array2 to remove items that exist in array1
          
            const seanceInstance = new SeanceModel(data); 
            seanceInstance.presences = filteredArray2
            seanceInstance.absences = data.absences
            
            console.log(seanceInstance)
         
       
           await Promise.all(
                seanceInstance.absences.map(async (apprenant) => {
                    const absence = new AbsenceModel({ date: seanceInstance.date, seance: seanceInstance._id, person: apprenant._id });
                    const apprenantfound =await ApprenantModel.findById(apprenant)
                   if(apprenantfound){
                    apprenantfound.absences.push(absence)
                    await apprenantfound.save() 
                    await absence.save();
                }
                }));
    
            await Promise.all( 
                seanceInstance.presences.map(async (apprenant) => {
                const presence = new PresenceModel({ date: seanceInstance.date, seance: seanceInstance._id, person: apprenant._id });
                const apprenantfound =await ApprenantModel.findById(apprenant)
               if(apprenantfound){apprenantfound.presences.push(presence)
                await apprenantfound.save()
                await presence.save();}
            }));
            const presence =new PresenceModel({date:seanceInstance.date,seance:seanceInstance._id,person:formateur._id})
            formateur.presences.push(presence)
            formateur.seances.push(seanceInstance) 
           
            formateur.save()
            presence.save() 
            ///**** filtering presents**** */
           
            await seanceInstance.save()
             group.seances.push(seanceInstance._id)
            await group.save()
            res.status(200).json({message: "operation completed"})
         }catch{(err)=>{
           console.log(err)
        }}
    
}
const deleteSeance = async (req,res)=>{
    const id = req.params.id
   await SeanceModel.findByIdAndDelete(id)
   .then(()=>{ 
    res.json({message:"operation completed"})
   })
   .catch((err)=>{
    res.json({message : err})
   })

}
const selectAbsenties = async (req,res)=>{
    const apprenantIds = req.params.ids.split(",")
    const seanceid = req.params.id
    const foundSeance = await SeanceModel.findOne({_id: seanceid})
    console.log(apprenantIds)
    try{
    
    for(let i =0; i > apprenantIds.length ; i++){
        foundSeance.absences.push(apprenantIds[i])
        console. log(apprenantIds[i])
    } 
    foundSeance.save()
    res.json({message:"operation completed",foundSeance})
    
    }catch(err){
     res.json({message: err.message})
    }
    
}
module.exports ={
    selectAbsenties,
    
    deleteSeance,
    getOneSeance,
    createSeance,
    getAllSeances}