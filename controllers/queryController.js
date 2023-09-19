import Query from "../models/query-model.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"


// get user profile --apni apni
export const sendQuery = catchAsyncError(async (req, res, next) => {
    const {name,sender,message}= req.body

    const query = await Query.create({
        name,sender,message
    })
    await query.save()

    res.status(200).json({
        success: true,
    })
})

