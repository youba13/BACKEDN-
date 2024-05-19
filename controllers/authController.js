const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user")
const { ApprenantModel } = require("../model/apprenant")
const { FormateurModel } = require("../model/formateur")
const { AdminModel } = require("../model/admin")
require("dotenv").config()


const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'all fileds are required' })
    }
    const foundUser = await UserModel.findOne({ email }).exec()
    if (!foundUser) return res.status(401).json({ message: 'Unauthorized email was not found' })
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorized wrong password' })
    foundUser.password = null
    const token = jwt.sign(
    {
        "userInfo" :{
            "email" :foundUser.email,
            "_id" : foundUser._id,
            "role" :foundUser.role
        }
       
    },
    process.env.SECRET_KEY,
    {expiresIn  :'1d'}
    )
    const refreshToken = jwt.sign(
        { "userInfo" :{
            "_id" : foundUser._id,
            "email":foundUser.email,
            "role" :foundUser.role
             
        } },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn  :'1d'}
        )

        res.cookie("token",token,{
            httpOnly:true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        if(foundUser.role === "apprenant"){
            const userdata = await ApprenantModel.findById(foundUser._id)
            if(userdata){
                userdata.password = 0
                res.json({user: userdata,token})
            }else{
               return res.sendStatus(404)
            }
           
        }else if(foundUser.role === "formateur"){
            const userdata = await FormateurModel.findById(foundUser._id)
            if(userdata){
                userdata.password = 0
                res.json({user: userdata,token})
            }else{
                return res.sendStatus(404)
            }
        } 
        else if(foundUser.role === "admin"){
            const userdata = await AdminModel.findById(foundUser._id)
            if(userdata){
                userdata.password = 0
                res.json({user: userdata,token})
            }else{
                return res.sendStatus(404)
            }
        } 
   
}
const refresh = async (req, res) => { 
    const cookies =req.cookies
    if(!cookies?.jwt) return res.status(401).json({message:'unauthorized no cookie'})
    const refreshToken = cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded)=>{
            if(err) return res.status(403).json({message:  "forbidden"})
            
            const foundUser = await UserModel.findOne({email: decoded.userInfo.email})
            if(!foundUser) return res.status(401).json({message:'unauthorized'})
            const accessToken = jwt.sign(
                {
                    "userInfo" :{
                        "email" :foundUser.email,
                        "_id" : foundUser._id,
                        "role" :foundUser.role
                    }
                   
                },
                process.env.SECRET_KEY,
                {expiresIn  :"60s"}
                )
                res.json({accessToken})
        }
    )
}
const logout = async (req, res) => {
     const cookies = req.cookies
     if(!cookies?.jwt) return res.sendStatus(204)
     res.clearCookie("jwt",{
    httpOnly :true,
    sameSite: 'none',
    secure: true
    })
    res.json({message : "Cookie cleared"})
}
module.exports = { login, refresh, logout }