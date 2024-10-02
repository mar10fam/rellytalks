const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register 
router.post("/register", async (req, res) => {
    try {
        // encrypt the password 
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // generate the new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // save the user 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(404).send("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Incorrect password");

        // excluding password from the response;
        const { password, ...other } = user._doc;
        return res.status(200).json(other);
    } catch(err) {
        return res.status(500).json(err);
    }

})

module.exports = router