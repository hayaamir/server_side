"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    constructor() {
        this.userService = new userService_1.UserService();
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
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            try {
                const user = yield this.userService.addUser(userData.credential);
                res.status(201).send({
                    message: "Signup was successful",
                    user: user,
                });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
