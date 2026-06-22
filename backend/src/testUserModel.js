const userModel = require("./models/userModel");

async function test() {
    try {
        const users = await userModel.getAllUsers();

        console.log(users);
    } catch (error) {
        console.error(error.message);
    }
}

test();