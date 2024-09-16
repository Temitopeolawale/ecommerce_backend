import { Router } from "express";
import { createCategory, deleteCategory, get1Category, getCategory, updateCategory } from "../controllers/CategoryController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";


const router = Router()

router.post('/',isLoggedIn,isAdmin,upload.single("file"),createCategory)
router.get('/',getCategory)
router.get('/:id',get1Category)
router.put('/:id',isLoggedIn,isAdmin,updateCategory)
router.delete('/:id',isLoggedIn,isAdmin,deleteCategory)


export default router