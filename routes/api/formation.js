const express = require("express");
const path = require("path");
const multer = require('multer');

const router = express.Router();
const {
    getFormationDeLangue,
    getFormationPratique,
    getFormationCourDeSoutien,
    afficherAllCourDeSoutien,  
    afficherAllFormationPratique,
    afficherAllFormationDeLangue,
    getAllFormation,
    createFormationPratique,
    createFormationDeLangue,
    createFormationCourDeSoutien,
    deleteFormationPratique,
    deleteFormationDeLangue,
    deleteCourDeSoutien,
    ajouterAppreantFormationPratique,
    ajouterAppreantFormationDeLangue,
    ajouterAppreantCourDeSoutien,
    updateFormationPratique,
    updateFormationDeLangue,
    updateFormationCourDeSoutien
} = require("../../controllers/formationController")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
router.route('/')
    .get(getAllFormation)
    ///// afficher les cours de soutien////
    router.route('/courDeSoutien')
    .get(afficherAllCourDeSoutien)
    router.route('/formationPratique')
    .get(afficherAllFormationPratique)
    router.route('/formationDeLangue')
    .get(afficherAllFormationDeLangue)
///// creer formation /////
router.route('/courDeSoutien')
.post(upload.single('img'),createFormationCourDeSoutien)
router.route('/formationPratique')
    .post(upload.single('img'),createFormationPratique)
router.route("/formationDeLangue")
.post(upload.single('img'),createFormationDeLangue)
///// suprimer opreation ///// 
router.route("/formationPratique/:id")
    .delete(deleteFormationPratique)
    .get(getFormationPratique)
router.route("/formationDeLangue/:id") 
    .delete(deleteFormationDeLangue)
    .get(getFormationDeLangue)
router.route("/courDeSoutien/:id")
    .delete(deleteCourDeSoutien)
    .get(getFormationCourDeSoutien)
/////// update Formation //// 
router.route("/formationPratique/:id")
    .put(updateFormationPratique)
router.route("/formationDeLangue/:id")
    .put(updateFormationDeLangue)
router.route("/formationCourDeSoutien/:id")
    .put(updateFormationCourDeSoutien)
    
///// ajouter apprenant a une formation ////     
router.post("/FormationPratique/:idFormation/:idApprenant",ajouterAppreantFormationPratique)
    
router.route("/courDeSoutien/:idFormation/:idApprenant")
    .post(ajouterAppreantCourDeSoutien)
router.route("/FormationDeLangue/:idFormation/:idApprenant")
    .post(ajouterAppreantFormationDeLangue)
module.exports = router 