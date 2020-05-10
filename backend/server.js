const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");

const ProductosRoutes = require("./routes/productos");
const ProcedimientosRoutes = require("./routes/procedimientos");


var app = express();
app.use(bodyParser.json());

app.use("/productos", ProductosRoutes);
app.use("/procedimientos", ProcedimientosRoutes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000);