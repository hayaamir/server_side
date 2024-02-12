import express, { Request, Response } from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();
const userController = new UserController();

router.post(
  "/signup",
  async (req: Request, res: Response) => await userController.addUser(req, res)
);
// router.get(
//   "/:id",
//   async (req: Request, res: Response) => await userController.getUser(req, res)
// );
// router.put(
//   "/:id",
//   async (req: Request, res: Response) =>
//     await userController.updateUser(req, res)
// );
// router.delete(
//   "/:id",
//   async (req: Request, res: Response) =>
//     await userController.deleteUser(req, res)
// );

export default router;
