export const globalErrorHandler =(err,req,res,next)=>{
    //stack 
    //message
    const stack = err?.stack
    const message=err?.message
    const statusCode =err?.statusCode? err?.statusCode:500

res.status(statusCode).json({
    stack,
    message
})
}

//404 handler

export const notFound =(req,res,next)=>{
    const err = new Error(`Route ${req.orginalUrl} not found`)
    next(err)
}
