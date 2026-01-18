const express = require('express');

const app = express();



app.use("/hi",(req,res)=>{
    res.send("Hello");
})

app.use("/hello",(req,res)=>{
    res.send(" Welcome..");
})

app.use("/bye",(req,res)=>{
    res.send("Hello, Welcome");
})

app.use("/",(req,res)=>{
    res.send("Hello, Welcome to the port 3000...");
})
app.listen(3000,() => {
    console.log("Server successfully running on port 3000...");
});