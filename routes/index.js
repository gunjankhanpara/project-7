const express = require('express');

const routes = express.Router();
const uploadfile = require('../config/uploadfile');

const homecontroller = require('../controllers/homeController');
const categorycontroller = require('../controllers/categorycontroller');
const subcategorycontroller = require('../controllers/subcategoryController');
const exsubcategorycontroller = require('../controllers/exsubcategorycontroller');
const productcontroller = require('../controllers/productcontroller');
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
routes.get('/forgot',homecontroller.forgot);
routes.post('/forgotemail',homecontroller.forgotemail);
routes.get('/otp',homecontroller.otp);
routes.post('/postotp',homecontroller.postotp);
routes.get('/newpass',homecontroller.newpass);
routes.post('/postpass',homecontroller.postnew);


// categorycontroller
routes.get('/category',categorycontroller.category);
routes.post('/addcategort',categorycontroller.addcategoty);
routes.get('/delete',categorycontroller.deletdata);
routes.get('/edit',categorycontroller.edit);

// subcategorycontroller
routes.get('/subcategory',passport.checkAuthentication,subcategorycontroller.subcategory);
routes.post('/postscategory',subcategorycontroller.addsub);
routes.get('/subEdit',subcategorycontroller.edit);
routes.post('/postsubedit',subcategorycontroller.editsub);

// etxtrasubcategory
routes.get('/exsubcategory',exsubcategorycontroller.exsubcategory);
routes.post('/postexsubadd',exsubcategorycontroller.exadd);
routes.get('/excatEdit',exsubcategorycontroller.edit);
routes.post('/postExedit',exsubcategorycontroller.editex);

// product 
routes.get('/product',productcontroller.product);
routes.post('/postproduct',uploadfile,productcontroller.addproduct);



module.exports = routes;