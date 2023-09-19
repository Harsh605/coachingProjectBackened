import { catchAsyncError } from '../middleware/catchAsyncError.js';
import scholarshipSchema from '../models/scholarhip-model.js';

export const scholarhipUpload = catchAsyncError(async (req, res, next) => {
  const { title, courseName, pdf } = req.body;
//   console.log(req.body)
//   const pdf = req.file.path; // Get the file path from the request object

  const scholarshipDetails = await scholarshipSchema.create({
    title,
    pdf,
    courseName,
  });

  res.status(200).json({
    success: true,
    scholarshipDetails,
  });
});
