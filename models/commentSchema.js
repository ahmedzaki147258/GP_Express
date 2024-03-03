import mongoose from "mongoose";

const commentSchema =  mongoose.Schema({
    userId:{
        type:String,
        required:[true, "Comment should have a userId"],
        ref:"User"
    },
    postId:{
        type:String,
        required:[true, "Comment should have a postId"],
        ref:"Post"
    },
    comment:{
        type:String,
        required:[true, "Comment should have a comment"]
    },
    dateTime:{
        type:Date,
        default:Date.now()
    }
})

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;