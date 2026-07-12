const express = require("express");
const cors = require("cors");

const app = require("./src/app");

const menuRoutes = require("./src/routes/menuRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const orderTypeRoutes = require("./src/routes/orderTypeRoutes");
const commandRoutes = require("./src/routes/commandRoutes");
const reportRoutes = require("./src/routes/reportRoutes");

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origen no permitido por CORS"));
    },
    credentials: true
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "OrderVista API running"
    });
});

app.use("/api/menu", menuRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/order-types", orderTypeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/commands", commandRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});