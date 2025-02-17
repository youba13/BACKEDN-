const express = require("express")
const router = express.Router() 
const {getOneGroup,getGroupsByIds, getAllGroups,createGroup, deleteGroup, ajouterApprenantGroup, updateGroup ,deleteApprenantGroup} = require("../../controllers/groupsController")
router.route('/')
    .post(createGroup)
    .get(getAllGroups)
router.route("/:id")
    .delete(deleteGroup)

router.route("/:id")
    .put(updateGroup)
    .get(getOneGroup)
router.route("/:id")
    .get(getGroupsByIds)
router.route("/:idGroup/:idApprenant")
    .post(ajouterApprenantGroup)
router.route("/:idGroup/:idApprenant")
    .delete(deleteApprenantGroup)
module.exports = router 