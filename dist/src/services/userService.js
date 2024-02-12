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
exports.UserService = void 0;
const userDataAccess_1 = require("../dal/userDataAccess");
const google_auth_library_1 = require("google-auth-library");
const GOOGLE_AUTH_CLIENT_ID = process.env.CLIENT_ID;
const client = new google_auth_library_1.OAuth2Client(GOOGLE_AUTH_CLIENT_ID);
class UserService {
    constructor() {
        this.userDataAccess = new userDataAccess_1.UserDataAccess();
        //   async getUser(userId: number): Promise<User> {
        //     const user = await this.userDataAccess.getUser(userId);
        //     if (!user) {
        //       throw new Error(`User with ID ${userId} not found`);
        //     }
        //     return user;
        //   }
        //   async updateUser(userId: number, updateData: Partial<User>): Promise<void> {
        //     try {
        //       await this.userDataAccess.updateUser(userId, updateData);
        //     } catch (error) {
        //       throw new Error(`Unable to update user: ${(error as Error).message}`);
        //     }
        //   }
        //   async deleteUser(userId: number): Promise<void> {
        //     try {
        //       await this.userDataAccess.deleteUser(userId);
        //     } catch (error) {
        //       throw new Error(`Unable to delete user: ${(error as Error).message}`);
        //     }
        //   }
    }
    addUser(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (credential) {
                    const verificationResponse = yield verifyGoogleToken(credential);
                    if (verificationResponse.error) {
                        throw new Error("Error verifying credential");
                    }
                    const profile = verificationResponse === null || verificationResponse === void 0 ? void 0 : verificationResponse.payload;
                    return yield this.userDataAccess.addUser(JSON.stringify(profile));
                }
            }
            catch (error) {
                throw new Error(`Unable to add user: ${error.message}`);
            }
        });
    }
}
exports.UserService = UserService;
function verifyGoogleToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_AUTH_CLIENT_ID,
            });
            return { payload: ticket.getPayload() };
        }
        catch (error) {
            return { error: "Invalid user detected. Please try again" };
        }
    });
}
