const mysql = require("mysql2/promise");
require("dotenv").config();

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

// Permite utilizar la conexión desde otros archivos
module.exports = pool;