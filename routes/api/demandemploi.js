const express = require("express")
const multer = require('multer');
const path = require('path');
const router = express.Router()
const {handleDemandeEmploi,getDemandesEmploi} = require("../../controllers/demandEmploiController")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
router.post('/', upload.single('cv'), handleDemandeEmploi);
router.route('/')
    .get(getDemandesEmploi  )

module.exports =router
