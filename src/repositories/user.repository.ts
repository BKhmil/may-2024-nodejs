import { readAllFromDB, writeAllToDB } from "../helper";
import { IUser } from "../interfaces/user.interface";

class UserRepository {
  public async read(): Promise<IUser[]> {
    return await readAllFromDB();
  }

  public async write(users: IUser[]): Promise<void> {
    return await writeAllToDB(users);
  }
}

export const userRepository = new UserRepository();
