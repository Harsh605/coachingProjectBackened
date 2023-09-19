import { Router } from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { checkout,
    paymentVerification,sendRazorApiKey } from "../controllers/paymentController.js";
// import { isAuthenticatedUser } from "../middleware/auth.js";
// import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";

const paymentRoutes = Router()




paymentRoutes.post("/checkout",isAuthenticatedUser,checkout)
paymentRoutes.post("/paymentVerification",isAuthenticatedUser,paymentVerification)
paymentRoutes.post("/razorpayApiKey",isAuthenticatedUser,sendRazorApiKey)

// paymentRoutes.post("/stripeApiKey",isAuthenticatedUser,sendStripeApiKey)
// paymentRoutes.post("/stripeApiKey",isAuthenticatedUser,sendStripeApiKey)



export default paymentRoutes

