import fsp from "node:fs/promises";
import path from "node:path";

import { IUser } from "./interfaces/user.interface";

const PATH_TO_DB = path.join(path.resolve("db"), "db.json");
console.log(PATH_TO_DB);

const readAllFromDB = async (): Promise<IUser[]> => {
  try {
    const data = await fsp.readFile(PATH_TO_DB, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    throw new Error("Server error! Can not read data from db");
  }
};

const writeAllToDB = async (users: IUser[]): Promise<void> => {
  try {
    await fsp.writeFile(PATH_TO_DB, JSON.stringify(users), {});
  } catch (e) {
    console.log(e);
    throw new Error("Server error! Can not write data to db");
  }
};

export { readAllFromDB, writeAllToDB };
