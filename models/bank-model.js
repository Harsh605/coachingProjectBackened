import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true,
    },
    accountNo: {
        type: String,
        required: true,
    },
    ifscCode: {
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

const Bank = mongoose.model("Bank", bankSchema)
export default Bank