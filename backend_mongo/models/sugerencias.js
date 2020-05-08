const mongoose = require('mongoose');

const SugerenciaSchema = new mongoose.Schema({
    cliente: { 
    type: String, required: true 
    },

    peticion: { 
    type: String, required: true
     },
});

const Sugerencia = mongoose.model("sugerencias", SugerenciaSchema);
module.exports = Sugerencia;

