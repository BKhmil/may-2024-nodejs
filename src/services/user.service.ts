import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.read();
  }

  public async create(dto: Partial<IUser>): Promise<IUser[]> {
    const users = await userRepository.read();

    const newUser = {
      id: users[users.length - 1].id ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };

    users.push(newUser);

    await userRepository.write(users);

    return users;
  }

  public async getById(userId: number): Promise<IUser> {
    const users = await userRepository.read();

    const user = users.find((user) => user.id === Number(userId));

    if (!user) {
      throw new ApiError("No users with current id or empty db", 404);
    }

    return user;
  }

  public async updateById(
    dto: Omit<IUser, "id">,
    userId: number,
  ): Promise<IUser> {
    const users = await userRepository.read();

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new ApiError("No users with current id or empty db", 404);
    }

    users[userIndex] = { ...dto, id: userId };

    await userRepository.write(users);

    return users[userIndex];
  }

  public async deleteById(userId: number): Promise<void> {
    const users = await userRepository.read();

    const userIndex = users.findIndex((user) => user.id === Number(userId));

    if (userIndex === -1) {
      throw new ApiError("No users with current id or empty db", 404);
    }

    users.splice(userIndex, 1);

    await userRepository.write(users);
  }
}

export const userService = new UserService();
