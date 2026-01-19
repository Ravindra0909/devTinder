const express = require('express');

const app = express();

app.get("/user",(req,res,next)=>{
    //res.send("Response!!!");
    next();
    console.log("hello")
})

app.get("/user",(req,res,next)=>{
    res.send("Response2!!!");
})


app.use("/hi",(req,res)=>{
    res.send("Hello");
})

 app.get("/user",(req,res) => {
    console.log(req.query);
    res.send({
        firstName : "Ravindra",
        lastName : "Koppada"
    });
 })

 app.post("/user",(req,res) => {
    console.log("Saved data to the databases");
    res.send("Data Successfully saved to the databases");
 })
 app.delete("/user",(req,res) => {
    res.send("Deleted Successfully");
 })


app.listen(3000,() => {
    console.log("Server successfully running on port 3000...");
});