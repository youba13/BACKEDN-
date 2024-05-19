const express = require("express")
const router = express.Router() 
const classSchema = require("../../schemas/schemas")
const {createClass,classDeletePupil , getClass,getAllClasses,classAddPupil} = require("../../controllers/classControllers")

router.route("/")
      .post(createClass)
      .get(getAllClasses)
router.route("/:className")
      .get(getClass)
router.route("/:className/:pupil")
       .post(classAddPupil)    
       .delete(classDeletePupil)    
module.exports = router  