const express = require('express');
const port = 9000;
const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded());

const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const passport = require('passport');

const session = require('express-session');
const passportlocal = require('./config/passportlocal');

app.use(session({
    secret:'gunjan',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication)
 

const db = require('./config/mongoose');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("server start on port:-"+port);
})