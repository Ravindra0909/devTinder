const express = require('express');

const app = express();



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

app.use("/",(req,res)=>{
    res.send("Hello, Welcome to the port 3000...");
})
app.listen(3000,() => {
    console.log("Server successfully running on port 3000...");
});