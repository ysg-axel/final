const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
    idEmpleado: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    genero: { type: String, required: true },
    departamento: { type: String, required: true }
});

module.exports = mongoose.model('Empleado', empleadoSchema);
