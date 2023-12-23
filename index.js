const express = require('express');
const shortid = require('shortid');
require('dotenv').config();
require('./config/mongoDB').connectFun();
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4400;


// Middleware to parse JSON in requests
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


// set views file for direct accessing
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static("./assets"));


app.use('/',require('./routers/index'));

// Start the server
app.listen(PORT, (err) => {
    if(err){
        console.log("Server creating problem ");
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
