const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sugerencia = new Schema ({
    cliente: { type: String, required: true },
    sugerencia: { type: String, required: true },
});

module.exports = mongoose.model('Sugerencia', Sugerencia)
