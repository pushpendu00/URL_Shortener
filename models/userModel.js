
const mongoose = require('mongoose');

// Define a schema for URL mapping
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    userName: {
        type : String,
        required : true,
        // unique : true
    },
    password : {
        type : String,
        required : true
    }
});


const userModel = mongoose.model('User', userSchema);


module.exports = userModel;