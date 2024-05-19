const express = require("express")
const fsPromises = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt")
const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (users) { this.users = users }
}



const handleRegistration = async (req, res) => {
    const { userName, password } = req.body
    console.log(req.body)
    if (!userName || !password) res.status(400).json({ "message": "username and password are reuquired" })
    const duplicate = usersDB.users.find((user) => user.userName == userName)
    if (duplicate) return res.sendStatus(409)
    try {
        const hashedpassword = await bcrypt.hash(password, 10)

        const newUser = {
            "userName": userName,
            "roles": {
                "user": 2001
            },
            "password": hashedpassword
        }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            "\n" + JSON.stringify(usersDB.users))

        res.status(201).json({ "message": "user was created" })

    }
    catch (err) {

        res.status(500).json({ "message": err.message })
    }
}

module.exports = handleRegistration;