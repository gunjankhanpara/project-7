const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    categoryid: {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subcategory :{
        type : mongoose.Types.ObjectId,
        ref : 'subCategory'
    },
    exsubcategory:{
        type:String,
        require:true
    }
});

const crud = mongoose.model('exsubCategory',crudScema);


module.exports = crud