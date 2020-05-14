const mongoose = require('mongoose');

const User = mongoose.model('Users');

const getAll = (req, res) => {
    const pageSize = Number(req.query['pageSize'] ? req.query['pageSize'] : 10);
    const pageSelect = Number(req.query['current'] ? req.query['current'] : 1);
    let quantity;
    User.find().exec().then(result => {quantity = result.length}).catch(err => console.log(err));
    User.find().skip((pageSelect - 1) * pageSize).limit(pageSize).exec().then(users => {
        res.json({quantity, users, page: pageSelect});
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
};

const create = (req, res) => {
    const data=req.body;
    User.findOne({email:data.email}).then(body=>{
            if(!body){
                User.create(data)
                    .then(()=>res.sendStatus(200))
                    .catch(err=>{console.log(err);
                        res.sendStatus(500);});
            }else{
                res.sendStatus(412);
            }});
};


const update=(req, res) => {
    User.findByIdAndUpdate(req.params.id, {...req.body,}).exec()
        .then(()=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const remove=(req, res) => {
    User.findByIdAndDelete(req.params.id).exec()
        .then(()=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const getId=(req, res) => {
    User.findById(req.params.id).exec()
        .then(user=>{res.json({user});})
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