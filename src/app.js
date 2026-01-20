const express = require('express');

const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup",async (req,res) => {
    

    const user = new User(req.body);

    try{
        await user.save();
        res.send("User signed up successfully");
    }catch(err){
        res.status(400).send("Error saving to the user:" + err.message);
    }
});

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
app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
       const updatedData = await User.findByIdAndUpdate(userId, data, {returnDocument: "after"});
       console.log(updatedData);
        res.send("User data updated successfully");
    }catch(err){
        res.status(500).send("Something went wrong " + err.message);
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


