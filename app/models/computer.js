const mongoose = require('mongoose');

const computersSectionSchema = mongoose.Schema({
    name: {type:String, required: true},
    rom: {type:String, required: true},
    ram: {type:String, required: true},
    video_card: {type:String, required: true},
    cpu: {type:String, required: true},
    manufacturer: {type:String, required: true},
    img: {type: String, default: 'http://atom96.ru/wp-content/uploads/2017/10/%D0%BD%D0%B5%D1%82-%D1%84%D0%BE%D1%82%D0%BE-300x300.png'},
    price: {type:Number, required: true},
    date_add:{type:Date,default: Date.now},
    rate:{type:Number,default: 0},
});

mongoose.model('computersSection', computersSectionSchema);