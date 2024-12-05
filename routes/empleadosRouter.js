const express = require('express');
const Empleado = require('../models/Empleado');
const router = express.Router();

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Crear nuevos empleados (acepta un array de empleados)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleados creados exitosamente
 */
router.post('/', async (req, res) => {
    const empleados = req.body;
    try {
        const nuevosEmpleados = await Empleado.insertMany(empleados);
        res.status(201).json(nuevosEmpleados);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 */
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Obtener un empleado por su idEmpleado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findOne({ idEmpleado: req.params.id });
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: Actualizar un empleado por su idEmpleado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       404:
 *         description: Empleado no encontrado
 */
router.put('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findOneAndUpdate({ idEmpleado: req.params.id }, req.body, { new: true });
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Eliminar un empleado por su idEmpleado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *       404:
 *         description: Empleado no encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findOneAndDelete({ idEmpleado: req.params.id });
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
