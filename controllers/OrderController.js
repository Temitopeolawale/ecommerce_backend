import Order from "../models/OrderSchema.js";
import asynHandler from 'express-async-handler'
import User from "../models/UserSchema.js";
import Product from "../models/ProductSchema.js";
import Stripe from 'stripe'
import dotenv from 'dotenv'
import Coupon from "../models/Coupon.js";

//@description  Create Orders
//@route        POST/api/v1/orders
//@access       Private
dotenv.config()
//stripe

const stripe = new Stripe(process.env.STRIPE)

export const createOrder = asynHandler(
    async(req,res)=>{
        //get coupon 
        const{coupon}=req.query
        //check if the user is proving the coupon 
        
        const couponFound = await Coupon.findOne({
                code:code.toUpperCase()
            })
        //check if coupon is expired 
        if(couponFound.isExpried){
            throw new Error("Coupon has Expired")
        }
        //checking if no coupon 
        if (!couponFound){
            throw new Error ("Coupon does not Exist")
        }

        //get discount 
        const discount = couponFound.discount / 100
        //get the payloads(user,orderitems.shoipping address,total price)
        const {orderItems,shippingAddress,totalPrice} = req.body
        //find the user 
        const user = await User.findById(req.UserAuthID)
        //check if user has shipping address 
        if(!user.hasShippingAddress){
            throw new Error('please add shipping address')
        }
        //check if order is not empty
       if(orderItems.length <= 0){
        throw new Error("No order Items")
       }
        //create order --save to db,
        const order = await Order.create({
            user:user._id,
            orderItems,
            shippingAddress,
            totalPrice : couponFound ? totalPrice*discount :totalPrice
        })
       // push order to user
       user.orders.push(order._id)
       await user.save()
        //update the product qty and qty sold 
        const products = await Product.find({_id:{$in:orderItems}})
        
        orderItems.map( async(order)=>{
            const product = products.find((product)=>{
                return product._id.toString() === order._id.toString()
            })
            if(product){
                product.totalSold += order.qty
            }
            await product.save()
        })
        //make payments 
        //convert order items to have same struture as stripe
        const convertedOrders= orderItems.map((items)=>{
            return{
               price_data:{
                currency:"usd",
                product_data:{
                    name:items.name,
                    description:items.description,
                },
                unit_amount:items.price*100
               },
               quantity:items.qty
            }
        })
        const session = await stripe.checkout.sessions.create({
            line_items:convertedOrders,
            metadata:{
                orderId:JSON.stringify(order?.id)
            },
            mode:'payment',
            success_url:"http://localhost:3000/success",
            cancel_url:'http://localhost:3000/cancel'
        })
        res.send({url:session.url})
       
    }
)

//@description Feetching  Orders
//@route        GET/api/v1/orders
//@access       Private

export const getAllOrders = asynHandler(
    async (req,res)=>{
       //find all orders
       const orders = await Order.find()

       res.send(orders)
    }
)

//@description  get single Orders
//@route        GET/api/v1/orders
//@access       Private

export const getSingleOrder = asynHandler(
    async(req,res)=>{
        const order = await Order.findById(req.params.id)

        res.send(order)
    }
)

//@description  update orders to be delivered
//@route        PUT/api/v1/orders/update/:id
//@access       Private

export const updateOrder = asynHandler(
    async(req,res)=>{
        //find the order by id
        const id = req.params.id
        //update
        const updatedOrder = await Order.findByIdAndUpdate(id,{
            status:req.body.status
        },{new:true})

        res.send(updatedOrder)
    }
)


//@description  get sales sum of orders
//@route        GET/api/v1/orders/sales/statics
//@access       Private/admin

export const getOrderStatics =asynHandler(
    async(req,res)=>{
        //get summary 
        const OrderSummary = await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalSale:{
                        $sum:"$totalPrice"
                    },
                    minSales:{
                        $min:"$totalPrice",
                    },
                    maxSales:{
                        $max:"$totalPrice"
                    },
                    averageSales:{
                        $avg:"$totalPrice"
                    }
                }
            }
        ])
        //get the date
        const date = new Date()
        const today = new Date(date.getFullYear(),date.getMonth(),date.getDate())
        const saleToday = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:today,
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalSale:{
                        $sum:"$totalPrice"
                    }
                }
            }
        ])
        res.status(200).send({OrderSummary,saleToday})
    }
)