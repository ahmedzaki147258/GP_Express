import Comment from "../models/commentSchema.js";
import {transformationComment, transformationPost} from "../transformationObject.js";

export const createComment = async (req, res) => {
    const commentData = req.body;
    try {
        const newComment = new Comment({
            userId: commentData.userId,
            postId: commentData.postId,
            comment: commentData.comment,
        });
        await newComment.save();
        res.status(201).json({
            status: 'success',
            data: await transformationComment(newComment)
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getCommentsByPostID = async (req,res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({postId: postId});
        const allComments = await Promise.all(
            comments.map(async (comment) => {
                return transformationComment(comment);
            })
        );
        res.status(200).json({ status: 'success', data: allComments });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message })
    }
};

export const updateComment = async (req,res) => {
    const commentId = req.params.id;
    const commentData = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, commentData, { new: true });
        if (updatedComment) {
            res.status(200).json({ status: 'success', data: await transformationComment(updatedComment) });
        } else {
            res.status(404).json({ status: 'fail', message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

export const deleteComment = async (req,res) => {
    const commentId = req.params.id;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (deletedComment) {
            res.status(204).json({ status: 'success', data: null });
        } else {
            res.status(404).json({ status: 'fail', message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};