import mongoose from "mongoose";

const reactCommentSchema =  mongoose.Schema({
    userId:{
        type:String,
        required:[true, "ReactComment should have a userId"],
        ref:"User"
    },
    commentId:{
        type:String,
        required:[true, "ReactComment should have a commentId"],
        ref:"Comment"
    },
    postId:{
        type:String,
        required:[true, "Comment should have a postId"],
        ref:"Post"
    },
})

const ReactComment = mongoose.model("ReactComment", reactCommentSchema);
export default ReactComment;