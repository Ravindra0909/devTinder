const validator = require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName,emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

const validateProfileData = (req) => {

    const allowedEdit = ["firstName","lastName","age","emailId","about","skills"];

    const isAllowedEdit = Object.keys(req.body).every((field) => allowedEdit.includes(field));

    return isAllowedEdit;

}

module.exports = {
    validateSignupData,
    validateProfileData
};