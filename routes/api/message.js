const express = require("express")
const router = express.Router() 
const {deleteMessage, recievemessage,getAllmesages} = require("../../controllers/messagesController")
router.route("/")
      .post(recievemessage)
      .get(getAllmesages)

router.route('/:id')
      .delete(deleteMessage)  
 
      module.exports = router    