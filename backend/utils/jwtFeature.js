let jwt =require("jsonwebtoken");

exports.createAccessToken=(payload,secret,expiryTime)=>{
    const token=jwt.sign(payload,secret,{expiresIn:expiryTime});
    return token;
}

exports.verifyAccessToken=(token,secret)=>{
    const {_id}=jwt.verify(token,secret);
    return _id;
}