import express from "express";
import dbConnect from "../config/dbConnect.js";
import dotenv from 'dotenv'
import UserRoute from "../routes/UserRoute.js";
import bodyParser from "body-parser";
import { globalErrorHandler,notFound } from "../middlewares/globalErrorHAndler.js";
import ProductRoute from "../routes/ProductRoute.js";
import CategoryRoute from "../routes/CategoryRoute.js"
import BrandRouter from "../routes/BrandRouter.js"
import ColorRouter from '../routes/ColorRoute.js'
import ReviewRouter from '../routes/ReviewRouter.js'
import OrderRouter from '../routes/OrderRouter.js'
dotenv.config()

//db connect
dbConnect()
const app = express()
//pass incoming data
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
// app.use(bodyParser.)

//routes
app.use('/api/v1/user/',UserRoute)
app.use('/api/v1/products/',ProductRoute)
app.use('/api/v1/categories/',CategoryRoute)
app.use('/api/v1/brands/',BrandRouter)
app.use('/api/v1/color/',ColorRouter ) 
app.use('/api/v1/review/',ReviewRouter)
app.use('/api/v1/order/',OrderRouter)


//err middleware
app.use(notFound)
app.use(globalErrorHandler)

export default app 