const asyncHandler = require("express-async-handler");
const Conversation = require("../model/Conversation");
const Message = require("../model/Message");
const User = require("../model/schema");

//Create New Message
//POST /api/Message/:userId
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.params.userId,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "username pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.members",
        select: "username pic email",
      });
  
      await Conversation.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });


//Get all Messages
//GET /api/Message/:chatId
const allMessages = asyncHandler(async(req, res)=>{
  try{
    const message = await Message.find({chat: req.params.chatId})
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("sender", "username pic email")
      .populate("chat");
      res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages }