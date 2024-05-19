const express = require("express");
const path = require("path");
const router= express.Router();
const {getTeacher,deleteTeacher,createNewTeacher,getAllTeachers, updateTeacher} = require('../../controllers/teachersController.js')



router.route('/')
       .get(getAllTeachers)
.post(createNewTeacher)
.put(updateTeacher)
.delete(deleteTeacher)
router.route("/:id")
.get(getTeacher) 
.put()

module.exports = router;  