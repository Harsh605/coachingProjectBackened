import User from "../models/user-model.js"
import { ErrorHandler } from "../utils/errorHandler.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"
import sendToken from "../utils/sendJwtToken.js"
import sendEmail from "../utils/sendEmail.js"
import crypto from "crypto"
import cloudinary from "cloudinary"

export const userRegistration = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })
    await user.save()

    const token = user.getJwtToken()
    // res.status(201).cookie(token).json({
    //     success: true,
    //     user,
    //     token
    // })
    sendToken(user, 201, res)
})

export const userLogin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    // checking if user gave email and password both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password Both", 400))
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invaild Email or Password", 401))
    }

    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invaild Email or Password", 400))
    }

    sendToken(user, 200, res)

})
export const fbAuth = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    // checking if user gave email and password both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password Both", 400))
    }
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invaild Email or Password", 401))
    }

    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invaild Email or Password", 400))
    }

    sendToken(user, 200, res)

})

export const userLogout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        Credential:true

    })


    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// forget password
export const forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("User not Found", 404))
    }

    // get reset passwordToken
    const resetToken = await user.getResetPasswordToken()             //isko url ke sath bej sakte
    await user.save({ validateBeforeSave: false })              //isse hashtoken save ho jyeaga

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`           //ise deploy karte hue kar denge kyu ki route tab same ho jyenge
    // const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`
    const resetPasswordUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`
    const message = `Your Password reset Password token iss:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then,please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully.`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})


// reset password after user got ResetLink

export const resetPassword = catchAsyncError(async (req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler("Reset Password link is invalid or expired", 404))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password is not same.", 404))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)


})

// get user profile --apni apni
export const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// update password
export const updatePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(oldPassword)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is not correct", 400))
    }
    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password must be same", 400))
    }
    user.password = newPassword
    await user.save()
    sendToken(user, 200, res)
})

// update Profile  ------------------------idhar thoda difference h result m error bala
export const updateProfile = catchAsyncError(async (req, res, next) => {
    //we will avatar later



    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    if(req.body.avatar){
        const user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id
        
        await cloudinary.v2.uploader.destroy(imageId)

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        })

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }

    }
     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    await user.save()
    res.status(200).json({
        success: true
    })
})

// get all users-Admin 
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})

//get single user(admin)      //yaani ki ek admin ek ek karke users ki details lo dhekh sakta hai
export const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id ${req.params.id}`, 400))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// admin kisi bhi user ka role change kar skta
export const updateUserRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id ${req.params.id}`, 400))
    }
    if (user.role === "admin") {
        return next(new ErrorHandler("You are not authorized to update this user.", 403))
    }
    user.role = req.body.role
    await user.save()
    res.status(200).json({
        success: true
    })
})

//  admin can delete any user
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id ${req.params.id}`, 400))
    }
    if (user.role === "admin") {
        return next(new ErrorHandler("You are not authorized to delete this user.", 403))
    }
    await user.deleteOne()
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})


