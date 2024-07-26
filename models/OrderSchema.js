import mongoose from 'mongoose'

const Schema = mongoose.Schema
// generate random numbers

const randomText = Math.random().toString(36).substring(7).toLocaleUpperCase()
const randomNum = Math.floor(1000+Math.random()*90000)
const orderSchema = new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        orderItems:[
            {
                type:Object,
                required:true
            }
        ],
        shippingAddress:{
            type:Object,
            required:true
        },
        orderNumber:{
            type:String,
            required:true,
            default:randomText+randomNum
        },
        // fot Stripe payment
        paymentStatus:{
            type:String,
            required:true,
            default:"Not Paid"
        },
        paymentMethod:{
            type:String,
            required:true,
            default:"Not Specified"
        },
        totalPrice:{
            type:Number,
            default:0.0
        },
        currency:{
            type:String,
            required:true,
            default:"Not specified"
        },
        //for admin
        status:{
            type:String,
            required:true,
            default:"pending",
            enum:['pending','processing','shipped','delivered']
        },
        deliveredAt:{
            type:Date,
        }
    },
    {
        timestamps:true
    }
)
const Order =mongoose.model("Order",orderSchema)

export default Order