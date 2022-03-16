const express = require("express");
const path = require("path");
const router = express.Router();
const userController = require(path.join(process.cwd(), "controller/userController"));

router.get("/api/users", userController.getAllUser);
router.post("/api/signup", userController.signUp);
router.post("/api/login", userController.login);

module.exports = router;
