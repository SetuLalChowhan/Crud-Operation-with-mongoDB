const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;

const productRouter = require(path.join(process.cwd(), "router/productRouter"));
const userRouter = require(path.join(process.cwd(), "router/userRouter"));
const Database = require(path.join(process.cwd(), "config/connection"));

dotenv.config();

app.use(express.json());
app.use(productRouter);
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
