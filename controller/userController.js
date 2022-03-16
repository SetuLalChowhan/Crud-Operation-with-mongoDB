const path = require("path");
const bcrypt = require("bcryptjs");
const User = require(path.join(process.cwd(), "models/userModel"));

const jwt = require("jsonwebtoken");
async function getAllUser(req, res) {
    try {
        const users = await User.find().populate("products");
        res.status(200).json({
            data: users,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function signUp(req, res) {
    try {
        const {username, email, password} = req.body;
        const userEmail = await User.findOne({email});
        const userName = await User.findOne({username});
        if (userName) return res.status(404).send("User already SignUp with this username");
        if (userEmail) return res.status(404).send("User already SignUp with this email");

        const hasedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hasedPassword,
        });

        await newUser.save();

        res.status(201).send("Sign up Completed");
    } catch (err) {
        console, console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(401).send("Authetication failed");
        const checkpassword = await bcrypt.compare(password, user.password);
        if (!checkpassword) return res.status(401).send("authentication failed");

        const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_TOKEN, {expiresIn: "1h"});

        res.status(201).json({
            "access-token": token,
            messgae: "login Successfull",
        });
    } catch (err) {
        console.log(err);
        res.status(401).send("Login failed");
    }
}

module.exports = {
    signUp,
    login,
    getAllUser,
};
