const express = require('express');

const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup",async (req,res) => {

    const user = new User({
        firstName : "Virat",
        lastName : "Kohli",
        emailId : "virat@gmail.com",
        password : "virat123",
        age : 36,
        gender : "male"
    })

    try{
        await user.save();
        res.send("User signed up successfully");
    }catch(err){
        res.status(400).send("Error saving to the user:" + err.message);
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


