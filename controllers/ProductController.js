import asynHandler from 'express-async-handler'
import Product from "../models/ProductSchema.js";
import expressAsyncHandler from 'express-async-handler';
// import { query } from 'express';
// import { constants } from 'buffer';
import Category from '../models/CategorySchema.js';
import Brand from '../models/BrandSchema.js';
// @description      Create new product
//@route            POST/api/v1/products
//@access           Private Admin

export const createProduct = asynHandler(
    async(req,res)=>{
        const{name,description,category,sizes,colors,price,totalQty,brand}=req.body
        const productExist=await Product.findOne({name})
        if(productExist){
            throw new Error ('product exixt')
        }
        //find the catgory
        const categoryFound= await Category.findOne({
            name:category.toLowerCase()
        })
        if(!categoryFound){
            throw new Error ('provide the category above ')
        }
        //find the brand
       
        const brandFound= await Brand.findOne({
            name:brand.toLowerCase()
        })
        if(!brandFound){
            throw new Error("provide brand ")
        }


        // creating the product
        const product = await Product.create({
            name,
            description,
            category,
            sizes,
            colors,
            user:req.UserAuthID,
            price,
            totalQty,
            brand,
        })
        //push the product to category
        categoryFound.products.push(product._id)
        await categoryFound.save()
        //push the product to brand 
        brandFound.products.push(product._id)
        //resave
        await brandFound.save()
        res.send(product)
        console.log('producted created')

    }
)
//@description      GET product
//@route            GET/api/v1/products
//@access           Public

export const getProduct=asynHandler(
    async(req,res)=>{
       
        // console.log(req.query)


        let productQuery=Product.find()
       
        // search by name
        if(req.query.name){
            productQuery=productQuery.find({
                name:{$regex: req.query.name, $options:'i'},
            })
        }

        // search by brand

        if(req.query.brand){
            productQuery=productQuery.find({
                brand:{$regex: req.query.brand, $options:'i'}
            })
        }

        // search by category

        if(req.query.category){
            productQuery=productQuery.find({
                category:{$regex:req.query.category,$options:"i"}
            })
        }

        //filter by color 

        if(req.query.colors){
            productQuery=productQuery.find({
                colors:{$regex:req.query.colors,$options:'i'}
            })
        }
         // filtering by size

         if(req.query.sizes){
            productQuery=productQuery.find({
                sizes:{$regex:req.query.sizes, $options:'i'}
            })
         }

         //filter by price range
         if(req.query.price){
            const priceRange= req.query.price.split("-")
            productQuery=productQuery.find({
                price:{$gte:priceRange[0],$lte:priceRange[1]}
            })
         }


         //pagination
         //page
         const page = parseInt(req.query.page)? parseInt(req.query.page):1
         
         //limits this means on a single page how many records data that you wan to display 
         const limit = parseInt(req.query.limit)? parseInt(req.query.limit):10
         //start index
         const startIndex=(page-1)*limit
         //end index
         const endIndex =page*limit
         //total record
         const total = await Product.countDocuments()
        
         productQuery=productQuery.skip(startIndex).limit(limit)
         // pagination result
         const pagination = {}
         if(endIndex<total){
            pagination.next={
                page:page+1,
                limit,
            }
         }
         if(startIndex>0){
            pagination.prev={
                page:-1,
                limit
            }
         }
        const product = await productQuery.populate('reviews')

    res.send({total,results:product.length,pagination,message:'product fetched',product})
    }
)


//@description      GET  single product
//@route            GET/api/v1/products/:id
//@access           Public

export const get1Product = asynHandler(
    async(req,res)=>{
        const product = await Product.findById(req.params.id).populate('reviews')
        if(!product){
            throw new Error('product not found')
        }
        else{
            res.send(product)
        }
    }
)



//@description      Update product
//@route            PUT/api/v1/products/:id/update
//@access           Private/admin

export const updateProduct = asynHandler(
    async(req,res)=>{

        const {name,description,category,sizes,colors,user,price,totalQty,brand} = req.body

        //update
        const product = await Product.findByIdAndUpdate(req.params.id,{name,description,category,sizes,colors,user,price,totalQty,brand},{new:true})

        if(!product){
            throw new Error ('product does not exist')
        }
        else{
            res.send({meaasge:'product Succesfully updated',product})
        }
    }
)

//@description      Delete product
//@route            DELETE/api/v1/products/:id/delete
//@access           Private/admin

export const deleteProduct=asynHandler(
    async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id)

        res.send("product deleted succesfully")

    }
)









