const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const cors = require('cors');
Router.all('*', cors());

Router.get("/", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mysqlConnection.query("SELECT * FROM procedimientos_view;", (err, rows, fields) =>{
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
    mysqlConnection.query("SELECT * FROM ventas_view;", (err, rows, fields) =>{
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
    mysqlConnection.query("SELECT * FROM historial_view;", (err, rows, fields) =>{
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
