import express from 'express';
import {createFollow, deleteFollow} from "../controllers/followerController.js";
const Router = express.Router();

Router.post('/createFollow', createFollow);
Router.delete("/deleteFollow/:followerId/:followingId", deleteFollow)

export default Router;