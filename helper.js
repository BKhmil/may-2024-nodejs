const fsp = require("node:fs/promises");
const path = require("node:path");

const PATH_TO_DB = path.join(__dirname, "db.json");

const readAllFromDB = async () =>  {
    try {
        const data = await fsp.readFile(PATH_TO_DB, "utf-8");
        return JSON.parse(data);
    } catch(e) {
        console.log(e);
        throw new Error("Server error! Can not read data from db");
    }
}

const writeAllToDB = async (users) => {
    try {
        await fsp.writeFile(PATH_TO_DB, JSON.stringify(users), {});
    } catch(e) {
        console.log(e);
        throw new Error("Server error! Can not write data to db");
    }
}

module.exports = {
    readAllFromDB,
    writeAllToDB
}