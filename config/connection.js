const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/E-commerce", {
    useNewUrlParser: true,
    useUniFiedTopology: true,
});

connection
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log("Error");
    });

module.exports = connection;
