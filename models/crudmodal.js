const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const crud = mongoose.model('crud',crudScema);

module.exports = crud