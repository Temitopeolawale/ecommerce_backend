import User from "../models/UserSchema.js"

const isAdmin = async(req,res,next)=>{
    const user = await User.findById(req.UserAuthID)
    //check if user is an admin 
    if (user.isAdmin){
        next()
    }else{
        next(new Error ("Access Denied Admin needed"))
    }
}
export default isAdmin