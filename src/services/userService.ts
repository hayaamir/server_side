
import { UserDataAccess } from "../dal/userDataAccess";
import User from "../models/user";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_AUTH_CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);

export class UserService {
  private userDataAccess = new UserDataAccess();

  async addUser(credential: string): Promise<User | undefined> {
    try {
      if (credential) {
        const verificationResponse = await verifyGoogleToken(credential);

        if (verificationResponse.error) {
          throw new Error("Error verifying credential");
        }
        const profile = verificationResponse?.payload;
        return await this.userDataAccess.addUser(JSON.stringify(profile));
      }
    } catch (error) {
      throw new Error(`Unable to add user: ${(error as Error).message}`);
    }
  }

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

  async function verifyGoogleToken(token: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_AUTH_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: "Invalid user detected. Please try again" };
    }
   }
