const User = require("../models/User");
const router = require("express").Router();

// update user
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            try {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            } catch(err) {
                res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).send("Account has been updated");
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only update your account");
    }
})

// delete user
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete({_id: req.params.id});
            res.status(200).send("Account has been deleted");
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only delete your account");
    }
})

// get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        //excluding password and updatedAt from the response
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

module.exports = router