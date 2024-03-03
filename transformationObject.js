import Notification from "./models/notificationSchema.js";

export const transformationUser = async (user) => {
    const numOfNotification = await Notification.find({receiverId: user._id, state: 'unseen'}).count();
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image ?? "",
        numOfNotification: numOfNotification
    };
};

export const transformationPost = async (post) => {
    return {
        _id: post._id,
        userId: post.userId,
        body: post.body,
        dateTime: post.dateTime,
    };
}

export const transformationComment = async (comment) => {
    return {
        _id: comment._id,
        userId: comment.userId,
        postId: comment.postId,
        comment: comment.comment,
        dateTime: comment.dateTime
    }
}

export const transformationReact = async (react) => {
    return {
        _id: react._id,
        userId: react.userId,
        postId: react.postId
    }
}

export const transformationFollower = async (follower) => {
    return {
        _id: follower._id,
        followerId: follower.followerId,
        followingId: follower.followingId
    }
}

export const transformationReactComment = async (reactComment) => {
    return {
        _id: reactComment._id,
        userId: reactComment.userId,
        commentId: reactComment.commentId
    }
}

export const transformationNotification = async (notification) => {
    return {
        _id: notification._id,
        senderId: notification.senderId,
        title: notification.title,
        receiverId: notification.receiverId,
        body: notification.body,
        state: notification.state,
        dateTime: notification.dateTime
    }
}