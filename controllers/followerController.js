import Follower from "../models/followerSchema.js";
import {transformationFollower, transformationReact} from "../transformationObject.js";

export const createFollow = async (req, res) => {
    const followerData = req.body;
    try {
        const newFollower = new Follower({
            followerId: followerData.followerId,
            followingId: followerData.followingId
        });
        await newFollower.save();
        res.status(201).json({
            status: 'success',
            data: await transformationFollower(newFollower)
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

// export const getReactsByPostID = async (req,res) => {
//     const postId = req.params.postId;
//     try {
//         const reacts = await React.find({postId: postId});
//         const allReacts = reacts.map(async (react) => await transformationReact(react));
//         res.status(200).json({ status: 'success', data: allReacts });
//     } catch (error) {
//         res.status(500).json({ status: 'fail', message: error.message })
//     }
// };

export const deleteFollow = async (req,res) => {
    const followerId = req.params.followerId;
    const followingId = req.params.followingId;
    try {
        const deletedFollow = await Follower.findOneAndDelete({followerId: followerId, followingId: followingId});
        if (deletedFollow) {
            res.status(204).json({ status: 'success', data: null });
        } else {
            res.status(404).json({ status: 'fail', message: 'Follow not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};