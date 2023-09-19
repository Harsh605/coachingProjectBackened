import { Router } from "express";
import { deleteUser, forgetPassword, getAllUsers, getSingleUser, getUserDetails, resetPassword, updatePassword, updateProfile, updateUserRole, userLogin, userLogout, userRegistration } from "../controllers/user-controllers.js"
import { isAuthenticatedUser, userRole } from "../middleware/auth.js";
const userRoutes = Router()

userRoutes.post("/register",userRegistration)
userRoutes.post("/login",userLogin)
userRoutes.post("/logout",userLogout)
userRoutes.post("/password/forget",forgetPassword)               //link bej denge
userRoutes.put("/password/reset/:token",resetPassword)           //link ko open karke password change kar paayenge
userRoutes.put("/password/Update",isAuthenticatedUser,updatePassword)

userRoutes.post("/me",isAuthenticatedUser,getUserDetails)
userRoutes.put("/me/Update",isAuthenticatedUser,updateProfile)

userRoutes.post("/admin/users",isAuthenticatedUser,userRole("admin"),getAllUsers)
userRoutes.post("/admin/user/:id",isAuthenticatedUser,userRole("admin"),getSingleUser)
userRoutes.put("/admin/user/update/:id",isAuthenticatedUser,userRole("admin"),updateUserRole)
userRoutes.post("/admin/user/delete/:id",isAuthenticatedUser,userRole("admin"),deleteUser)

// userRoutes.post("/login/fb",fbAuth)

export default userRoutes