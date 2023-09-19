import { catchAsyncError } from "../middleware/catchAsyncError.js"
import Bank from "../models/bank-model.js"
import UpiDetails from "../models/upi-model.js"
// import Scholarship from "../models/scholarhip-model"

export const bankDetailsUpload = catchAsyncError(async (req, res, next) => {
    const { bankName, accountNo, ifscCode } = req.body
    const bankDetails = await Bank.create({
        bankName,
        accountNo,
        ifscCode,
        user: req.user.id,   //dhekh lena
        userEmail: req.user.email,   //dhekh lena
        userName: req.user.name,   //dhekh lena
        userImg: req.user.avatar.url,   //dhekh lena
    })
    await bankDetails.save()

    
    res.status(200).json({
        success: true,
    })
})
export const upiDetailsUpload = catchAsyncError(async (req, res, next) => {
    const {  upiId, upiName } = req.body
    const upiDetails = await UpiDetails.create({
        upiId, upiName ,
        user: req.user.id,   //dhekh lena
        userEmail: req.user.email,   //dhekh lena
        userName: req.user.name,   //dhekh lena
        userImg: req.user.avatar.url,   //dhekh lena
    })
    await upiDetails.save()

    res.status(200).json({
        success: true,
    })
})
export const getAllUsersBankDetails = catchAsyncError(async (req, res, next) => {

    const bankDetails = await Bank.find();
    
    res.status(200).json({
        success: true,
        bankDetails,
    });
})
export const getAllUsersUpiDetails = catchAsyncError(async (req, res, next) => {

    const upiDetails = await UpiDetails.find();
    
    res.status(200).json({
        success: true,
        upiDetails,
    });
})
export const getsingleUserBankDetails = catchAsyncError(async (req, res, next) => {
    const bankDetails = await Bank.find({user:req.params.id});

    res.status(200).json({
        success: true,
        bankDetails,
    });
})

// export const scholarshipUpload = catchAsyncError(async (req, res, next) => {
//     const { title, courseName, pdf } = req.body

//     const myCloud = await cloudinary.v2.uploader.upload(pdf, {
//         folder: "pdf-uploads",
//         allowedFormats: ['pdf'],
//         transformation: [{ width: 500, height: 500, crop: 'limit' }]
//     })

//     const scholarship = await Scholarship.create({
//         title,
//         courseName,
//         pdf,
//     })
//     await Scholarship.save()

//     res.status(200).json({
//         success: true,
//         scholarship
//     })
// })