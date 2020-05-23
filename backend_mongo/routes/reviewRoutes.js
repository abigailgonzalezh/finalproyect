const express = require('express');
const ReviewModel = require('../models/review');
const app = express();

app.get('/reviews', async (req, res) => {
  const reviews = await ReviewModel.find({});

  try {
    res.send(reviews);
    //console.log(sugerencias);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/reviews/:id', async (req, res) => {
  const reviews = await ReviewModel.find({id: req.params.id});

  try {
    res.send(reviews);
    //console.log(sugerencias);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/reviews', async (req, res) => {
  const reviews = new ReviewModel(req.body);

  try {
    await reviews.save();
    res.send(reviews);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/reviews/:id', async (req, res) => {
  try {
    const reviews = await ReviewModel.findByIdAndDelete(req.params.id)

    if (!reviews) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
    //console.log(err)
  }
})

module.exports = app
