
const mongoose = require('mongoose');
// Define a schema for URL mapping
const urlSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    originalUrl: {
        type : String,
        required : true,
    },
    shortUrl: {
        type : String,
        required : true,
        // unique : true
    }
    });

    const urlModel = mongoose.model('Url', urlSchema);


module.exports = urlModel;