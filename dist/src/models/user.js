"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, first_name, last_name, image, email, jwt_token) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.image = image;
        this.email = email;
        this.jwt_token = jwt_token;
    }
}
exports.default = User;
