const mongoose = require("mongoose");


const connectDB = async () => {
    await  mongoose.connect("mongodb+srv://Ravi:VYATS0kGknxXipEM@namastenode.jc3sh1x.mongodb.net/devTinder");
};

module.exports = connectDB;
