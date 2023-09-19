import { Router } from "express";
import { sendQuery } from "../controllers/queryController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const queryRoutes = Router()

queryRoutes.post("/query/send",sendQuery)

export default queryRoutes