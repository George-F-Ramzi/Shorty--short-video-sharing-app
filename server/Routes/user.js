const express = require("express");
const userController = require("../Controllers/userController");
const auth = require("../Middlewears/auth");

const Router = express.Router();

Router.route("/login").post(userController.Login);
Router.route("/register").post(userController.Register);
Router.route("/allow").get(auth, userController.AllowJoin);

module.exports = Router;
