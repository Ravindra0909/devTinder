const express = require("express");


const profileRouter = express.Router();
const {validateProfileData} = require("../utils/validation");
const {userAuth} = require("../middlewares/auth");
const user = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view",userAuth,async (req,res) => {
   try{ 
    const userData = req.user;
    if(!userData){
        throw new Error("User not found");
    }

    res.send(userData);
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth, async (req,res) => {
    try{
        if(!validateProfileData(req)){
            throw new Error("Invalid profile data");
        }
        const loggedInUserData = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUserData[key] = req.body[key];
        });
        await loggedInUserData.save();
        res.json({
            message : `${loggedInUserData.firstName}, Your profile updated successfully`,
            userData : loggedInUserData
        });
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

profileRouter.patch("/profile/edit/password",userAuth, async (req,res) => {
    try{
        const {password} = req.body;
        if(!password || !validator.isStrongPassword(password)){
            throw new Error("Please provide a strong passsword");
        }
        const passwordHash = await bcrypt.hash(password,10);
        const loggedInUserData = req.user;
        console.log("prev password hash : " + loggedInUserData.password);
        loggedInUserData.password = passwordHash;
        console.log("after change the password hash : " + loggedInUserData.password);
        await loggedInUserData.save();
        res.json({
            message : "Password updated successfully"
        });

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});

module.exports = profileRouter;