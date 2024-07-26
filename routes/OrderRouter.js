import { Router } from "express";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import { createOrder } from "../controllers/OrderController.js";
const router = Router()

router.post('/',isLoggedIn,createOrder)




export default router