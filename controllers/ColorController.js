import Color from "../models/ColorsSchema.js";
import asynHandler from 'express-async-handler'

// @description      Create new color
//@route            POST/api/v1/color
//@access           Private Admin

export const createColor = asynHandler(
    
        async(req,res)=>{
            const {name}=req.body
            const colorExist= await Color.findOne({name})
    
            if(colorExist){
                throw new Error('color alredy Exist')
            }
            //creating brand
    
            const color= await Color.create({
                name:name.toLowerCase(),
                user:req.UserAuthID
            })
    
            res.send({message:'new color created',color})
        }
)

//@description      GET  color
//@route            GET/api/v1/color
//@access           Public

export const getColor =asynHandler(
    async(req,res)=>{
        const color = await Color.find()

        res.send(color)
    }
)

//@description      GET single color
//@route            GET/api/v1/:id
//@access           Public


export const get1Color = asynHandler(
    async(req,res)=>{
        const color = await Color.findById(req.params.id)

        res.send(color)
    }
)

//@description      Update color
//@route            PUT/api/v1/:id
//@access           Private Admin


export const updateColor = asynHandler(
    async(req,res)=>{
        const {name}= req.body

        const color = await Color.findByIdAndUpdate(req.params.id,{name},{new:true})

        res.send(color)
    }
)

//@description      DELETE color
//@route            DELETE/api/v1/:id
//@access           Private Admin

const deleteColor = asynHandler(
    async(req,res)=>{
        await Color.findByIdAndDelete(req.params.id)
        res.send('product deleted succesfully')
    }
)
