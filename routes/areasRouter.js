const express = require('express');
const Area = require('../models/Area');
const router = express.Router();

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Crear nuevas áreas (acepta un array de áreas)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Area'
 *     responses:
 *       201:
 *         description: Áreas creadas exitosamente
 */
router.post('/', async (req, res) => {
    const areas = req.body;
    try {
        const nuevasAreas = await Area.insertMany(areas);
        res.status(201).json(nuevasAreas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Obtener todas las áreas
 *     responses:
 *       200:
 *         description: Lista de áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 */
router.get('/', async (req, res) => {
    try {
        const areas = await Area.find();
        res.json(areas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /areas/{id}:
 *   get:
 *     summary: Obtener un área por su idArea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       404:
 *         description: Área no encontrada
 */
router.get('/:id', async (req, res) => {
    try {
        const area = await Area.findOne({ idArea: req.params.id });
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }
        res.json(area);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /areas/{id}:
 *   put:
 *     summary: Actualizar un área por su idArea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: Área actualizada
 *       404:
 *         description: Área no encontrada
 */
router.put('/:id', async (req, res) => {
    try {
        const area = await Area.findOneAndUpdate({ idArea: req.params.id }, req.body, { new: true });
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }
        res.json(area);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /areas/{id}:
 *   delete:
 *     summary: Eliminar un área por su idArea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Área eliminada
 *       404:
 *         description: Área no encontrada
 */
router.delete('/:id', async (req, res) => {
    try {
        const area = await Area.findOneAndDelete({ idArea: req.params.id });
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }
        res.json({ message: 'Área eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
