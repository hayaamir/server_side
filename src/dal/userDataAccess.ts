import User from "../models/user";
import pool from "../../db";

import uuid4 from "uuid4";
import jwt from "jsonwebtoken";

export class UserDataAccess {

  async addUser(stringProfile: string): Promise<User> {
    try {
      const profile = JSON.parse(stringProfile);
      const mySecret = process.env.CLIENT_SECRET;
      if (!mySecret) {
        throw new Error("CLIENT_SECRET environment variable is not set.");
      }

      const checkUserExistenceQuery = `SELECT * FROM users WHERE email = $5`;
      const checkResponse = await pool.query(checkUserExistenceQuery, [
        profile.email,
      ]);
      if (checkResponse.rows.length > 0) {
        throw new Error("User already exists.");
      }

      const id = uuid4().split("-").join("");
       await pool.query(
        "INSERT INTO users (id, first_name, last_name, image, email, jwt_token) VALUES($1, $2, $3, $4, $5, $6)",
        [
          id,
          profile.first_name,
          profile.last_name,
          profile.image,
          profile.email,
          jwt.sign({ email: profile.email }, mySecret, { expiresIn: "1d" })
        ]
      );

      const user = new User(
        id,
        profile?.first_name,
        profile?.last_name,
        profile?.image,
        profile?.email,
        jwt.sign({ email: profile?.email }, mySecret, { expiresIn: "1d" }),
      );

      return user;
    } catch (e) {
      console.log(e);
      throw new Error(`error creating user from response: ${e}`);
    }
  }

  // getUser(userId: number): User {
  //     const user = this.db.getUser(userId);
  //     if (!user) {
  //         throw new Error(`User with ID ${userId} not found`);
  //     }
  //     return user;
  // }

  // updateUser(userId: number, updateData: Partial<User>): void {
  //     const existingUser = this.db.getUser(userId);
  //     if (!existingUser) {
  //         throw new Error(`User with ID ${userId} not found`);
  //     }
  //     this.db.updateUser(userId, updateData);
  // }

  // deleteUser(userId: number): void {
  //     const existingUser = this.db.getUser(userId);
  //     if (!existingUser) {
  //         throw new Error(`User with ID ${userId} not found`);
  //     }
  //     this.db.deleteUser(userId);
  // }
}
