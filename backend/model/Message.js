const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: {
            type: String,
            trim: true
        },
        chat:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation"
        },
        readBy:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {timestamps: true}
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;