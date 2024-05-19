const express = require('express');
 
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;  
const passport = require('passport');
const hoempage = require("./routes/subdir")
const bodyParser = require('body-parser');
const verifyToken =require('./middleware/verifyJWT')
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express();   
const socketIo = require('socket.io'); 
const http = require('http'); 
const { Server } = require("socket.io");  
const ChatMessageModel = require('./model/chatmessage');    
 
const server = http.createServer(app);
const io = new Server(server,{ 
    cors: {
        origin: "*",  // Allow all origins or specify like "http://localhost:3000"
        methods: ["GET", "POST"],
        credentials: true
    }
}); 
app.use(cors());  
app.use(passport.initialize());
mongoose.connect(process.env.MONGOOSE_URL)
.then((result)=>{ 
   console.log("db is connected")
})    
.catch((err)=>{ 
   console.log('db is not connected')})
 
     
 

// custom middleware logger
app.use(logger); 

// Cross Origin Resource Sharing
/**const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}*/
//app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data 
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));
 
// built-in middleware for json 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())  
// Parse application/json
app.use(bodyParser.json());
//serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));

 


// Route handlers

app.use("/", require("./routes/root"))
app.use("/subdir", hoempage)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//app.use("/registration", require("./routes/api/registration"))
//app.use("/auth", require("./routes/api/auth"))
//app.use("/refresh", require("./routes/api/refresh"))
//app.use("/logOut", require("./routes/api/logOut"))
//app.use(verifyToken)

//app.use("/teacher", require("./routes/api/teachers"))
//app.use("/classes", require("./routes/api/classes"))
//app.use("/saisson", require("./routes/api/saisson"))

app.use("/apprenant", require("./routes/api/apprenant"))
app.use("/formateur", require("./routes/api/formateur")) 
app.use("/admin", require("./routes/api/admin")) 
app.use("/formation", require("./routes/api/formation"))
app.use("/group", require("./routes/api/group"))
app.use("/salle", require("./routes/api/salle"))
app.use("/seance", require("./routes/api/seance"))
app.use("/demmande", require("./routes/api/demandemploi")) 
app.use("/inscriptions",require('./routes/api/inscription'))    
app.use("/auth",require('./routes/api/auth'))  
app.use("/message",require('./routes/api/message')) 
app.use('/chatmessages', require('./routes/api/chat')); 
app.use('/events', require('./routes/api/events')); 
app.use('/send-email' ,require("./routes/api/sendemail"))
    

 

app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('joinRoom', (group) => { 
        socket.join(group);
        console.log(`User joined room: ${group.nom}`);
    });

    socket.on('chatMessage', ({ group, sender, message }) => {
        const msg = new ChatMessageModel({ group, sender, content: message });
        msg.save().then(savedMessage => {
            io.to(group).emit('message', savedMessage);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    }); 
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});