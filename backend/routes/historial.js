const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mysqlConnection.query("SELECT * FROM historial_trigger_view;", (err, rows, fields) =>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})

module.exports = Router;
