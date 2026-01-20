const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        minlength : 3
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true

    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value.toLowerCase())){
                throw new Error("Gender is not valid");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://hemsichd.org/wp-content/uploads/2021/01/blank-profile-picture.jpeg"
    },
    about : {
        type : String,
        default : "This is an default about of the user"
    },
    skills : {
        type : [String]
    },
    createdAt : {
        type : Date,
    }
}, {
        timestamps : true
    }
)

module.exports =  mongoose.model("User",userSchema);