const express = require("express");
const path = require("path");
const router = express.Router();
const { getPaiementFormateur,supprimerPaimenetFormateur,createFormateur, afficherInfoFormateur, deleteFormateur, updateFormateur, ajouterPaiementFormateur, getAllFormateurs } = require("../../controllers/formateurController")
router.route('/')
    .post(createFormateur)
    .get(getAllFormateurs)

router.route("/:id")
    .delete(deleteFormateur)
    .patch(updateFormateur)
    .get(afficherInfoFormateur)
router.route("/paiements/:id")  
.get(getPaiementFormateur)
router.route("/ajouterpaiementformateur/:id")
    .post(ajouterPaiementFormateur)
    router.route("/paiementformateur/:idpaiement/:idformateur")
    .delete(supprimerPaimenetFormateur)
///// get appreant by his nom //// 
router.route("/afficherFormateur/:id")
    .get(afficherInfoFormateur)
module.exports = router;