import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        name: {
            type: String,
            required: true,
        },
        aadharNo: {
            type: Number,
            required: true,
        },
        fName: {
            type: String,
            required: true,
        },
        DOB: {
            type: String,
            required: true,
        },
        sex: {
            type: String,
            default:"Male",
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        scholarship: {
            id: {
                type: String,
                required: true
            },
            examName: {
                type: String,
                required: true
            },
            // institution:{
            //     type:String,
            //     required:true
            // },
            rollNo: {
                type: String,
                required: true
            },

        },
        admitCard: {
            type: String,
            required: true,
        },
        // admitCard: {
        //     public_id: {
        //         type: String,
        //         required: true
        //     },
        //     url: {
        //         type: String,
        //         required: true
        //     },
        // },

    },
 
    orderItem: {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        productId: {
            type: String,
            required: true,
        },
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
    paymentInfo: {
        razorpay_payment_id: {
            type: String,
            required: true,
        },
        razorpay_order_id: {
            type: String,
            required: true,
        },
        razorpay_signature: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema)
export default Order