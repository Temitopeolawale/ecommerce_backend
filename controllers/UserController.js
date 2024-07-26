import User from '../models/UserSchema.js'
import bcrypt from 'bcryptjs'
import asynHandler from 'express-async-handler'
import gentoken from '../utils/generateToken.js'
import { getTokenHeader } from '../utils/getTokenHeader.js'
import { verifyToken } from '../utils/verifyToken.js'
// @description     user registration 
//@route            POST/api/v1/users/register
//@access           Private Admin

export const registerUSer = asynHandler(
    async(req,res)=>{
        const{fullName,email,password} = req.body
        
            const UserExist = await User.findOne({email})
            if (UserExist){
                throw new Error('user already Exist')
            }
            //hash passward
            const salt = await bcrypt.genSalt(10)
            const hashedPassword =await bcrypt.hash(password,salt)
            const user = await User.create({
                fullName,
                email,
                password:hashedPassword
            })
            res.status(201).json({
                status:'successful',
                message:"user registed succesfully ",
                data:user
            })
    
        }
        
            
        
        //check if user exist
    
    
    
)
//@description  user login
//@route        POST/api/v1/user/login
//@access       Public


export const loginUser =asynHandler(
    async(req,res)=>{
        const {email,password}=req.body
       //Find the use in db by email
    
       const userFound = await User.findOne({email})
       if(userFound && await bcrypt.compare(password,userFound?.password)){
         res.send({userFound,token:gentoken(userFound?._id)})
         
       }
       else{
        throw new Error ("invalid login credentials")
       }
    }
)


//@description  GET user profile
//@route        GET/api/v1/user/login
//@access       Private


export const userProfile=asynHandler(
    async(req,res)=>{
       const token = getTokenHeader(req)
       const verified = verifyToken(token)
        console.log(req)
        res.send(`welcome to profile page`)
    }
)

//@description  update  user shipping Address
//@route        PUT/api/v1/user/update/shipping
//@access       Private


export const updateShippingAddress = asynHandler(
    async(req,res)=>{
        const {firstName,lastName,address,city,postalCode, province,phone}=req.body

        const user = await User.findByIdAndUpdate(req.UserAuthID,{
            shippingAddress:{
                firstName,lastName,address,city,postalCode, province,phone
            },hasShippingAddress:true,
        },{new:true})

        res.send({message:'shipping Address updated',user})
    }
)