Categorytbl = require('../models/categorymodel');

const category = async(req,res)=>{
   
        let user = await Categorytbl.find({});
        if(user){
            return res.render('category',{
                user,
                single :""
            });
        }
        else{
            console.log("data not found");
        }
    
}

const addcategoty = async (req,res)=>{
    const {editid,name}= req.body
    try {
        if(editid){
            if(!name){
                console.log("plz enter data");
                return res.redirect('back');
            }
            let updata = await Categorytbl.findByIdAndUpdate(editid,{
                category : name
            });
            if(updata){
                console.log(" update category");
                return res.redirect('category')
            }
            else
            {
                console.log("data id not updat");
                return res.redirect('back')
            }

        }
        else{
            if(!name){
                console.log("plz enter data");
                return res.redirect('back');
            }
            let addc = await Categorytbl.create({
                category : name
            });
            if(addc){
                console.log("categort add succesfully");
                return res.redirect('back')
            }
            else
            {
                console.log("data id not add");
                return res.redirect('back')
            }
        }
       
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

const deletdata = async (req,res)=>{
    try{
        let id = req.query.id;
        let deletedata = await Categorytbl.findByIdAndDelete(id);

        if (deletedata) {
            console.log("data delete sucsefully");
            req.flash('danger', 'Data delete sucsefully');
            return res.redirect('back');
        }
        else {
            console.log("data not found");
            return res.redirect('back');
        }

    }catch(err){
        console.log(err);
        return false;
    }
}

const edit = async(req,res)=>{
        try {
            let data = await Categorytbl.find({});
            let id = req.query.id;
            let single = await Categorytbl.findById(id);
            if (single) {
                return res.render('category', {
                    single,
                    user : data

                });
            }
            
        } catch (error) {
            console.log(error);
            return res.redirect('back');
        }
}

module.exports = {
    category,
    addcategoty,
    deletdata,
    edit,
}