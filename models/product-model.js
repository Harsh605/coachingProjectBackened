import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price can't exceed 8 character"]
    },
    duration: {
        type: String,
        required: [true, "Please Enter Product duration"],
    },

    // images: [
    //     {
    //         public_id: {
    //             type: String,
    //             required: true
    //         },
    //         url: {
    //             type: String,
    //             required: true
    //         },

    //     }
    // ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Product = mongoose.model("product", productSchema)

export default Product