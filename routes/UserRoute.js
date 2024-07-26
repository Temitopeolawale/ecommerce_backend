import { Router } from "express";
import { loginUser, registerUSer, updateShippingAddress, userProfile } from "../controllers/UserController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";

const router =Router()

router.post('/register' ,registerUSer)
router.post('/login',loginUser)
router.get('/profile',isLoggedIn,userProfile)
router.put('/update/shipping',isLoggedIn,updateShippingAddress)


export default router
