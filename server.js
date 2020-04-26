const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");

const ProductosRoutes = require("./routes/productos");

var app = express();
app.use(bodyParser.json());

app.use("/productos", ProductosRoutes);



app.listen(3000);