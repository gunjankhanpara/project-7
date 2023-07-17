const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    category: {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subcategory :{
        type :  mongoose.Types.ObjectId,
        ref : 'subCategory'
    },
    exsubcategory:{
        type: mongoose.Types.ObjectId,
        ref : 'exsubCategory'
    },
    title: {
        type : String,
        require:true
    },
    que: {
        type : String,
        require:true
    },
    price: {
        type : String,
        require:true
    },
    discription: {
        type : String,
        require:true
    },
    avatar:{
        type : String,
        require : true
    }
});

const crud = mongoose.model('product',crudScema);


module.exports = crud