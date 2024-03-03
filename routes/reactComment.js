import express from 'express';
import {createReactComment, deleteReactComment, getReactsByCommentID} from "../controllers/reactCommentController.js";
const Router = express.Router();

Router.post('/createReactComment', createReactComment);
Router.get("/getReactsByCommentID/:commentId", getReactsByCommentID);
Router.delete("/deleteReactComment/:userId/:commentId", deleteReactComment);

export default Router;