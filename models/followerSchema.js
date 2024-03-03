import mongoose from "mongoose";

const followerSchema =  mongoose.Schema({
    followerId:{
        type:String,
        required:[true, "Follower should have a followerId"],
        ref:"User"
    },
    followingId:{
        type:String,
        required:[true, "Follower should have a followingId"],
        ref:"User"
    }
})

const Follower = mongoose.model("Follower", followerSchema);
export default Follower;