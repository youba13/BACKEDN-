const express = require("express")
const router = express.Router()
const {
    selectAbsenties,
    
    deleteSeance,
    getOneSeance,
    createSeance,
    getAllSeances } = require("../../controllers/seance")
router.route("/")
    .get(getAllSeances)
    .post(createSeance )

router.route('/:id')
    .delete(deleteSeance)
    .get(getOneSeance)
     router.route('/:id/:ids')
    .post(selectAbsenties)

module.exports = router