import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, getSingleProductUsingCat, updateProduct } from "../controllers/product-controllers.js";
import { isAuthenticatedUser, userRole } from "../middleware/auth.js";

const routes = Router()

routes.get("/product",getAllProducts)
routes.post("/admin/product/new",isAuthenticatedUser,userRole("admin"),createProduct)
routes.put("/admin/product/update/:id",isAuthenticatedUser,userRole("admin"),updateProduct)
routes.post("/admin/product/delete/:id",isAuthenticatedUser,userRole("admin"),deleteProduct)
routes.get("/product/:id",getSingleProduct)
routes.get("/product/cat/:id",getSingleProductUsingCat)


export default routes