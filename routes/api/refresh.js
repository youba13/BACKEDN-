const express = require("express")
const router = express.Router()

const handlerefreshToken = require("../../controllers/refreshToken")
router.get("/" ,handlerefreshToken)
module.exports = router