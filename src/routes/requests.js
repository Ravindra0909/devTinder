const express = require("express");

const requestsRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestsRouter.post("/sendConnectionRequest",userAuth, async (req,res) => {
    try{
        const user = req.user;
        res.send("Connection request sent from " + user.firstName);
    }catch(err){
        res.status(500).send("Error : " + err.message);
    }
});

module.exports = requestsRouter;