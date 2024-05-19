const { configDotenv } = require("dotenv");
const express = require("express");
const router1 = express.Router();
const path = require('path')
const jwt = require('jsonwebtoken');
const secretKey = "123456"
router1.use(express.json());
router1.use(express.urlencoded({ extended: true }));

const verefyingToken = (req,res,next)=>{
  
    const token = req.headers['authorization'];
    
   

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token.split(' ')[1], "123456", (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.userId;
        next();
    });
}
router1.get('/index(.html)?' ,(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'index.html'));
});
router1.get('/formaticourdesoutienonpage(.html)?' ,(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'formationCourDeSoutien.html'));
});
router1.get('/formateurpagee(.html)?' ,(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'ormateurPage.html'));
});
router1.get('/apprenantinfos(.html)?' ,(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', '.html'));
});
router1.get('/testpage(.html)?' ,(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'testpages.html'));
});
router1.get('/apprenantpage(.html)?',(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'apprenantpage.html'));
});
router1.get('/formateurpage(.html)?',(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'formateurpage.html'));
});
router1.get('/seancespage(.html)?',(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'seancespage.html'));
});
router1.get('/salles(.html)?',(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'salles.html'));
});
router1.get('/sallespage(.html)?',(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'sallespage.html'));
});
 
router1.get('/groups(.html)?',(req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..','views', 'groups.html'));
});

router1.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'new-page.html'));
});
router1.get('/home(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views','home page', 'landingpage.html'));
});
router1.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default
});
module.exports= router1;