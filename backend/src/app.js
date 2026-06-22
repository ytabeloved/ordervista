const express = require("express");
const cors = require("cors");

const app = express();

// Permite recibir solicitudes desde el frontend
app.use(cors());

// Permite trabajar con datos en formato JSON
app.use(express.json());

// Ruta de prueba para verificar que la API está funcionando
app.get("/", (req, res) => {
    res.json({
        mensaje: "API OrderVista funcionando"
    });
});

module.exports = app;