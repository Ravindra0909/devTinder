const express = require("express");

const authRouter = express.Router();
const {validateSignupData} = require("../utils/validation");

const bcrypt = require('bcrypt');
const User = require("../models/user");

authRouter.post("/signup",async (req,res) => {
    
    try{
        // validation of signup data
        validateSignupData(req);

        //encrypt the password
        const {password,firstName,lastName,emailId} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,
        });

        await user.save();
        res.send("User signed up successfully");
        
    }catch(err){
        res.status(400).send("Error saving to the user:" + err.message);
    }
});

authRouter.post("/login", async (req,res) => {

    try{
        const {emailId, password} = req.body; 
        const userData = await User.findOne({emailId : emailId})
        if(!userData){
            throw new Error("Invalid Credentials");
        }
        // verifying password
        const isPasswordMatch = await userData.verifyPassword(password);

        if(isPasswordMatch){
            // creating JWT token
            const token = await userData.getJWT();
            //storing token in cookie
            res.cookie("token",token, {expiresIn : new Date(Date.now() + 8*3600000)});

            res.send("User logged in successfully");
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(500).send("ERROR : " + err.message);
    }
});   

authRouter.post("/logout", (req,res) => {
    res.cookie("token",null,{expires : new Date(Date.now())});
    res.send("User logged out successfully");
});

module.exports = authRouter;

