import express from "express";
import multer from "multer";

import {
    changeImage,
    deleteNotification,
    getFollowersByUserId, getFollowingsByUserId, getNotificationByUserId, getPostsByUserId,
    getUserById, signupUser, updateUser, userLogin
} from "../controllers/userController.js";
import {storage} from "../transformationObject.js";


const Router = express.Router();
const uploadUser = multer({ storage: storage('user') });

Router.post("/signup", signupUser);
Router.post("/login", userLogin);
Router.patch("/updateUser/:id", updateUser);
Router.patch("/changeImage/:id", uploadUser.single("image"), changeImage);
Router.get("/getUserById/:id", getUserById);
Router.get("/getPostsByUserId/:id", getPostsByUserId);
Router.get("/getFollowersByUserId/:id", getFollowersByUserId);
Router.get("/getFollowingsByUserId/:id", getFollowingsByUserId);
Router.get("/getNotificationByUserId/:id", getNotificationByUserId);
Router.delete("/deleteNotification/:id", deleteNotification);

export default Router;