import Post from "../models/postSchema.js";
import {transformationPost} from "../transformationObject.js";
import ReactCommentSchema from "../models/reactCommentSchema.js";
import Comment from "../models/commentSchema.js";
import ReactComment from "../models/reactCommentSchema.js";
import React from "../models/reactSchema.js";
import Notification from "../models/notificationSchema.js";

export const createPost = async (req, res) => {
    const postData = req.body;
    try {
        const newPost = new Post({
            userId: postData.userId,
            body: postData.body,
        });
        await newPost.save();
        res.status(201).json({
            status: 'success',
            data: await transformationPost(newPost)
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getPosts = async (req,res) => {
    try {
        const posts = await Post.find();
        const allPosts = await Promise.all(
            posts.map(async (post) => {
                return transformationPost(post);
            })
        );
        res.status(200).json({ status: 'success', data: allPosts });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message })
    }
};

export const updatePost = async (req,res) => {
    const postId = req.params.id;
    const postData = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, postData, { new: true });
        if (updatedPost) {
            res.status(200).json({ status: 'success', data: await transformationPost(updatedPost) });
        } else {
            res.status(404).json({ status: 'fail', message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

export const deletePost = async (req,res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if(!post){
            return  res.status(404).json({ status: 'fail', message: 'Post not found' });
        }
        await React.deleteMany({ postId: postId });
        await Comment.deleteMany({ postId: postId });
        await ReactComment.deleteMany({ postId: postId });
        await Notification.deleteMany({ postId: postId });
        await Post.findByIdAndDelete(postId);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};