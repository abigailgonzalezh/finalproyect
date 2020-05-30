const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");

const ProductosRoutes = require("./routes/productos");
const ProcedimientosRoutes = require("./routes/procedimientos");
const BalanceRoutes = require("./routes/balance");
const HistorialRoutes = require("./routes/historial");
const CategoriasRoutes = require("./routes/categorias");

var app = express();
app.use(bodyParser.json());

app.use("/products", ProductosRoutes);
app.use("/procedimientos", ProcedimientosRoutes);
app.use("/bal", BalanceRoutes);
app.use("/his", HistorialRoutes);
app.use("/categories", CategoriasRoutes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000);