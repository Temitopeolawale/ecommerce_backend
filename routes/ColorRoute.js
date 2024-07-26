import { Router } from "express";
import { createColor, get1Color, getColor, updateColor } from "../controllers/ColorController.js";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import { deleteBrand } from "../controllers/BrandController.js";

const router = Router()

router.post('/',isLoggedIn,createColor)
router.get('/',getColor)
router.get('/:id',get1Color)
router.put('/:id',isLoggedIn,updateColor)
router.delete('/:id',isLoggedIn,deleteBrand)



export default router