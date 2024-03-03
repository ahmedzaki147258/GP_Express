import React from "../models/reactSchema.js";
import {transformationPost, transformationReact} from "../transformationObject.js";

export const createReact = async (req, res) => {
    const reactData = req.body;
    try {
        const newReact = new React({
            userId: reactData.userId,
            postId: reactData.postId
        });
        await newReact.save();
        res.status(201).json({
            status: 'success',
            data: await transformationReact(newReact)
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getReactsByPostID = async (req,res) => {
    const postId = req.params.postId;
    try {
        const reacts = await React.find({postId: postId});
        const allReacts = await Promise.all(
            reacts.map(async (react) => {
                return transformationReact(react);
            })
        );
        res.status(200).json({ status: 'success', data: allReacts });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message })
    }
};

export const deleteReact = async (req,res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    try {
        const deletedReact = await React.findOneAndDelete({userId: userId, postId: postId });
        if (deletedReact) {
            res.status(204).json({ status: 'success', data: null });
        } else {
            res.status(404).json({ status: 'fail', message: 'React not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};