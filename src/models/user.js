const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        lowercase : true,
        trim : true,
        validate(value){
            if(validator.isEmail(value) === false){
                throw new Error("Email is not valid");
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(validator.isStrongPassword(value) === false){
                throw new Error("Password is not strong enough");
            }
        }
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
        default : "https://hemsichd.org/wp-content/uploads/2021/01/blank-profile-picture.jpeg",
        validate(value){
            if(validator.isURL(value) === false){
                throw new Error("Photo URL is not valid");
            }
        }
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

userSchema.methods.getJWT = async function() {
    const user = this;
    
    const token =  await jwt.sign({_id : user._id}, "DEVTINDER@SECRET",{expiresIn : "1d"}); 
    return token;
}

userSchema.methods.verifyPassword = async function(password){
    const user = this;
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    return isPasswordMatch;
}
module.exports =  mongoose.model("User",userSchema);