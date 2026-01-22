const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userAuth = async (req,res,next) =>{
   try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not Valid");
    }
    const decodedMsg = await jwt.verify(token, "DEVTINDER@SECRET");

    const {_id} = decodedMsg;
    const userData = await User.findOne({_id : _id});
    if(!userData){
        throw new Error("User not found");
    }
    req.user = userData;
    next();
   }catch(err){
       res.status(401).send("Error : " + err.message);
   }    
};

module.exports = {
    userAuth
}