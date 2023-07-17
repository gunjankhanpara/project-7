const categorytbl = require('../models/categorymodel');
const subcatogorytbl = require('../models/subcategorymodal');

const subcategory = async(req,res)=>{
    try{
        let category = await categorytbl.find({})
        let addsubcatTbl = await subcatogorytbl.find({}).populate('categoryid')
        return res.render('subcategory',{
            category,
            addsubcatTbl
        })
    }catch(error){
        console.log(error);
        return res.redirect('back')
    }
}

const addsub = async(req,res)=>{
    try{
        const{category,subcategory} = req.body
        let sub_category = await subcatogorytbl.create({
            categoryid:category,
            subcategory :subcategory
        })
        if(sub_category){
            console.log("data add");
            return res.redirect('back')
        }
        else
        {
            console.log("data not add");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}
const edit = async(req,res)=>{
    let category = await categorytbl.find({})
    // let subcatTbl = await SubCategorytbl.find({}).populate('categoryId')
    let id = req.query.id
    try {
        let single = await subcatogorytbl.findById(id);
        console.log(single);
        if(single){
            return res.render('subcatEdit',{
                single,
                category,
                // subcatTbl
            })
        }
    } 
    catch (err) {
        console.log(err);
        return false
    } 
}

const editsub = async(req,res)=>{
    try {
        const {editid,subcategory} = req.body
        let editdata = await subcatogorytbl.findByIdAndUpdate(editid,{
            subcategory : subcategory
        })
        if(editdata){
            console.log("Edit Done");
            return res.redirect('/subcategory');
        }
        else{
            console.log("Edit error");
            return res.redirect('back')
        }
    } 
    catch (err) {
        console.log(err);
        return false
    }
}

module.exports = {subcategory,addsub,edit,editsub}