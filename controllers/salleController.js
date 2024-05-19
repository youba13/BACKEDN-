const {SalleModel} = require("../model/salle")
const getAllSalle = async (req,res)=>{
    try {
        const allSalles = await SalleModel.find();
        res.json(allSalles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getOneSalle  = async (req,res)=>{
    const id = req.params.id
    try {
        const salle = await SalleModel.findOne({_id :id});
        res.json(salle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createSalle = async (req,res)=>{
    const data = req.body;
   
        const isExist = await SalleModel.findOne({ nom: req.body.nom });
        if (isExist) {
            return res.status(409).json({ message: "La salle existe déjà" });
        }
        const salleInstance = new SalleModel(data);
        await salleInstance.save()
        .then(()=>{res.json({ message: 'Operation completed' });})
        .catch((err)=>{
            res.sendStatus(500).json({message:err.message})
        })    
    
}
const deleteSalle = async (req,res)=>{
    const id = req.params.id
   await SalleModel.findByIdAndDelete(id)
   .then(()=>{
    res.json({message:"operation completed"})
   })
   .catch((err)=>{
    res.json({message : err})
   })

}
const updateSalle = async (req,res)=>{
       const  id = req.params.id
       const data = req.body
       
       await SalleModel.findByIdAndUpdate(id,data)
       .then(()=>{
        res.json({message: "operation is completed"})
       })
       .catch((err)=>{
        res.json({message : err.message})
       })
}
module.exports ={getOneSalle,getAllSalle,updateSalle,deleteSalle,createSalle}