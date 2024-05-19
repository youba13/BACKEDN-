const express = require("express")
const router = express.Router()

const handleRegistration = require("../../controllers/registController")
router.post("/" ,handleRegistration)
module.exports = router