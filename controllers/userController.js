import User from "../models/userSchema.js";
import Notification from "../models/notificationSchema.js";
import bcrypt from "bcrypt";
import {
    transformationNotification,
    transformationPost,
    transformationUser
} from "../transformationObject.js";
import Follower from "../models/followerSchema.js";
import Post from "../models/postSchema.js";
import fs from "fs";
const salt = 10;

export const signupUser = async (req, res) => {
    const userData = req.body;
    const userEmail = req.body.email;
    try {
        const oldUser = await User.findOne({ email: userEmail });
        if (oldUser) {
            return res.status(404).json({
                status: "fail",
                message: "E-mail already exist",
            });
        }

        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        const newUser = new User({
            ...userData,
            email: userEmail.toLowerCase(),
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
            status: "success",
            data: await transformationUser(newUser),
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "fail",
            message: error.message || "Internal Server Error",
        });
    }
};

export const userLogin = async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try {
        const user = await User.find({ email: userEmail.toLowerCase() });
        if (user.length === 0) {
            return res.status(404).json({ // email not found
                status: "fail",
                message: "Verify your emil or password",
            });
        }
        const isPasswordMatch = await bcrypt.compare(userPassword, user[0]._doc.password);
        if (!isPasswordMatch) {
            return res.status(404).json({ // password incorrect
                status: "fail",
                message: "Verify your email or password",
            });
        }
        res.status(200).json({
            status: "success",
            data: await transformationUser(user[0]._doc),
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const changeImage = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        user.image = user.image ?? "";
        const pathName = user.image.split('/').slice(3).join('/');
        fs.unlink('upload/' + pathName, (err) => {});
        user.image = `${process.env.SERVER_URL}${req.file.path.replace(/\\/g, '/').replace(/^upload\//, '')}`
        await user.save();
        res.status(200).json({
            status:"success",
            data: await transformationUser(user)
        })
    } catch (error) {
        res.status(500).json({
            status:'fail',
            message:error.message,
        })
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            status: "success",
            data: await transformationUser(user)
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const getPostsByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const posts = await Post.find({ userId: userId });
        const allPosts = await Promise.all(
            posts.map(async (post) => {
                return transformationPost(post);
            })
        );
        return res.status(200).json({ status: "success", data: allPosts });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const getFollowersByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const followers = await Follower.find({followerId: userId});
        const allFollowers = await Promise.all(
            followers.map(async (follower) => {
                const user = await User.findById(follower.followingId);
                return await transformationUser(user);
            })
        );
        return res.status(200).json({ status: "success", data: allFollowers });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const getFollowingsByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const followings = await Follower.find({followingId: userId});
        const allFollowings = await Promise.all(
            followings.map(async (follower) => {
                const user = await User.findById(follower.followerId);
                return await transformationUser(user);
            })
        );
        return res.status(200).json({ status: "success", data: allFollowings });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const getNotificationByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const notifications = await Notification.find({receiverId: userId});
        const allNotifications = await Promise.all(
            notifications.map(async (notification) => {
                return transformationNotification(notification);
            })
        );
        return res.status(200).json({ status: "success", data: allNotifications });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;
    try {
        const notification = await Notification.findById(notificationId);
        if(!notification){
            return res.status(404).json({
                status: "fail",
                message: "notification not found",
            })
        }
        await Notification.findByIdAndDelete(notificationId)
        res.status(204).json({ status: "success", data: null })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}