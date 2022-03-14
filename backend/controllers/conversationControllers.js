const asyncHandler = require("express-async-handler");
const Conversation = require("../model/Conversation");
const User = require("../model/schema");


//access or create one on one chat
//POST /api/conversation/:userId
const accessChat = asyncHandler(async (req, res)=>{
    const { userID } = req.body;

    if(!userID){
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Conversation.find({
        isGroupChat: false,
        $and: [
            { members: { $elemMatch: { $eq: req.params.userId } } },
            { members: { $elemMatch: { $eq: userID } } }
        ]
    }).populate("members", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            members: [req.params.userId, userID]
        };

        try {
            const createdChat = await Conversation.create(chatData);

            const FullChat = await Conversation.findOne({ 
                _id: createdChat._id 
            }).populate("members", "-password");

            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});


//Fetch all chats for a user
//GET /api/conversation/:userId
const fetchChats = asyncHandler(async (req, res) => {
    try {
      Conversation.find({ members: { $elemMatch: { $eq: req.params.userId } } })
        .populate("members", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

//Create New Group Chat
//POST /api/conversation/group/:userId
const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.members || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
  
    var users = JSON.parse(req.body.members);
  
    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }
  
    users.push(req.params.userId);
  
    try {
      const groupChat = await Conversation.create({
        chatName: req.body.name,
        members: users,
        isGroupChat: true,
        groupAdmin: req.params.userId,
      });
  
      const fullGroupChat = await Conversation.findOne({ _id: groupChat._id })
        .populate("members", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });


// Rename Group
// PUT /api/conversation/rename
const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await Conversation.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  });


// Add user to Group
// PUT /api/chat/groupadd
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Conversation.findByIdAndUpdate(
      chatId,
      {
        $push: { members: userId },
      },
      {
        new: true,
      }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });


// Remove user from Group
// PUT /api/conversation/groupremove
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Conversation.findByIdAndUpdate(
      chatId,
      {
        $pull: { members: userId },
      },
      {
        new: true,
      }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });


module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };