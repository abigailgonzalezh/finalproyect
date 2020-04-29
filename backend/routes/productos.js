const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mysqlConnection.query("SELECT productos.id as id, productos.nombre as nombre, precio_compra, precio_venta, cantidad, categorias.nombre as categorias_id FROM productos INNER JOIN categorias ON categorias_id = categorias.id;", (err, rows, fields) =>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})



module.exports = Router;    