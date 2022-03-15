const express = require('express');
const router = express.Router();
const { sendMessage, allMessages } = require('../controllers/messageControllers');

//=====Routes=====

router.route("/:userId").post(sendMessage);
router.route("/:chatId").get(allMessages);

module.exports = router;