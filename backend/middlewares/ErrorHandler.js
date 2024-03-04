exports.errorHandler=(err,req,res,next)=>{
    let statusCode=500;
    if(err.statusCode){
        res.status(err.statusCode).json({
            message:err.message
        })
    }
}