const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    tokenId: {type:String, required: true},
    userId: {type:String, required: true},
});

mongoose.model('Token', tokenSchema);