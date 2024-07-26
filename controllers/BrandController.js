import Brand from "../models/BrandSchema.js";
import asynHandler from 'express-async-handler'


// @description      Create new Brand
//@route            POST/api/v1/brand
//@access           Private Admin


export const createBrand =asynHandler(
    async(req,res)=>{
        const {name}=req.body
        const brandExist= await Brand.findOne({name})

        if(brandExist){
            throw new Error('brand alredy Exist')
        }
        //creating brand

        const brand= await Brand.create({
            name:name.toLowerCase(),
            user:req.UserAuthID
        })

        res.send({message:'new brand created',brand})
    }
)

// @description      GET Brand
//@route            GET/api/v1/brand
//@access           public

export const getBrand = asynHandler(
    async(req,res)=>{
        const brand=await Brand.find()

        res.send(brand)
    }
)

// @description      GET single Brand
//@route            GET/api/v1/:id
//@access           public


export const get1Brand=asynHandler(
    async(req,res)=>{
        const brand = await Brand.findById(req.params.id)
    
        if(!brand){
            throw new Error('Brand not found')
        }
        else{

            res.send(brand)
        }
    }
)

// @description      UPDATE single Brand
//@route            PUT/api/v1/brand
//@access           Private Admin

export const updateBrand=asynHandler(
    async(req,res)=>{
        const {name}=req.body

        const brand = await Brand.findByIdAndUpdate(req.params.id,{name},{new:true})

        res.send({message:"updated succesfully",brand})
    }
)

// @description     DELETE single Brand
//@route            DELETE/api/v1/brand
//@access           Private Admin

export const deleteBrand =asynHandler(
    async(req,res)=>{
        await Brand.findByIdAndDelete(req.params.id)

        res.send('deleted succesfully')
    }
)

