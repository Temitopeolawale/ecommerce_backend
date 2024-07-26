import { getTokenHeader } from "../utils/getTokenHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req,res,next)=>{
    //get token from header
  const token =  getTokenHeader(req)
    //verify token
   const decodedUser= verifyToken(token)
    //save user
    if(!decodedUser){
        throw new Error(`invalid/Expired token please login again`)
    }else{
        req.UserAuthID=decodedUser?.id
        next()
    }
    
    
        
   
    
}