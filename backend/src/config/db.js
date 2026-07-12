const mysql = require("mysql2/promise");
require("dotenv").config();

function getSslConfig() {
    const useSsl = String(process.env.DB_SSL || "").toLowerCase() === "true";

    if (!useSsl) {
        return undefined;
    }

    const sslConfig = {
        rejectUnauthorized:
            String(process.env.DB_SSL_REJECT_UNAUTHORIZED || "").toLowerCase() === "true"
    };

    if (process.env.DB_SSL_CA) {
        sslConfig.ca = process.env.DB_SSL_CA.replace(/\\n/g, "\n");
        sslConfig.rejectUnauthorized = true;
    }

    return sslConfig;
}

function getDatabaseConfig() {
    const databaseUrl =
        process.env.DATABASE_URL ||
        process.env.MYSQL_URL ||
        process.env.MYSQL_PUBLIC_URL;

    const commonConfig = {
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

    if (databaseUrl) {
        const url = new URL(databaseUrl);

        return {
            host: url.hostname,
            user: decodeURIComponent(url.username),
            password: decodeURIComponent(url.password),
            database:
                decodeURIComponent(url.pathname.replace("/", "")) ||
                process.env.DB_NAME ||
                process.env.MYSQLDATABASE,
            port: Number(url.port || 3306),
            ssl: getSslConfig(),
            ...commonConfig
        };
    }

    return {
        host: process.env.DB_HOST || process.env.MYSQLHOST,
        user: process.env.DB_USER || process.env.MYSQLUSER,
        password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
        database: process.env.DB_NAME || process.env.MYSQLDATABASE,
        port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
        ssl: getSslConfig(),
        ...commonConfig
    };
}

const pool = mysql.createPool(getDatabaseConfig());

module.exports = pool;