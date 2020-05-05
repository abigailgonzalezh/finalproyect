const path = require('path');
const Sugerencia = require('../models/sugerencias');

//exports.index = function (req, res) {
   // res.sendFile(path.resolve('views/sharks.html'));
//};

exports.create = function (req, res) {
    var newSugerencia = new Sugerencia(req.body);
    console.log(req.body);
    newSugerencia.save(function (err) {
            if(err) {
            res.status(400).send('Unable to save sugerencia to database');
        } else {
            res.redirect('/sugerencias/getsugerencia');
        }
  });
};

exports.list = function (req, res) {
    Sugerencia.find({}).exec(function (err, sugerencia) {
            if (err) {
                    return res.send(500, err);
            }
            res.render('getugerencia', {
                    sharks: sharks
         });
    });
};