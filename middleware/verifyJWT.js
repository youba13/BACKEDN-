const path = require('path')
require("dotenv").config()
const jwt = require("jsonwebtoken")
const verifyJWT =( req,res,next)=>{
 const authHeader = req.headers["authorization" || "Authorization"]
 
 if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({message :"no jwt"})
 
const token = authHeader.split(' ')[1]    
jwt.verify(
    token,
    process.env.SECRET_KEY,
    (err,decoded)=>{
        console.log(decoded)
        if(err) return res.sendStatus(403)
        req.userInfo = req.userInfo || {};
        req.userInfo.email = decoded.userInfo.email;
        req.userInfo._id = decoded.userInfo._id
        req.userInfo.role  = decoded.userInfo.role
    next()
    }
)

}
module.exports = verifyJWT