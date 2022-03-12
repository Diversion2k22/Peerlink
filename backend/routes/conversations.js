const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/conversationControllers');
const router = express.Router();

//=====Routes=====

router.route("/:userId").post(accessChat);
router.route("/:userId").get(fetchChats);
router.route("/group/:userId").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);


module.exports = router;