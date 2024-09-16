//coupon model 
import mongoose from "mongoose";
const Schema = mongoose.Schema

const CouponSchema = new Schema (
    {
        code:{
            type:String,
            required:true,
        },
        startDate:{
            type:Date,
            required:true,
        },
        endDate:{
            type:Date,
            required:true,
        },
        discount:{
            type:Number,
            required:true,
            default:0
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
        },

    },
    {
        timestamps:true
    }
)

//check if coupon is expired 
CouponSchema.virtual("isExpired").get(function(){
    return this.endDate < Date.now()

})

//checking how many days left 
CouponSchema.virtual("daysLeft").get(function(){
    const daysLeft = Math.ceil((this.endDate-Date.now())/(1000*60*60*24)) + "Days Left"
    return daysLeft

})
// validation 
CouponSchema.pre('validate',function(next){
    if(this.endDate<this.startDate){
        next(new Error("End Date cannot be more than the start date "))
    }
    next()
})

//checking if the coupon is less than 0
CouponSchema.pre("validate",function(next){
    if(this.discount<=0 || this.discount>100){
        next(new Error("Discount cannot be less thank 0 or greater than 100"))
    }
    next()
})
//checking if the starting date is less than the current date 
CouponSchema.pre("validate",function(next){
    if(this.startDate<Date.now){
        next(new Error("start date cannot be less than the current date "))
    }
    next()
})
// checking if the ending date is less thank the currenrt date 
CouponSchema.pre("validate",function(next){
    if(this.endDate < Date.now){
        next(new Error("End date cannot be less than currrent date "))
    }
    next()
})

const Coupon = mongoose.model("Coupon",CouponSchema)

export default Coupon
