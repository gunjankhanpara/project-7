const crudtbl = require('../models/crudmodal');

const blogtbl = require('../models/blogmodel'); 
const fs = require('fs');

const login = async (req,res)=>{
    if(res.locals.users){
       return res.redirect('dashboard');
    }
    return res.render('loging');
}

const index = async (req,res)=>{
    return res.render('dashboard');
}

const register =  async (req,res)=>{
    return res.render('register')
}

const registerData = async (req,res)=>{
    const {name,email,password}= req.body;
    try{
        if(!name || !email || !password)
        {
          console.log("plz enter the details");  
        }  
        else{
            let data = await crudtbl.create({
                name : name,
                email : email,
                password : password
            })
            if(data){
                console.log("regiter seccesfully");
                return res.redirect('back');
            }
            else{
                console.log("data is not add");
                return res.redirect('back')
            }
        }     

    }catch(err){
        console.log(err);
        return res.redirect('back')
    }
    
}

const logdata = async (req,res)=>{
    return res.redirect('dashboard')
}

const logout = async (req,res)=>{
    req.logout((err)=>{
        console.log(err);
        return false
    })
    return res.redirect('/');
}

const AddBlog = async (req,res)=>{
    return res.render('addblog',{
        single : ""
    });
}

const blogadd = async (req,res)=>{
    try{
        const {editid, title , discription , avatar } = req.body;
        if(editid){
            if(req.file){
                if (!title || !discription) {
                    console.log("Enter All data");
                    return res.redirect('back')
                }
                let deleterecord = await crudtbl.findById(editid);
                if(deleterecord){
                    fs.unlinkSync(deleterecord.avatar)
                }
                else
                {
                     console.log("data not deleted");
                }
                let img = "";
                if(req.file){
                    img = req.file.path;
                }
                let data = await blogtbl.findByIdAndUpdate(editid,{
                    title: title,
                    discription: discription,
                    avatar : img
                })
                if (data) {
                    console.log("Data Successfully edit");
                    return res.redirect('back');
                }
                else {
                    console.log(err);
                    return res.redirect('back');
                }
            }
            else{
                let img = "";

                let nochange = await blogtbl.findById(editid);
                if(nochange){
                    img = nochange.avatar
                }
                let data = await blogtbl.findByIdAndUpdate(editid,{
                    title: title,
                    discription: discription,
                    avatar : img
                })
                if (data) {
                    console.log("Data Successfully edit");
                    req.flash('success','Record Successfully updated');
                    return res.redirect('back');
                }
                else {
                    console.log(err);
                    return res.redirect('back');
                }
            }
            }
        else{
            let img = "";
            if(req.file){
                img = req.file.path
            }
            if (!title || !discription) {
                console.log("Enter All data");
                return res.redirect('back')
            }
            let data = await blogtbl.create({
                title: title,
                discription: discription,
                avatar : img
            })
            if (data) {
                console.log("Data Successfully Add");
                req.flash('success','Record Successfully Add');
                return res.redirect('back');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }

        }
    }
    catch(err){
        console.log(err);
        return false
    }
    
}

const viewblog = async (req,res)=>{
try{
    let viewdata = await blogtbl.find({})
        if(viewdata){
            return res.render('viewblog',{
                viewdata
            });
        }
        else{
            console.log("record not found");
            return false
        }
    }
    catch(err){
        console.log(err);
        return false
    }
}

const deletedata = async (req,res)=>{
    try{

        let id = req.query.id;
        let deletedata = await blogtbl.findByIdAndDelete(id);
        let deleterecord = await crudtbl.findById(id);
        if(deleterecord){
            fs.unlinkSync(deleterecord.avatar)
        }
        else
        {
            console.log("data not deleted");
        }
        if(deletedata){
            console.log("data delete sucsefully");
            req.flash('danger','Data delete sucsefully');
            return res.redirect('back');
        }
        else{
            console.log("data not found");
            return res.redirect('back');
        }

    }
    catch(err){
        console.log(err);
        return false
    }

}
const editdata = async (req,res)=>{
        try{
            let id = req.query.id;
            let single = await blogtbl.findById(id);
            if(single){
                return res.render('addblog',{
                    single
                });
            }
        }
        catch(err){
            console.log(err);
            return false
        }
}

const profile = async (req,res)=>{
    return res.render('profile')
}

const profiledata = async (req,res)=>{
    const {editid , name , password} = req.body;
    if(!name || !password){
        console.log("data reqired compullsery");
        return res.redirect('back')
    }
    let profile = await crudtbl.findByIdAndUpdate(editid,{
        name : name ,
        password : password,
    });
    if(profile){
        console.log("profile updata");
        req.flash('success','profile Updated succesfully');
        return res.redirect('back');
    }
    else{
        console.log("data not found");
        return res.redirect('back');
    }
}
module.exports = {
    login,
    register,
    registerData,
    logdata,
    index,
    logout,
    AddBlog,
    viewblog,
    blogadd,
    deletedata,
    editdata,
    profile,
    profiledata
   
}