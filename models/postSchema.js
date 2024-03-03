import mongoose from "mongoose";

const postSchema =  mongoose.Schema({
    userId:{
        type:String,
        required:[true, "Post should have a userId"],
        ref:"User"
    },
    body:{
        type:String,
        required:[true, "Post should have a body"]
    },
    dateTime:{
        type:Date,
        default:Date.now()
    }
})

const Post = mongoose.model("Post", postSchema);
export default Post;