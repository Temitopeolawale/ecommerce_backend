import Order from "../models/OrderSchema.js";
import asynHandler from 'express-async-handler'
import User from "../models/UserSchema.js";
import Product from "../models/ProductSchema.js";
import Stripe from 'stripe'

//@description  Create Orders
//@route        POST/api/v1/orders
//@access       Private


//stripe

const stripe = new Stripe()
export const createOrder = asynHandler(
    async(req,res)=>{
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
            totalPrice
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

        //Payment webhook
        //update the user order 
        res.send({message:"successfull",order,user})
    }
)