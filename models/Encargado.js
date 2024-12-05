const mongoose = require('mongoose');

const encargadoSchema = new mongoose.Schema({
    idEncargado: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    estudio: { type: String, required: true },
    turno: { type: String, required: true }
});

module.exports = mongoose.model('Encargado', encargadoSchema);
