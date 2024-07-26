import { Router } from "express";
import { createProduct, deleteProduct, get1Product, getProduct, updateProduct } from "../controllers/ProductController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";

const router = Router()

router.post('/',isLoggedIn,createProduct)
router.get('/',getProduct)
router.get('/:id',get1Product)
router.put('/:id',isLoggedIn,updateProduct)
router.delete('/:id',isLoggedIn,deleteProduct)


export default router

