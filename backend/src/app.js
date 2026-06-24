const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderTypeRoutes = require("./routes/orderTypeRoutes");

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

// Rutas principales de la API
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order-types", orderTypeRoutes);
module.exports = app;