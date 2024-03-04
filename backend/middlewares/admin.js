const User=require("../models/userModel");

exports.checkAdmin=async (req,res,next)=>{
    const {email}=req.user;
    const user=await User.findOne({email});
    if(user.role=="admin"){
        return next();
    }else{
        return next({
            statusCode:403,
            message:"you have not access to do this"
        })
    }
}