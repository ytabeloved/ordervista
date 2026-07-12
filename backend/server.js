const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const menuRoutes = require("./src/routes/menuRoutes");

const addressRoutes = require("./src/routes/addressRoutes");

const orderRoutes = require("./src/routes/orderRoutes");

const orderTypeRoutes = require("./src/routes/orderTypeRoutes");

app.use("/api/menu", menuRoutes);

app.use("/api/addresses", addressRoutes);

app.use("/api/order-types", orderTypeRoutes);

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});