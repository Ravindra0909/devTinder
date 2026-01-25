const express = require("express");

const requestsRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestsRouter.post("/request/send/:status/:userId",userAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        const allowedStatuses = ["interested","ignored"];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({
                message : "Invalid status value " + status
            })
        }
        if(fromUserId.toString() === toUserId.toString()){
            return res.status(400).json({
                message : "You cannot send connection request to yourself"
            });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId,
                    toUserId
                },
                {
                    fromUserId : toUserId,
                    toUserId : fromUserId
                }
            ]
        });
        if(existingConnectionRequest){
            return res.status(400).json({
                message : "Connection request already exists between these users"
            });
        }

        const toUser = await User.findById(toUserId);

        if(!toUser){
            return res.status(404).json({
                message : "User not found"
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status 
        });
        const data = await connectionRequest.save();
        res.json({
            message : "Connection request sent successfully",
            data : data
        });

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});


requestsRouter.post("/request/review/:status/:requestId",userAuth, async (req,res) => {
    try{
        const {requestId, status} = req.params;
        const loggedInUserId = req.user._id;
        const allowedStatuses = ["accepted","rejected"];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({
                message : "Invalid status value " + status
            })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUserId,
            status : "interested"
        })
        if(!connectionRequest){
            return res.status(404).json({
                message : "Connection request not found"
            });
        }
        connectionRequest.status = status;

        const data = await connectionRequest.save();
        res.json({
            message : `Connection request ${status} successfully`,
            data : data
        });

    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});



module.exports = requestsRouter;