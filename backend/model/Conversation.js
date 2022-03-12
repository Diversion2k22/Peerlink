const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        members:[{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Message"
        },
        groupAdmin: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }
    },
    {timestamps: true}
);

Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;