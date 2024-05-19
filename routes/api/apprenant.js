const express = require("express");
const path = require("path");
const router = express.Router();
const verifyToken = require("../../middleware/verifyJWT")
const isAdmin = require("../../middleware/isAdmin")
const {getPaiementsApprenant,getOneApprenants, createApprenant, afficherInfoApprenant, deleteApprenant, updateApprenant, ajouterPaiementApprenant,supprimerPaimenetApprenant ,getAllApprenants, registerApprenant } = require("../../controllers/apprenantController")
router.route('/')
    .post(createApprenant)
    .get(getAllApprenants)
router.route('/register')
.post(registerApprenant)
router.route("/:id")
    .delete(deleteApprenant)
    .patch(updateApprenant)
    .get(afficherInfoApprenant)
    .get(getOneApprenants)
router.route("/paiementapprenant/:id")
    .post(ajouterPaiementApprenant)
    
router.route("/paiements/:id")  
.get(getPaiementsApprenant)
    
 router.route("/paiementapprenant/:idpaiement/:idapprenant")
    .delete(supprimerPaimenetApprenant)
    

///// get appreant by his nom //// 
router.route("/afficherapprenant/:id")
    .get(afficherInfoApprenant)
module.exports = router;