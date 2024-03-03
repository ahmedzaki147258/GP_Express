import mongoose from "mongoose";

const reactSchema =  mongoose.Schema({
    userId:{
        type:String,
        required:[true, "React should have a userId"],
        ref:"User"
    },
    postId:{
        type:String,
        required:[true, "React should have a postId"],
        ref:"Post"
    }
})

const React = mongoose.model("React", reactSchema);
export default React;