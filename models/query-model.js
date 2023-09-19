import mongoose from "mongoose"
import validator from "validator"

const querySchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter Your Name"],
    },
    sender:{
        type: String,
        required:true,
    },
    message:{
        type: String,
        required:[true,"Please Enter Your Query"],
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
})


const Query = mongoose.model("Query",querySchema)



export default Query
