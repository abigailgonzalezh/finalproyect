const express = require('express');
const sugerenciasModel = require('../models/sugerencias');
const app = express();

app.get('/sugerencias', async (req, res) => {
  const sugerencias = await sugerenciasModel.find({});

  try {
    res.send(sugerencias);
    //console.log(sugerencias);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/sugerencias', async (req, res) => {
  const sugerencias = new sugerenciasModel(req.body);

  try {
    await sugerencias.save();
    res.send(sugerencias);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/sugerencias/:id', async (req, res) => {
  try {
    const sugerencias = await sugerenciasModel.findByIdAndDelete(req.params.id)

    if (!sugerencias) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
    //console.log(err)
  }
})

module.exports = app