import express from "express";
import {
    deleteNotification,
    getFollowersByUserId, getFollowingsByUserId, getNotificationByUserId, getPostsByUserId,
    getUserById, signupUser, userLogin
} from "../controllers/userController.js";
const Router = express.Router();

Router.post("/signup", signupUser);
Router.post("/login", userLogin);
Router.get("/getUserById/:id", getUserById);
Router.get("/getPostsByUserId/:id", getPostsByUserId);
Router.get("/getFollowersByUserId/:id", getFollowersByUserId);
Router.get("/getFollowingsByUserId/:id", getFollowingsByUserId);
Router.get("/getNotificationByUserId/:id", getNotificationByUserId);
Router.delete("/deleteNotification/:id", deleteNotification);

export default Router;