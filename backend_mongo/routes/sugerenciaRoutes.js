const express = require('express');
const sugerenciasModel = require('../models/sugerencias');
const app = express();

app.get('/sugerencias', async (req, res) => {
  const sugerencias = await sugerenciasModel.find({});

  try {
    res.send(sugerencias);
    console.log(sugerencias);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app