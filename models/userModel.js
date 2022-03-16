const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Products",
        },
    ],
});

const User = new mongoose.model("Users", userSchema);

module.exports = User;
