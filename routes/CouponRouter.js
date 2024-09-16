import { Router } from "express";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import { createCoupon,deleteCoupon,getCoupons, getSingleCoupon, updateCoupon } from "../controllers/CouponController.js";
import isAdmin from "../middlewares/isAdmin.js";



const router = Router()

router.post("/",isLoggedIn,isAdmin,createCoupon)
router.get("/",isLoggedIn,getCoupons)
router.get("/:id",isLoggedIn,getSingleCoupon)
router.put("/update/:id",isLoggedIn,isAdmin,updateCoupon)
router.delete("/delete/:id",isLoggedIn,isAdmin,deleteCoupon)







export default router