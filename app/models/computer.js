const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        nameUser: {type: String, required: true},
        commentUser: {type: String, required: true},
        dateSelect: {type: Date, default: Date.now},
    }
);

const computersSectionSchema = mongoose.Schema({
    name: {type: String, required: true},
    rom: {type: String, required: true},
    ram: {type: String, required: true},
    video_card: {type: String, required: true},
    cpu: {type: String, required: true},
    manufacturer: {type: String, required: true},
    img: {
        type: String,
        default: 'https://i.pinimg.com/originals/8a/eb/d8/8aebd875fbddd22bf3971c3a7159bdc7.png'
    },
    price: {type: Number, required: true},
    date_add: {type: Date, default: Date.now},
    kol_rate: {type: Number, default: 0},
    rate: {type: Number, default: 0},
    comments: {
        type: [commentSchema],
        default: undefined
    }
});

mongoose.model('computersSection', computersSectionSchema);