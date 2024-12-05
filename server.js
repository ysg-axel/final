const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistema Escolar API',
            version: '1.0.0',
            description: 'API para gestionar empleados, departamentos, encargados y áreas'
        },
        components: {
            schemas: {
                Empleado: {
                    type: 'object',
                    properties: {
                        numeroEmpleado: { type: 'string' },
                        nombre: { type: 'string' },
                        apellido: { type: 'string' },
                        edad: { type: 'integer' },
                        genero: { type: 'string' },
                        departamento: { 
                            type: 'string',
                            description: 'Referencia al Departamento'
                        }
                    }
                },
                Departamento: {
                    type: 'object',
                    properties: {
                        idDepartamento: { type: 'string' },
                        nombre: { type: 'string' },
                        encargado: { type: 'string' },
                        area: { type: 'string' }
                    }
                },
                Encargado: {
                    type: 'object',
                    properties: {
                        idEncargado: { type: 'string' },
                        nombre: { type: 'string' },
                        estudio: { type: 'string' },
                        turno: { type: 'string' }
                    }
                },
                Area: {
                    type: 'object',
                    properties: {
                        idArea: { type: 'string' },
                        nombre: { type: 'string' },
                        edificio: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.error('Error al conectar con MongoDB', error);
});

const empleadosRouter = require('./routes/empleadosRouter');
const departamentosRouter = require('./routes/departamentosRouter');
const encargadosRouter = require('./routes/encargadosRouter');
const areasRouter = require('./routes/areasRouter');

app.use('/empleados', empleadosRouter);
app.use('/departamentos', departamentosRouter);
app.use('/encargados', encargadosRouter);
app.use('/areas', areasRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
