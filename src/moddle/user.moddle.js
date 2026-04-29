import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        lowercase : true,
        unique : true
    },
    password : String,
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
},{timestamps : true});

export const User = mongoose.model("User",userSchema);
