const express = require("express");

const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName emailId age gender skills photoUrl about";

userRouter.get("/user/request/recieved", userAuth, async (req,res) => {
    try{
       const loggedInUserId = req.user._id;
       const recievedRequests = await ConnectionRequest.find({toUserId : loggedInUserId,status : "interested"}).populate("fromUserId",USER_SAFE_DATA);

       res.json({ message : "Data fetched successfully", data : recievedRequests });
        

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.get("/user/connections",userAuth, async (req,res) => {
    try{
        const loggedInUserId = req.user._id;

        const connections = await ConnectionRequest.find({
            $or : [
                {
                    fromUserId : loggedInUserId,
                    status : "accepted"
                },
                {
                    toUserId : loggedInUserId,
                    status : "accepted"
                }
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

       const data =  connections.map(connection => {
            if(connection.fromUserId._id.equals(loggedInUserId)){
                return connection.toUserId;
            }
            return connection.fromUserId;
        })

        res.json({ message : "Data fetched successfully", data  });

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

userRouter.get("/user/feed",userAuth, async (req,res) => {
    try{

        // Get all connections (sent + received) of the logged-in user
        const loggedInUserId = req.user._id;
        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUserId},
                {toUserId : loggedInUserId}
            ]
        }).select("fromUserId toUserId status").populate("fromUserId","firstName").populate("toUserId","firstName");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId._id.toString());
            hideUsersFromFeed.add(req.toUserId._id.toString());
        })

        const users = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsersFromFeed)}},
                {_id : {$ne : loggedInUserId}}
            ]
        }).select(USER_SAFE_DATA);

        res.send(users);
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = userRouter;