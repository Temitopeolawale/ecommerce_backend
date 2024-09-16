import { Router } from "express";
import { isLoggedIn } from "../middlewares/isloggedIn.js";
import { createOrder, getAllOrders, getOrderStatics, getSingleOrder, updateOrder} from "../controllers/OrderController.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = Router()

router.post('/',isLoggedIn,createOrder)
router.get('/',isLoggedIn,getAllOrders)
router.put('/update/:id',isLoggedIn,updateOrder)
router.get('/:id',isLoggedIn,getSingleOrder)
router.get('/sales/stat',isLoggedIn,isAdmin,getOrderStatics)




export default router