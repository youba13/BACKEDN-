const express = require("express")

const fsPromises = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require('dotenv').config()
const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (users) { this.users = users }
}
const handleLogOut = async (req, res) => {
    console.log("hello")
    const cookies = req.cookies
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    if (!cookies?.jwt) res.sendStatus(204)
    const foundUser = usersDB.users.find((user) => user.refreshToken === refreshToken)

    if (!foundUser){
        res.clearCookie('jwt',{httpOnly : true})
        return res.sendStatus(204)
    }
    //delete the refresh token from db
    const otherUsers = usersDB.users.filter((person)=> person.refreshToken !== foundUser.refreshToken)
    const currentUser ={...foundUser,refreshToken :' '}
    usersDB.setUsers([...otherUsers,currentUser])
    await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(usersDB.users)),
    
    res.clearCookie("jwt" ,{httpOnlu :true})
    res.sendStatus(201)
    

}

module.exports = handleLogOut