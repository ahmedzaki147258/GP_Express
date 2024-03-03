import ReactComment from "../models/reactCommentSchema.js";
import {transformationPost, transformationReact, transformationReactComment} from "../transformationObject.js";
import Post from "../models/postSchema.js";
import Comment from "../models/commentSchema.js";

export const createReactComment = async (req, res) => {
    const reactCommentData = req.body;
    const commentId = reactCommentData.commentId;

    try {
        const comment = await Comment.findById(commentId)
        const newReactComment = new ReactComment({
            userId: reactCommentData.userId,
            commentId: commentId,
            postId: comment.postId
        });
        await newReactComment.save();
        res.status(201).json({
            status: 'success',
            data: await transformationReactComment(newReactComment)
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getReactsByCommentID = async (req,res) => {
    const commentId = req.params.commentId;
    try {
        const reactComments = await ReactComment.find({commentId: commentId});
        const allReactComments = await Promise.all(
            reactComments.map(async (reactComment) => {
                return transformationReactComment(reactComment);
            })
        );
        res.status(200).json({ status: 'success', data: allReactComments });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message })
    }
};

export const deleteReactComment = async (req,res) => {
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    try {
        const deletedReactComment = await ReactComment.findOneAndDelete({userId: userId, commentId: commentId});
        if (deletedReactComment) {
            res.status(204).json({ status: 'success', data: null });
        } else {
            res.status(404).json({ status: 'fail', message: 'ReactComment not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};