const mongoose = require('mongoose');

const Computers = mongoose.model('computersSection');

const getAll = (req, res) => {
    const pageSize = Number(req.query['pageSize'] ? req.query['pageSize'] : 10);
    const pageSelect = Number(req.query['current'] ? req.query['current'] : 1);
    let quantity;
    Computers.find().exec().then(result => {quantity = result.length}).catch(err => console.log(err));
    Computers.find().skip((pageSelect - 1) * pageSize).limit(pageSize).exec().then(result => {
        res.json({quantity, computers_section: result, page: pageSelect});
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
};

const create = (req, res) => {
    Computers.create(req.body)
        .then(created=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};


const update=(req, res) => {
    Computers.findByIdAndUpdate(req.params.id, {...req.body,}).exec()
        .then(result=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const remove=(req, res) => {
    Computers.findByIdAndDelete(req.params.id).exec()
        .then(result=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const getId=(req, res) => {
    Computers.findById(req.params.id).exec()
        .then(result=>{res.json({quantity:1,computers_section:result,page:1});})
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};


module.exports={
    getAll,
    getId,
    create,
    update,
    remove,
};