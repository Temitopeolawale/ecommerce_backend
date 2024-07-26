import { Router } from "express";
import { createCategory, deleteCategory, get1Category, getCategory, updateCategory } from "../controllers/CategoryController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";



const router = Router()

router.post('/',isLoggedIn,createCategory)
router.get('/',getCategory)
router.get('/:id',get1Category)
router.put('/:id',isLoggedIn,updateCategory)
router.delete('/:id',isLoggedIn,deleteCategory)


export default router