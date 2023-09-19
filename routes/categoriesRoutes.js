import { Router } from "express";
import { addCategory,getCategories,updateCategories,deleteCategories, } from "../controllers/categoryController.js";
import { isAuthenticatedUser, userRole } from "../middleware/auth.js";

const categoryRoutes = Router()


categoryRoutes.get("/admin/category/getCategory",getCategories)
categoryRoutes.post("/admin/category/create",isAuthenticatedUser,userRole("admin"),addCategory)
categoryRoutes.put("/admin/category/update",isAuthenticatedUser,userRole("admin"),updateCategories)
categoryRoutes.post("/admin/category/delete",isAuthenticatedUser,userRole("admin"),deleteCategories)


export default categoryRoutes
