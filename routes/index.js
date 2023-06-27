const express = require('express');

const routes = express.Router();
const uploadfile = require('../config/uploadfile');

const homecontroller = require('../controllers/homeController');

const passport = require('passport');

routes.get('/',homecontroller.login);
routes.get('/register',homecontroller.register);
routes.get('/dashboard', passport.checkAuthentication,homecontroller.index);
routes.post('/registerData',homecontroller.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect:'/'}),homecontroller.logdata);
routes.get('/logout',homecontroller.logout);
routes.get('/blog',passport.checkAuthentication,homecontroller.AddBlog);
routes.post('/insertData',uploadfile,homecontroller.blogadd);
routes.get('/viewblog',passport.checkAuthentication,homecontroller.viewblog);
routes.get('/deletedata',homecontroller.deletedata);
routes.get('/editdata',homecontroller.editdata);
routes.get('/myprofile',homecontroller.profile);
routes.post('/profiledata',homecontroller.profiledata);

module.exports = routes;