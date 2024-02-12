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
exports.UserDataAccess = void 0;
const user_1 = __importDefault(require("../models/user"));
const db_1 = __importDefault(require("../../db"));
const uuid4_1 = __importDefault(require("uuid4"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserDataAccess {
    addUser(stringProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = JSON.parse(stringProfile);
                const mySecret = process.env.CLIENT_SECRET;
                if (!mySecret) {
                    throw new Error("CLIENT_SECRET environment variable is not set.");
                }
                const checkUserExistenceQuery = `SELECT * FROM users WHERE email = $5`;
                const checkResponse = yield db_1.default.query(checkUserExistenceQuery, [
                    profile.email,
                ]);
                if (checkResponse.rows.length > 0) {
                    throw new Error("User already exists.");
                }
                const id = (0, uuid4_1.default)().split("-").join("");
                yield db_1.default.query("INSERT INTO users (id, first_name, last_name, image, email, jwt_token) VALUES($1, $2, $3, $4, $5, $6)", [
                    id,
                    profile.first_name,
                    profile.last_name,
                    profile.image,
                    profile.email,
                    jsonwebtoken_1.default.sign({ email: profile.email }, mySecret, { expiresIn: "1d" })
                ]);
                const user = new user_1.default(id, profile === null || profile === void 0 ? void 0 : profile.first_name, profile === null || profile === void 0 ? void 0 : profile.last_name, profile === null || profile === void 0 ? void 0 : profile.image, profile === null || profile === void 0 ? void 0 : profile.email, jsonwebtoken_1.default.sign({ email: profile === null || profile === void 0 ? void 0 : profile.email }, mySecret, { expiresIn: "1d" }));
                return user;
            }
            catch (e) {
                console.log(e);
                throw new Error(`error creating user from response: ${e}`);
            }
        });
    }
}
exports.UserDataAccess = UserDataAccess;
