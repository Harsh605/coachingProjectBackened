import Order from "../models/order-model.js";
import Product from "../models/product-model.js";
import { ErrorHandler } from "../utils/errorHandler.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"

// Create new Order
export const newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItem,
        paymentInfo,
        totalPrice,
    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItem,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id,   //dhekh lena
        userEmail: req.user.email,   //dhekh lena
        userName: req.user.name,   //dhekh lena
        userImg: req.user.avatar.url,   //dhekh lena
    })

    console.log(order)
    res.status(201).json({
        success: true,
        order,
    });
});

// get Single Order
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});
// get Single Order using razorpay payment id
export const getSingleOrderByPaymentId = catchAsyncError(async (req, res, next) => {
    const order = await Order.findOne({ 'paymentInfo.razorpay_payment_id': req.params.id }).populate(
        "user",
        "name email"
    );


    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// get logged in user  Orders
export const myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// get selected user all  Orders by admin
export const singleUserAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.params.id });
    res.status(200).json({
        success: true,
        orders,
    });
});

// get all Orders -- Admin
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// update Order Status -- Admin
export const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
export const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });
});
