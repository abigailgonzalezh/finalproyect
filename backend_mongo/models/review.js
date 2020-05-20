const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    id: {
    type: Number, required: true
    },

    estrellas: {
    type: Number, required: true
     },

     review: {
     type: String
      },

      imagen: {
      type: Buffer
       },
});

const Review = mongoose.model("review", ReviewSchema);
module.exports = Review;
