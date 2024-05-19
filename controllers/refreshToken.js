const express = require("express")

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require('dotenv').config()
const usersDB = { 
    users: require("../model/users.json"),
    setUsers: function (users) { this.users = users }
}         
const handlerefreshToken = (req, res) => {

    const cookies = req.cookies
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    if (!cookies?.jwt) res.sendStatus(401)
    const foundUser = usersDB.users.find((user) => user.refreshToken === refreshToken)

    if (!foundUser) return res.sendStatus(403)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.userName !== decoded.userName) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "userinfo": {
                        'userName': decoded.userName,
                        "roles": roles
                    }
                },
                   process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({ accessToken })
        }

    )




}

module.exports = handlerefreshToken