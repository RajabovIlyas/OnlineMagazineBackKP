const express = require('express');
const mongoose = require('mongoose');
const database = require('../db/database');
const router = express.Router();



// router.get('/', (req, res) => {
//     const pageSize=Number(req.query['pageSize']?req.query['pageSize']:10);
//     const pageSelect=Number(req.query['current']?req.query['current']:1);
//     let quantity;
//     database.computersSection().find({},( (err, result) => {
//         try {
//             if (err) throw err;
//             quantity=result.length;
//         } catch (err) {
//             console.log(err);
//         }
//     }));
//     database.computersSection().find().skip((pageSelect-1)*pageSize).limit(pageSize).exec( (err, result) => {
//         try {
//             if (err) throw err;
//             res.json({quantity,computers_section:result,page:pageSelect});
//         } catch (err) {
//             console.log(err);
//             res.sendStatus(500);
//         }
//     });
// });
//Отправление данных о компьютерах
// router.get('/', (req, res) => {
//     const computerSectionModel = database.computersSection();
//     computerSectionModel.find().limit(10).exec((err, result) => {
//         try {
//             console.log(12);
//             if (err) {
//                 throw err;
//             }
//             res.json({quantity:result.length,computers_section:result,page:1});
//         } catch (e) {
//             console.log(e);
//             res.sendStatus(500);
//         }
//     });
// });

// router.get('/:id', (req, res) => {
//     database.computersSection().findById(req.params.id, (err, result) => {
//         try {
//             if (err) throw err;
//             res.json({quantity:1,computers_section:result,page:1});
//         } catch (err) {
//             console.log(err);
//             res.sendStatus(500);
//         }
//     });
// });





//Получение данных компьютеров
// router.post('', (req, res) => {
//     let computerSectionModel = database.computersSection();
//     let computer = new computerSectionModel({
//         _id: new mongoose.Types.ObjectId(),
//         ...req.body,
//     });
//     computer.save((err) => {
//         try {
//             if (err) {
//                 throw err;
//             }
//             res.sendStatus(200);
//         } catch (e) {
//             console.log(e);
//             res.sendStatus(500);
//         }
//     });
// });

//Изменение данных о компютере
// router.put('/:id', (req, res) => {
//     const computerSectionModel = database.computersSection();
//     database.computersSection().findByIdAndUpdate(req.params.id, {
//         ...req.body,
//     }, (err, result) => {
//         try {
//             if (err) throw err;
//
//             res.sendStatus(200);
//         } catch (err) {
//             console.log(err);
//             res.sendStatus(500);
//         }
//     });
// });

//Удаление данных о компьютере
// router.delete('/:id', (req, res) => {
//     const computerSectionModel = database.computersSection();
//     computerSectionModel.findByIdAndDelete(req.params.id, (err) => {
//         try {
//             if (err) throw err;
//             res.sendStatus(200);
//         } catch (err) {
//             console.log(err);
//             res.sendStatus(500);
//         }
//     });
// });


