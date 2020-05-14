const mongoose = require('mongoose');

const buyerSectionSchema = mongoose.Schema({
    idUser:{type:String, required: true},
    nameUser:{type:String, required: true},
    surnameUser:{type:String, required: true},
    addressUser:{type:String, required: true},
    name: {type:String, required: true},
    price: {type:Number, required: true},
    date_buy:{type:Date,default: Date.now},
});

mongoose.model('buy', buyerSectionSchema);