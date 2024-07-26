import mongoose from 'mongoose'


const Schema = mongoose.Schema

const ProductSchema = new Schema (
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required :true
        },
        brand:{
            type:String,
            required:true
        },
        category:{
            type:String,
            ref:"Category",
            required:true
        },
        sizes:{
            type:[String],
            enum:["S","M","L","XL","XXL"],
            required:true
        },
        colors:{
            type:[String],
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        images:[{
            type:String,
            default:"https://via.placeholder.com/150"

        }],
        reviews:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }],
        price:{
            type:Number,
            required:true
        },
        totalQty:{
            type:Number,
            required:true
        },
        totalSold:{
            type:Number,
            required:true,
            default:0
        },

    },{
        timestamps:true,
        toJSON:{virtuals:true}
    }
)
//virtuals
//qty left
ProductSchema.virtual('qtyLeft').get(function(){
    return this.totalQty - this.totalSold
})
//calculate total rating
ProductSchema.virtual('totalReviews').get(function(){
   return this.reviews.length
})
//average rating
ProductSchema.virtual('averageRating').get(function(){
    let totalRatings = 0
    this?.reviews?.forEach((reviews)=>{
        totalRatings +=reviews.rating
    })
    //cal average rating
    const averageRating = Number(totalRatings / this.reviews.length).toFixed(1)
   return averageRating
})
const Product =mongoose.model("Product",ProductSchema)

export default Product