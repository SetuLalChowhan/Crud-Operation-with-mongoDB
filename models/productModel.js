const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    },
});

const Product = new mongoose.model("Products", productSchema);
//own instance method
// userSchema.methods = {
//     findActive: function () {
//         return User.findOne({status: "active"});
//     },
// };

module.exports = Product;
