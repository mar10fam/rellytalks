const User = require("../models/User");
const router = require("express").Router();

// get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        // excluding password and updatedAt from the response
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err)
    }
})

// get all users 
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, {password: 0, updatedAt: 0});
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
})

// update pfp of user
router.put("/:id/pfp", async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: {pfp: req.body.pfp } },
                { new: true }
            )
            const {password, updatedAt, ...other} = user._doc;
            res.status(200).json({ message: "Profile picture has been updated", updatedUser: other });
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only update your own profile");
    }
})

module.exports = router