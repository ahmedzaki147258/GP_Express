import mongoose from "mongoose";

const notificationSchema =  mongoose.Schema({
    senderId:{
        type:String,
        required:[true, "Notification should have a senderId"],
        ref:"User"
    },
    receiverId:{
        type:String,
        required:[true, "Notification should have a receiverId"],
        ref:"User"
    },
    title:{
        type:String,
        required:[true, "Notification should have a title"]
    },
    body:{
        type:String,
        required:[true, "Notification should have a body"]
    },
    postId:{
        type:String,
        required:[true, "Notification should have a postId"],
        ref:"Post"
    },
    state:{
        type:String,
        enum: ['unseen', 'seen'],
        default:'unseen'
    },
    dateTime:{
        type:Date,
        default:Date.now()
    }
})

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;