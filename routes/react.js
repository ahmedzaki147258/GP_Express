import express from 'express';
import {createReact, deleteReact, getReactsByPostID} from "../controllers/reactController.js";
const Router = express.Router();

Router.post("/createReact", createReact);
Router.get("/getReactsByPostID/:postId", getReactsByPostID)
Router.delete("/deleteReact/:userId/:postId", deleteReact)

export default Router;