import asynHandler from 'express-async-handler'
import Coupon from '../models/Coupon.js'




//@description  Create new Coupons
//@route        POST/api/v1/Coupons
//@access       Private/Admin

export const createCoupon = asynHandler(
    async(req,res)=>{
        const {code,startDate,endDate,discount,user}=req.body
       //check if admin
       //check if coupon alredy exist
       const couponExist = await Coupon.findOne({code})

       if( couponExist){
        throw new Error ("Coupon already Exist")
       }
       //check if discount is a number 
       if(isNaN(discount)){
        throw new Error ("Discount value should be a number ")
       }
       //create coupon 
       const coupon = await Coupon.create({
        code:code.toUpperCase(),
        startDate,
        endDate,
        discount,
        user:req.UserAuthID
    })

       res.status(201).send({message:"coupon createted successfully ",coupon})
    }
)

//@description  GET  all Coupons
//@route        GET/api/v1/Coupons
//@access       Private/Admin


export const getCoupons = asynHandler(
    async(req,res)=>{
        const coupon = await Coupon.find()

        res.send(coupon)
    }
)

//@description  GET  single  Coupons
//@route        GET/api/v1/Coupons/:id
//@access       Private/Admin

export const getSingleCoupon = asynHandler(
    async(req,res)=>{
        const coupon = await Coupon.findById(req.params.id)

        res.send(coupon)
    }
)

//@description  UPDATE Coupons
//@route        PUT/api/v1/Coupons/:id
//@access       Private/Admin

export const updateCoupon = asynHandler(
    async(req,res)=>{
        const{code , discount ,startDate,endDate}= req.body
        const coupon = await Coupon.findByIdAndUpdate(req.params.id,{code:code.toUpperCase(),discount,startDate,endDate},{new:true})

        res.send(coupon)
    }

)

//@description  DELETE Coupons
//@route        DELETE/api/v1/Coupons/:id
//@access       Private/Admin


export const deleteCoupon = asynHandler(
    async(req,res)=>{
        const coupon = await Coupon.findByIdAndDelete(req.params.id)

        res.send("Successfully deleted ")
    }
)