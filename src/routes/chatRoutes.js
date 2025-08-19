const express = require('express')
const { startConversation } = require('../controllers/convoController')
const { getMessages } = require('../controllers/chatController')
const router = express.Router()

router.post("/convo",startConversation)
router.get("/chats/:conversationId",getMessages)

module.exports = router