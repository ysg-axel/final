const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
    idDepartamento: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    encargado: { type: String, required: true },
    area: { type: String, required: true }
});

module.exports = mongoose.model('Departamento', departamentoSchema);
