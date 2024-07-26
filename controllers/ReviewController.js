import Review from "../models/ReviewSchema.js";
import asynHandler from 'express-async-handler'
import Product from "../models/ProductSchema.js";
// @description      Create new Review
//@route            POST/api/v1/review
//@access           Private Admin

export const createReview = asynHandler(
    async(req,res)=>{
        const {product,message,rating} = req.body
    // find the product
    const {productID}=req.params
    const productFound = await Product.findById(productID).populate("reviews")
    if(!productFound){
        throw new Error("Product not found")
    }
    // check if user alredy review
    const hasReviewed =productFound?.reviews.find((review)=>{
        return review?.user?.toString()===req?.UserAuthID.toString()
        
    })
    if(hasReviewed){
        throw new Error('you have reviewed this product')
    }
    //create review
    const review = await Review.create({
        message,
        rating,
        product:productFound?._id,
        user:req.UserAuthID,
    })
    //push review into product
    productFound.reviews.push(review?._id)
    await productFound.save()

    res.send({message:"Review created Successfully"})
    }
)