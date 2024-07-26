import Category from "../models/CategorySchema.js";
import asynHandler from 'express-async-handler'

// @description      Create new Category
//@route            POST/api/v1/category
//@access           Private Admin

export const createCategory =asynHandler(
    async(req,res)=>{
        const {name,user}= req.body
        const categoryExist= await Category.findOne({name})

        if(categoryExist){
            throw new Error ('Category alredy Exist')
        }
       
        const category=await Category.create({
                name:name.toLowerCase(),
                user:req.UserAuthID,
        })
        res.send(category)
        console.log('new category created')
   
    }
)

// @description      GET Category
//@route            GET/api/v1/category
//@access           Public

export const getCategory =asynHandler(
    async(req,res)=>{
        const category = await Category.find()

        res.send(category)
    }
)


// @description      GET 1 Category
//@route            GET/api/v1/category
//@access           Public


export const get1Category=asynHandler(
    async(req,res)=>{
        const category = await Category.findById(req.params.id)

        if(!category){
            throw new Error('category not found')
        }
        else{
            res.send({message:'category fetched',category})
        }

    }
)

//@description      UPDATE category
//@route            PUT/api/v1/category/:id/update
//@access           Private/admin

export const updateCategory=asynHandler(
    async(req,res)=>{   

        const {name}=req.body
        const category = await Category.findByIdAndUpdate(req.params.id,{name},{new:true})

        if(!category){
            throw new Error('category doest not exist')
        }
        else{
            res.send({message:'updated succesfully ',category})
        }


    }
)


//@description      DELETE product
//@route            DELETE/api/v1/products/:id/delete
//@access           Private/admin

export const deleteCategory=asynHandler(
    async(req,res)=>{
        await Category.findByIdAndDelete(req.params.id)

        res.send('category deleted')
    }
)