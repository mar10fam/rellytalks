const Message = require("../models/Message");
const router = require("express").Router();

// add message
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch(err) {
        res.status(500).json(err);
    }
})

// get message 

module.exports = router;