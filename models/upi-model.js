import mongoose from "mongoose";

const upiSchema = new mongoose.Schema({
    upiId: {
        type: String,
        required: true,
    },
    upiName: {
        type: String,
        required: true,
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    userEmail: {
        type: String,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        ref: "User",
        required: true,
    },
    userImg: {
        type: String,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UpiDetails = mongoose.model("UpiDetails", upiSchema)
export default UpiDetails