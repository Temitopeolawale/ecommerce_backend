import { Router } from "express";
import { createColor, get1Color, getColor, updateColor } from "../controllers/ColorController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import { deleteBrand } from "../controllers/BrandController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router()

router.post('/',isLoggedIn,isAdmin,createColor)
router.get('/',getColor)
router.get('/:id',get1Color)
router.put('/:id',isLoggedIn,isAdmin,updateColor)
router.delete('/:id',isLoggedIn,isAdmin,deleteBrand)



export default router