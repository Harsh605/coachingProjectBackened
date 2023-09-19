import Product from "../models/product-model.js"
import { ErrorHandler } from "../utils/errorHandler.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"
import { ApiFeatures } from "../utils/apiFeatures.js"
import cloudinary from "cloudinary"

// Create Product-Admin
export const createProduct =catchAsyncError( async (req, res,next) => {
    // req.body.userId = req.user.id               //if there is multiple admin or user who created this post. so other one can know. req.body.userId monggose m product m h to usme hum req.user.id daal rhe jo ki authanticated hone par use mil jyegi
    const { name, price, category,duration,description } = req.body

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.images,{
    //     folder:"Course",
    // })
    const product = await Product.create({
        name, price, category,duration,description,
        userId: req.user.id ,
        // images: {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url
        // }
    })
    await product.save()
    res.status(201).json({
        success: true,
        product
    })
})

// Get all products
export const getAllProducts =catchAsyncError(async (req, res) => {
    const resultPerPage = 8
    const productsCount = await Product.countDocuments()
    const apiFeature= new ApiFeatures(Product.find(),req.query)
    .search().filter().pagination(resultPerPage);
    // const products = await Product.find()
    const products = await apiFeature.query;
    res.status(201).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    })
})

//get Single product
export const getSingleProduct =catchAsyncError( async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(201).json({
        success: true,
        product
    })
})
//get single product using category
export const getSingleProductUsingCat =catchAsyncError( async (req, res, next) => {
    const product = await Product.find({category: req.params.id})
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(201).json({
        success: true,
        product
    })
})
// update Product: Admin

export const updateProduct =catchAsyncError( async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
     const { name, price, category,duration,description } = req.body

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.images,{
    //     folder:"Course",
    // })
    const updatedProduct ={
        name, price, category,duration,description,
        // images:{
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url
        // }
    }

    product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Product Updated",
        product
    })
})

// delete product :Admin

export const deleteProduct =catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }
        await product.deleteOne()
        res.status(200).json({
            success: true,
            message: "Product Deleted",
        })

    } catch (error) {
        console.log(error)
    }

})


// Create new Or update the review
// get all reviews of a single product
//delete review

