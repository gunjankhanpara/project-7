const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    discription: {
        type : String,
        required : true
    },
    avatar :{
        type :String,
        required : true
    }
});

const crud = mongoose.model('blog',crudScema);


module.exports = crud