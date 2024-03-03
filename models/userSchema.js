import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "User should have a firstName"]
    },
    lastName:{
        type:String,
        required:[true, "User should have a lastName"]
    },
    email:{
        type:String,
        required:[true,'User Should have an email'],
        unique:true,
        match: /^\S+@\S+\.\S+$/,
    },
    password:{
        type:String,
        required:[true,'Customer Should have a password']
    },
    image:{
        type:String,
    }
})

const User = mongoose.model("User", userSchema);
export default User;