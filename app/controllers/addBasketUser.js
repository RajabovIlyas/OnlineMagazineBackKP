const mongoose = require('mongoose');

const BasketTable = mongoose.model('basket');
const BuyTable = mongoose.model('buy');

const getAll = (req, res) => {
    BasketTable.find().then(result => {
        res.json({buy: result});
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
};

const create = (req, res) => {
    BasketTable.create(req.body)
        .then(created=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const remove=(req, res) => {
    BasketTable.findByIdAndDelete(req.params.id).exec()
        .then(result=>res.sendStatus(200))
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const getId=(req, res) => {
    BasketTable.find({idUser:req.params.id}).exec()
        .then(result=>{res.json({basket:result});})
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};

const buyBasket=(req,res)=>{
    console.log(req.params.id);
    const {id}=req.body;
    BasketTable.findById(req.params.id).exec()
        .then(result=>{
            let resu={
                idUser:result.idUser,
                nameUser:result.nameUser,
                surnameUser:result.surnameUser,
                addressUser:result.addressUser,
                name: result.name,
                price: result.price,
            };
            BuyTable.create(resu)
                .then(created=>res.sendStatus(200))
                .catch(err=>{console.log(err);});
        })
        .catch(err=>{console.log(err);});
    BasketTable.findByIdAndDelete(req.params.id).exec()
        .catch(err=>{console.log(err);
            res.sendStatus(500);});
};


module.exports={
    getAll,
    getId,
    create,
    remove,
    buyBasket,
};