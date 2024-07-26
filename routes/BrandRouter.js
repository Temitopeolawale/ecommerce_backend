import { Router } from "express";
import { createBrand, deleteBrand, get1Brand, getBrand, updateBrand } from "../controllers/BrandController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
const router = Router()


router.post('/',isLoggedIn,createBrand)
router.get('/',getBrand)
router.get('/:id',get1Brand)
router.put('/:id',isLoggedIn,updateBrand)
router.delete('/:id',isLoggedIn,deleteBrand)


export default router

