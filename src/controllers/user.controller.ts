import { NextFunction, Request, Response } from "express";

import { readAllFromDB, writeAllToDB } from "../helper";

class UserController {
  public async getList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await readAllFromDB();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await readAllFromDB();

      const newUser = {
        id: users[users.length - 1].id ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      users.push(newUser);

      await writeAllToDB(users);

      res.status(201).json(users);
    } catch (err) {
      next(err);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await readAllFromDB();

      const user = users.find((user) => user.id === Number(req.params.userId));

      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "No users with current id or empty db" });
      }
    } catch (err) {
      next(err);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const users = await readAllFromDB();

      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        res
          .status(404)
          .json({ message: "No users with current id or empty db" });
      } else {
        users[userIndex] = { ...req.body, id: userId };

        await writeAllToDB(users);

        res.json(users[userIndex]);
      }
    } catch (err) {
      next(err);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await readAllFromDB();

      const userIndex = users.findIndex(
        (user) => user.id === Number(req.params.userId),
      );

      if (userIndex === -1) {
        res
          .status(404)
          .json({ message: "No users with current id or empty db" });
      } else {
        users.splice(userIndex, 1);

        await writeAllToDB(users);

        res.sendStatus(204);
      }
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
