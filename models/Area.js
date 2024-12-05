const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    idArea: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    edificio: { type: String, required: true }
});

module.exports = mongoose.model('Area', areaSchema);
