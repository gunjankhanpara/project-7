const passport = require('passport');

const crudtbl = require('../models/crudmodal')
const passportlocal = require('passport-local').Strategy;

passport.use(new passportlocal({
    usernameField:'email'
},async(email,password,done)=>{
    try{
        let user = await crudtbl.findOne({email:email})
        console.log(user);
        if(!user || user.password != password){
            console.log("email and password not correct");
            return done(null,false)  
        }
        return done(null,user)
    }
    catch(err){
        if(err){
            return done(null,false);
        }
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
});

passport.deserializeUser(async(id,done)=>{
    try{
        let user = await crudtbl.findById(id)
        return done(null,user)
    }
    catch(err){
        if(err){
            return done(null,false);
        }
    }
});
 passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/')
}

passport.setAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.users = req.user
    }
    return next();
}