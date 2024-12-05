const express = require('express');
const Encargado = require('../models/Encargado');
const router = express.Router();

/**
 * @swagger
 * /encargados:
 *   post:
 *     summary: Crear nuevos encargados (acepta un array de encargados)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Encargado'
 *     responses:
 *       201:
 *         description: Encargados creados exitosamente
 */
router.post('/', async (req, res) => {
    const encargados = req.body;  // Espera un array de encargados
    try {
        const nuevosEncargados = await Encargado.insertMany(encargados);
        res.status(201).json(nuevosEncargados);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /encargados:
 *   get:
 *     summary: Obtener todos los encargados
 *     responses:
 *       200:
 *         description: Lista de encargados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Encargado'
 */
router.get('/', async (req, res) => {
    try {
        const encargados = await Encargado.find();
        res.json(encargados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /encargados/{id}:
 *   get:
 *     summary: Obtener un encargado por su idEncargado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado
 *     responses:
 *       200:
 *         description: Encargado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encargado'
 *       404:
 *         description: Encargado no encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        const encargado = await Encargado.findOne({ idEncargado: req.params.id });
        if (!encargado) {
            return res.status(404).json({ message: 'Encargado no encontrado' });
        }
        res.json(encargado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /encargados/{id}:
 *   put:
 *     summary: Actualizar un encargado por su idEncargado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Encargado'
 *     responses:
 *       200:
 *         description: Encargado actualizado
 *       404:
 *         description: Encargado no encontrado
 */
router.put('/:id', async (req, res) => {
    try {
        const encargado = await Encargado.findOneAndUpdate({ idEncargado: req.params.id }, req.body, { new: true });
        if (!encargado) {
            return res.status(404).json({ message: 'Encargado no encontrado' });
        }
        res.json(encargado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /encargados/{id}:
 *   delete:
 *     summary: Eliminar un encargado por su idEncargado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado
 *     responses:
 *       200:
 *         description: Encargado eliminado
 *       404:
 *         description: Encargado no encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        const encargado = await Encargado.findOneAndDelete({ idEncargado: req.params.id });
        if (!encargado) {
            return res.status(404).json({ message: 'Encargado no encontrado' });
        }
        res.json({ message: 'Encargado eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
