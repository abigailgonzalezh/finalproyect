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

      
});

const Review = mongoose.model("review", ReviewSchema);
module.exports = Review;
