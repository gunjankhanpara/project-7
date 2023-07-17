const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    category: {
        type : String,
        required : true
    }
});

const crud = mongoose.model('Category',crudScema);


module.exports = crud