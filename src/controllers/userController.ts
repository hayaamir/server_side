import { Request, Response } from 'express';
import User from '../models/user';
import { UserService } from "../services/userService";

export class UserController {
    private userService = new UserService();

    async addUser(req: Request, res: Response) {
        const userData = req.body;

        try {
          const user = await this.userService.addUser(userData.credential);
          res.status(201).send({
            message: "Signup was successful",
            user: user,
          });
        } catch (error) {
          res.status(400).send((error as Error).message);
        }
    }

    // async getUser(req: Request, res: Response) {
    //     const userId = +req.params.id;
    //     try {
    //         const user = await this.userService.getUser(userId);
    //         res.status(200).send(user);
    //     } catch(error) {
    //         res.status(400).send((error as Error).message);
    //     }
    // }

    // async updateUser(req: Request, res: Response) {
    //     const userId = +req.params.id;
    //     const userData = req.body;
    //     try {
    //         await this.userService.updateUser(userId, userData);
    //         res.status(200).send({ message: `User ${userId} updated successfully` });
    //     } catch(error) {
    //         res.status(400).send((error as Error).message);
    //     }
    // }

    // async deleteUser(req: Request, res: Response) {
    //     const userId = +req.params.id;
    //     try {
    //         await this.userService.deleteUser(userId);
    //         res.status(200).send({ message: `User ${userId} deleted successfully` });
    //     } catch(error) {
    //         res.status(400).send((error as Error).message);
    //     }
    // }
}