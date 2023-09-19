import { Router } from "express";
import multer from 'multer';

// Create the Multer instance
const upload = multer({ dest: 'uploads/' });
import { bankDetailsUpload,getAllUsersBankDetails,getAllUsersUpiDetails,getsingleUserBankDetails, upiDetailsUpload} from "../controllers/scholarshipController.js"
import { isAuthenticatedUser, userRole } from "../middleware/auth.js";
import { scholarhipUpload } from "../controllers/UploadScholarshipController.js";

const scholarshipRoutes = Router()

scholarshipRoutes.post("/bankDetails/upload",isAuthenticatedUser,bankDetailsUpload)
scholarshipRoutes.post("/upiDetails/upload",isAuthenticatedUser,upiDetailsUpload)
scholarshipRoutes.post("/admin/bankDetails/singleUser/get",isAuthenticatedUser,userRole("admin"),getsingleUserBankDetails)
scholarshipRoutes.post("/admin/bankDetails/allUser/get",isAuthenticatedUser,userRole("admin"),getAllUsersBankDetails)
scholarshipRoutes.post("/admin/upiDetails/allUser/get",isAuthenticatedUser,userRole("admin"),getAllUsersUpiDetails)
scholarshipRoutes.post("/admin/upload/scholarship",isAuthenticatedUser,userRole("admin"),scholarhipUpload)



export default scholarshipRoutes