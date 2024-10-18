const Conversation = require("../models/Conversation");
const router = require("express").Router();

// new convo
router.post("/", async (req, res) => {
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
    console.log("User ID from req: ", req.params.userId);
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversations);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;