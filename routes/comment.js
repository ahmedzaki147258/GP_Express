import express from 'express';
import {createComment, deleteComment, getCommentsByPostID, updateComment} from "../controllers/commentController.js";
const Router = express.Router();

Router.post("/createComment", createComment);
Router.get("/getCommentsByPostID/:postId", getCommentsByPostID);
Router.patch("/updateComment/:id", updateComment);
Router.delete("/deleteComment/:id", deleteComment);

export default Router;