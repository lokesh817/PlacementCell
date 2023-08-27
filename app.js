const express = require('express');
const http = require('http');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
const cookieParser = require('cookie-parser');
const axios=require('axios');

const dotenv=require("dotenv");
dotenv.config()
const port = process.env.PORT || 8000;
const app=express();

const server = http.createServer();
app.use(cookieParser());
// using express layout
app.use(expressLayouts);

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//middleware used
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'assets')));

//setup default route 
app.use('/',require('./routes/index_route'));


//set up view engine and set path views
app.set('view engine','ejs');
app.set('views','./views');
// app.use(expressLayouts);
//using bootstrap
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(port, (err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(`Server running at http://${port}`);
    });
})
.catch((err)=>{
    console.log("not able to connect with datbase");
})

