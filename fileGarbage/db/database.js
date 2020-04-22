const mongoose = require('mongoose');
const config= require('../../config/app');
require('../../app/models/computer');

mongoose.connect(config.mongoUri,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(r => console.log("connect to base successful!"));



