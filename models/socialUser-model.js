import mongoose from "mongoose"
import validator from "validator"

const socialUserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        default: "null"
    },
    role:{
        type:String,
        default: "user"
    },
    id: {
        type: String,
        required:true
    },
    avatar:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
            default: "none"
        },
    },
    provider:{
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
})

const socialUser = mongoose.model("socialUser",socialUserSchema)


export default socialUser
