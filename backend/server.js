const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const menuRoutes = require("./src/routes/menuRoutes");

app.use("/api/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});