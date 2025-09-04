const express = require("express");
const userController = require("../Controller/user.controller");

const UserRouter = express.Router();

UserRouter.get("/test", userController.test);
UserRouter.post("/register", userController.register);
UserRouter.post("/signIn", userController.signIn);

module.exports = UserRouter;
