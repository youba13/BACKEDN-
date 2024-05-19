const express = require("express");
const path = require("path");
const router = express.Router();
const { updateAdmin,getAllAdmins,getOneAdmin,deleteAdmin,createAdmin } = require("../../controllers/adminController")
router.route('/')
    .post(createAdmin)
    .get(getAllAdmins)

router.route("/:id")
.delete(deleteAdmin)
.put(updateAdmin)
.get(getOneAdmin)

module.exports = router;