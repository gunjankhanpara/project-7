const categorytbl = require('../models/categorymodel');
const subcatogorytbl = require('../models/subcategorymodal');
const exsubaddtbl = require('../models/exsubmodel');
const producttbl = require('../models/productmodel');
const fs = require('fs');


const product = async (req, res) => {
    try {

        let category = await categorytbl.find({});
        let subcatogory = await subcatogorytbl.find({});
        let exsubadd = await exsubaddtbl.find({});
        let product = await producttbl.find({}).populate('subcategory').populate('category').populate('exsubcategory');
        return res.render('product',{
            category,
            subcatogory,
            exsubadd,
            product
        })
       

    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }

}

const addproduct = async (req, res) => {
    try {
        const {category, subcategory, exsubcategory, title, que, price, discription,avatar} = req.body;
        let img = "" ;
        if(req.file){
            img = req.file.path;
        }
            let productadd = await producttbl.create({
                category: category,
                subcategory: subcategory,
                exsubcategory: exsubcategory,
                title: title,
                que: que,
                price: price,
                discription: discription,
                avatar : img
            });
            if (productadd) {
                console.log("product add succesfully");
                return res.redirect('back');
            }
            else {
                console.log("data can not add")
                return res.redirect('back');
            }
        }
         catch (error) {
        console.log(error);
        return false
    }
}


module.exports = {
    product,
    addproduct,
    
}