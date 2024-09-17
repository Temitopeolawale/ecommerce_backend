import express from "express";
import path from 'path'
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
import CouponRouter from "../routes/CouponRouter.js";
import Stripe from 'stripe'
import Order from '../models/OrderSchema.js'
dotenv.config()

//db connect
dbConnect()
const app = express()
//stripe webhook
//stripe instance 
const stripe = new Stripe(process.env.STRIPE)
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRETE

app.post('/webhook', express.raw({type: 'application/json'}),async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log(event)
  } catch (err) {
    console.log('err',err.message)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if(event.type==='checkout.session.completed'){
    //update order
    const session = event.data.object
    const {orderId}=session.metadata
    const paymentStatus = session.payment_status
    const paymentMethod = session.payment_method_types[0]
    const totalAmount = session.amount_total
    const currency = session.currency
    //find the order
    const order= await Order.findByIdAndUpdate(JSON.parse(orderId),{
      totalPrice:totalAmount / 100 ,
      currency,
      paymentMethod,
      paymentStatus
      },{new :true})

      console.log(order)
  }
  else{
    return
  }
  // // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

//pass incoming data
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
// app.use(bodyParser.)
//Server static file 
app.use(express.static('Public'))
//routes
//Home Routes
app.get('/',(req,res)=>{
  res.sendFile(path.join('Public','index.html'))
})
app.use('/api/v1/user/',UserRoute)
app.use('/api/v1/products/',ProductRoute)
app.use('/api/v1/categories/',CategoryRoute)
app.use('/api/v1/brands/',BrandRouter)
app.use('/api/v1/color/',ColorRouter ) 
app.use('/api/v1/review/',ReviewRouter)
app.use('/api/v1/order/',OrderRouter)
app.use('/api/v1/coupon/',CouponRouter)




//err middleware
app.use(notFound)
app.use(globalErrorHandler)

export default app 