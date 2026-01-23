const express = require("express");

const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");

profileRouter.get("/profile",userAuth,async (req,res) => {
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

module.exports = profileRouter;