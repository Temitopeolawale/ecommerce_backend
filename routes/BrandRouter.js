import { Router } from "express";
import { createBrand, deleteBrand, get1Brand, getBrand, updateBrand } from "../controllers/BrandController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = Router()


router.post('/',isLoggedIn,isAdmin,createBrand)
router.get('/',getBrand)
router.get('/:id',get1Brand)
router.put('/:id',isLoggedIn,isAdmin,updateBrand)
router.delete('/:id',isLoggedIn,isAdmin,deleteBrand)


export default router

