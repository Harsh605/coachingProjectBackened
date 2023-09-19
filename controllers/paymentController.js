import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment-model.js";

export const checkout = catchAsyncError(async (req, res, next) => {
  var options = {
    amount: req.body.amount,  
    currency: "INR",
  };
    const order = await instance.orders.create(options);

    res.status(200).json({
        success:true,
        order
    })
})
export const paymentVerification = catchAsyncError(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
      res.status(200).json({
        success: true,
      });
      // res.redirect(
      //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      // );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  });

 export const sendRazorApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success:true,
        RAZORPAY_API_KEY : process.env.RAZORPAY_API_KEY 
    })

 })















// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const processPayment = catchAsyncError(async (req, res, next) => {
//     console.log(req.body.amount)
//     const myPayment = await stripe.paymentIntents.create({
//         currency: "inr",
//         amount: 1999,
//        automatic_payment_methods:{
//         enabled:true
//        }
//     });

//     res
//     .status(200)
//     .json({ success: true, client_secret: myPayment.client_secret });
// })

// export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
//     res.status(200).json({
//         stripeApiKey: process.env.STRIPE_API_KEY
//     })
// })