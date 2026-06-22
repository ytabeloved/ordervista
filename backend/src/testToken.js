require("dotenv").config();
const generateToken = require("./utils/generateToken");

const user = {
    id_usuario: 1,
    email: "admin@ordervista.cl",
    id_rol: 1
};

const token = generateToken(user);

console.log(token);