const mongoose = require('mongoose');

const BuyTable = mongoose.model('buy');

const getAll = (req, res) => {
    BuyTable.find().then(result => {
        res.json({buy: result});
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
};

const create = (req, res) => {
    BuyTable.create(req.body)
        .then(created=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const remove=(req, res) => {
    BuyTable.findByIdAndDelete(req.params.id).exec()
        .then(result=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const getId=(req, res) => {
    console.log(req.params.id);
    BuyTable.find({idUser:req.params.id}).exec()
        .then(result=>{res.json({buy:result});})
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};


module.exports={
    getAll,
    getId,
    create,
    remove,
};