const mongoose = require("mongoose")
const bcrypt =require("bcrypt")
const path = require("path")
const { AdminModel } = require("../model/admin")
const { UserModel } = require("../model/user")

const getAllAdmins = async (req,res)=>{
    try{
    const allAdmins = await AdminModel.find()
    res.json(allAdmins)
    }catch(err){
        res.json({message: err})
    }
}
const getOneAdmin = async(req,res)=>{
    try{
     const id = req.params.id
     const result = await AdminModel.findById(id)
     if(!result) return res.status(404).json({messaeg : "admin was not found"})
     result.password = ''
     res.json(result)
    }catch(err){
        res.json({message :err})
    }
}

const createAdmin = async (req,res)=>{
    const data = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    data.password = hashedPass
    const adminInstance = new AdminModel(data)
    const user =new UserModel({email:data.email ,password :hashedPass,role:"admin"})
    user._id=adminInstance._id
    user.save()
    adminInstance.save()
        .then(() => {
            return res.json({ message: "Admin a ete cree avec succee" })
        }).catch((err) => {
            return res.json({ message: err.message })
        })
}
const updateAdmin = async (req,res)=>{
    const data = req.body
    const id = req.params.id
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    data.password = hashedPass
    const adminInstance = await AdminModel.findByIdAndUpdate(id,data)
    const user = await UserModel.findByIdAndUpdate(id,{email:data.email ,password :hashedPass,role:"admin"})
    res.json({message :"Admin was updated"})
}
const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAdmin = await AdminModel.findByIdAndDelete(id);
        UserModel.findByIdAndDelete(deletedAdmin._id)
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully", deletedAdmin });
    } catch (error) {
        res.json({ message: "Internal server error" });
    }
};

module.exports = {updateAdmin,getAllAdmins,getOneAdmin,deleteAdmin , createAdmin}