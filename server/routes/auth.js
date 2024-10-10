const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register 
router.post("/register", async (req, res) => {
    try {
        // check for existing users 
        const existingUser = await User.findOne({
            $or: [ { username: req.body.username }, { email: req.body.email } ]
        });

        if(existingUser) {
            let usernameTaken = (existingUser.username === req.body.username);
            let emailTaken = (existingUser.email === req.body.email);
            if(usernameTaken && emailTaken) {
                return res.status(400).json("Both username and email are taken");
            } else if(emailTaken) {
                return res.status(400).json("Email is taken");
            } else {
                return res.status(400).json("Username is taken");
            }
        }

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
        const { password, ...other } = user._doc;
        return res.status(200).json(other);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(404).send("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Incorrect password");

        // create jwt
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d'
        });

        // set token in http-only cookie
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day in ms
        })

        // excluding password from the response;
        const { password, ...other } = user._doc;
        return res.status(200).json(other);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// check authentication
router.get("/check", (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Not authenticated");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return res.status(200).json(verified);
    } catch (err) {
        return res.status(403).json("Token is invalid");
    }
});

// logout
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });
    return res.status(200).send("Logged out");
});

module.exports = router