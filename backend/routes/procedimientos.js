const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const cors = require('cors');
Router.all('*', cors());

Router.get("/", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mysqlConnection.query("select sum(totalVenta) as venta, date(fecha) as dia from historial WHERE fecha >= DATE_SUB(NOW(),INTERVAL 7 DAY) group by dia;", (err, rows, fields) =>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})

Router.get("/ventas", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mysqlConnection.query("select sum(totalVenta) as venta from historial WHERE fecha >= DATE_SUB(NOW(),INTERVAL 7 DAY);", (err, rows, fields) =>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})

Router.get("/historial", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mysqlConnection.query("select * from historial WHERE fecha >= DATE_SUB(NOW(),INTERVAL 7 DAY);", (err, rows, fields) =>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})

Router.post("/", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const id = req.body.id1;
    const cantidad = req.body.cantidad1;
    mysqlConnection.query("CALL ventas ('" + id + "', "+ cantidad +");", (err, rows, fields) =>{
        if(!err){
            //res.send(rows);
        }else{
            console.log(err);
        }
    })
})

module.exports = Router;
