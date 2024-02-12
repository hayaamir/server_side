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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const userController = new userController_1.UserController();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield userController.addUser(req, res); }));
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
exports.default = router;
