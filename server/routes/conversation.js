const Conversation = require("../models/Conversation");
const router = require("express").Router();

// new convo
router.post("/", async (req, res) => {
    // check if the conversation exists already 
    const existingConversation = await Conversation.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId]}
    });

    if(existingConversation) return res.status(204).json(existingConversation);

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch(err) {
        res.status(500).json(err);
    }
})

// get all convos of a user 
router.get("/:userId", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId]}
        }).sort({ updatedAt: -1 });
        res.status(200).json(conversations);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;