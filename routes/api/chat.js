const express = require('express');
const router = express.Router();
const multer = require('multer');
const ChatMessageModel = require('../../model/chatmessage');
const FileModel = require('../../model/file');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST message
router.post('/message', async (req, res) => {
    const { sender, content, group } = req.body;
    const message = new ChatMessageModel({ sender, content, group });
    try {
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get('/:group', async (req, res) => {
    try {
        const messages = await ChatMessageModel.find({ group: req.params.group }).sort('timestamp');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// POST file
router.post('/uploads', upload.single('file'), async (req, res) => {
    const { uploader,sender, group,titre,description } = req.body;
    const file = new FileModel({
        uploader,
        group,
        sender,
        titre,
        description,
        file_path: req.file.path 
    });
    console.log(file)
    try {
        await file.save();
        res.status(201).send(file); 
    } catch (error) {
        res.status(400).send(error);  
        console.log(error)
    }
});
router.get("/uploads/:id",async (req,res)=>{
    try{
        const group = req.params.id
        const files= await FileModel.find({group : group})
        res.json(files)
    }catch(err){
        res.json({message :err}) 
    }
})
module.exports = router;