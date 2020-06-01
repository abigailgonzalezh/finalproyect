const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mysqlConnection.query("SELECT * FROM categorias_view;", (err, rows, fields) =>{
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
    const nombre = req.body.nombre4;
    var values = [
        nombre
    ];
    mysqlConnection.query("INSERT INTO categorias (nombre) VALUES ('" + nombre + "');", (err, rows, fields) =>{
        if(!err){
            //res.send(rows);
        }else{
            console.log(err);
        }
    })
})

Router.delete("/", (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const id = req.body.id;
    console.log(id);
    mysqlConnection.query("DELETE FROM categorias WHERE id="+id+";", (err, rows, fields) =>{
        if(!err){
            //res.send(rows);
        }else{
            console.log(err);
        }
    })
})

Router.put("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.body.id;
    const nombre = req.body.nombre4;

    mysqlConnection.query("UPDATE categorias SET nombre = '"+nombre+"' WHERE id = "+id+";", (err, rows, fields) => {
        if(!err){
            console.log("Edit");
        }else{
            console.log(err);
        }
    })
})

module.exports = Router;
