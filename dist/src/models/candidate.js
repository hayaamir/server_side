"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Candidate {
    constructor(id, user_id, first_name, last_name, gender, age, address, current_job, pasts_occupations, parents, siblings, height, remarks, photos, phone) {
        this.id = id;
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.age = age;
        this.address = address;
        this.current_job = current_job;
        this.pasts_occupations = pasts_occupations;
        this.parents = parents;
        this.siblings = siblings;
        this.height = height;
        this.remarks = remarks;
        this.photos = photos;
        this.phone = phone;
    }
}
exports.default = Candidate;
