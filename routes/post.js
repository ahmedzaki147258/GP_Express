import express from "express";
import {createPost, deletePost, getPosts, updatePost} from "../controllers/postController.js";

const Router = express.Router();

Router.post("/createPost", createPost);
Router.get("/getAllPosts", getPosts);
Router.patch("/updatePost/:id", updatePost);
Router.delete("/deletePost/:id", deletePost);

export default Router;