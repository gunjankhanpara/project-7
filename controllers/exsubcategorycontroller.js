const categorytbl = require('../models/categorymodel');
const subcatogorytbl = require('../models/subcategorymodal');
const exsubaddtbl = require('../models/exsubmodel');

const exsubcategory = async(req,res)=>{
    try {
        let category = await categorytbl.find({})
        let subcategory = await subcatogorytbl.find({})
        let exsubadd = await exsubaddtbl.find({}).populate('subcategory').populate('categoryid')
        console.log(exsubadd);
        return res.render('exsubcategory',{
            category,
            subcategory,
            exsubadd
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

const exadd = async(req,res)=>{
    try {
        const{category,subcategory,exsubcategory} = req.body;
        let ex_sub_category = await exsubaddtbl.create({
            categoryid :category,
            subcategory :subcategory,
            exsubcategory:exsubcategory,
        })
        if(ex_sub_category){
            console.log("data add");
            return res.redirect('back')
        }
        else
        {
            console.log("data not add");
            return res.redirect('back')
        }

    } catch (error) {
       console.log(error);
       return res.redirect('back') 
    }
}

const edit = async(req,res)=>{
    try {
        let id = req.query.id
        let category = await categorytbl.find({});
        let subcategory = await subcatogorytbl.find({});
        let exsubcategory = await exsubaddtbl.find({}).populate('categoryid').populate('subcategory')
        let single = await exsubaddtbl.findById(id);
        console.log(single);
        if(single){
            return res.render('exsubcatEdit',{
                single,
                category,
                subcategory,
                exsubcategory
            })
        }
    } 
    catch (err) {
        console.log(err);
        return false
    }
}

const editex = async(req,res)=>{
    try {
        const {editid,exsubcategory} = req.body
        let editdata = await exsubaddtbl.findByIdAndUpdate(editid,{
            exsubcategory : exsubcategory
        })
        if(editdata){
            console.log("Edit Successfull");
            return res.redirect('exsubcategory');
        }
        else{
            console.log("Edit Error");
            return res.redirect('back')
        }
    } 
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    exsubcategory,
    exadd,
    edit,
    editex
}