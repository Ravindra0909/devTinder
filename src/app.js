const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");


const app = express();

app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);
// signup API

// Login API


//sending connection request

// get profile API


// get User by emailId
app.get("/user",async (req,res)=>{
    const getEmailId = req.body.emailId;
    try{
    const userData = await User.find({emailId : getEmailId});
    if(userData.length === 0){
        res.status(404).send("User not found");
    }else{
        res.send(userData);
    }

    }catch(err){
        res.status(500).send("Something went wrong " + err.message);
    }
    
   
})


//feed API - Get all users from the database

app.get("/feed", async (req,res) => {
    try{
        const allUsersData = await User.find({});
        if(allUsersData.length === 0){
            res.status(404).send("No users found");
        }else{
            res.send(allUsersData);
        }
    }catch(err){
        res.status(500).send("Something went wrong " + err.message);
    }
})

// Deleting a user by ID
app.delete("/user",async (req,res) => {
    const userId = req.body.userId;

    try{
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(500).send("Something went wrong " + err.message);
    }
})

// Updating the users in the database
app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photoUrl","about","skills","gender","age","firstName","lastName","password"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length > 10){
            throw new Error("Skills can't be more than 10");
        }

       const updatedData = await User.findByIdAndUpdate(userId, data, {returnDocument: "after",runValidators: true});
       console.log(updatedData);
        res.send("User data updated successfully");
    }catch(err){
        res.status(500).send("Update failed : " + err.message);
    }
})


connectDB().then(()=>{
    console.log("Database connected successfully...");
    
app.listen(3000,() => {
    console.log("Server successfully running on port 3000...");
});
}).catch((err) => {
    console.error("Database can't be connected....");
});
