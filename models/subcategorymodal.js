const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    categoryid: {
        type : mongoose.Types.ObjectId,
        ref : 'Category'
    },
    subcategory:{
        type : String,
        require:true
    }
});

const crud = mongoose.model('subCategory',crudScema);


module.exports = crud