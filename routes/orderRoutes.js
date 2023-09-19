import { Router } from "express";
const orderRoutes = Router()
import { isAuthenticatedUser, userRole } from "../middleware/auth.js";
import { deleteOrder, getAllOrders, getSingleOrder, getSingleOrderByPaymentId, myOrders, newOrder, singleUserAllOrders, updateOrder } from "../controllers/orderController.js";


orderRoutes.post("/order/new",isAuthenticatedUser,newOrder)
orderRoutes.get("/order/:id",isAuthenticatedUser,getSingleOrder)
orderRoutes.post("/order/pay/:id",isAuthenticatedUser,getSingleOrderByPaymentId)
orderRoutes.post("/orders/me",isAuthenticatedUser,myOrders)
orderRoutes.post("/admin/selectedUser/orders/:id",isAuthenticatedUser,userRole("admin"),singleUserAllOrders)
orderRoutes.post("/admin/orders",isAuthenticatedUser,userRole("admin"),getAllOrders)
orderRoutes.put("/admin/order/:id",isAuthenticatedUser,userRole("admin"),updateOrder)
orderRoutes.post("/admin/order/:id",isAuthenticatedUser,userRole("admin"),deleteOrder)

export default orderRoutes
