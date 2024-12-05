const express = require('express');
const Departamento = require('../models/Departamento');
const router = express.Router();

/**
 * @swagger
 * /departamentos:
 *   post:
 *     summary: Crear nuevos departamentos (acepta un array de departamentos)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Departamento'
 *     responses:
 *       201:
 *         description: Departamentos creados exitosamente
 */
router.post('/', async (req, res) => {
    const departamentos = req.body;
    try {
        const nuevosDepartamentos = await Departamento.insertMany(departamentos);
        res.status(201).json(nuevosDepartamentos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departamento'
 */
router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /departamentos/{id}:
 *   get:
 *     summary: Obtener un departamento por su idDepartamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: Departamento no encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findOne({ idDepartamento: req.params.id });
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.json(departamento);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /departamentos/{id}:
 *   put:
 *     summary: Actualizar un departamento por su idDepartamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Departamento'
 *     responses:
 *       200:
 *         description: Departamento actualizado
 *       404:
 *         description: Departamento no encontrado
 */
router.put('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findOneAndUpdate({ idDepartamento: req.params.id }, req.body, { new: true });
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.json(departamento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /departamentos/{id}:
 *   delete:
 *     summary: Eliminar un departamento por su idDepartamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento eliminado
 *       404:
 *         description: Departamento no encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findOneAndDelete({ idDepartamento: req.params.id });
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.json({ message: 'Departamento eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
