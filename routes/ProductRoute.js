import { Router } from "express";
import { createProduct, deleteProduct, get1Product, getProduct, updateProduct } from "../controllers/ProductController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";


const router = Router()

router.post('/',isLoggedIn,isAdmin,upload.array("files"),createProduct)
router.get('/',getProduct)
router.get('/:id',get1Product)
router.put('/:id',isLoggedIn,isAdmin,updateProduct)
router.delete('/:id/delete',isLoggedIn,isAdmin,deleteProduct)


export default router

