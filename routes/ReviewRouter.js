import { Router } from "express";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import { createReview } from "../controllers/ReviewController.js";



const router = Router()

router.post('/:productID',isLoggedIn,createReview)




export default router