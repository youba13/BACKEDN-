const { MessageModel } = require("../model/message")

const recievemessage = async (req,res)=>{
    const messageobj= req.body 
    if(!messageobj.email|| !messageobj.sujet || !messageobj.message) return res.sendStatus(404)
    console.log(messageobj)
  
    const messageInstance = new MessageModel(messageobj)
    messageInstance.save()
    .then(()=>{
    console.log(messageInstance)
        return res.json({message: " message was sent"})
    }) 
    .catch((err)=>{
        return res.json("Error")
    }) 
}
const deleteMessage = async (req,res)=>{
    try{
    const messageid = req.params.id
    const result = await MessageModel.findById(messageid)
    if(!result) return res.status(404).json({message : "message was not found"})
    const deletedmessage = await MessageModel.findByIdAndDelete(messageid)
res.json({message: "message was deleted"})
    }catch(err){
        res.json({message: err})
    }
}
const getAllmesages = async (req,res)=>{
   try{

    const allMessages = await MessageModel.find()
    res.json(allMessages) 
   }catch(err){
    return res.json({message : err.message})
   }
}

module.exports = {deleteMessage,recievemessage,getAllmesages}