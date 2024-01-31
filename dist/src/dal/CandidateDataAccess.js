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
exports.CandidateDataAccess = void 0;
const db_1 = __importDefault(require("../../db"));
class CandidateDataAccess {
    add(candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO candidate (id, user_id, first_name, last_name, gender, age, address, current_job, pasts_occupations, parents, siblings, height, remarks, photos, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';
            yield db_1.default.query(query, [
                candidate.id,
                candidate.user_id,
                candidate.first_name,
                candidate.last_name,
                candidate.gender,
                candidate.age,
                candidate.address,
                candidate.current_job,
                candidate.pasts_occupations,
                candidate.parents,
                candidate.siblings,
                candidate.height,
                candidate.remarks,
                candidate.photos,
                candidate.phone
            ]);
        });
    }
    getOne(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM candidate WHERE id = $1';
            const result = yield db_1.default.query(query, [candidateId]);
            if (result.rows.length === 0) {
                throw new Error(`Candidate with ID ${candidateId} not found`);
            }
            return result.rows[0];
        });
    }
    update(candidateId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'UPDATE candidate SET ';
            const updates = [];
            const values = [];
            Object.entries(updateData).forEach(([key, value], index) => {
                // Enclose column names in double quotes
                const quotedKey = `${key}`;
                updates.push(`${quotedKey} = $${index + 1}`);
                values.push(value);
            });
            query += updates.join(', ') + ' WHERE id = $' + (values.length + 1); // Use values.length for postID
            values.push(candidateId);
            const result = yield db_1.default.query(query, values);
            if (result.rowCount === 0) {
                throw new Error(`Unable to update post with ID ${candidateId}. Post not found.`);
            }
        });
    }
    delete(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM candidate WHERE id = $1';
            const result = yield db_1.default.query(query, [candidateId]);
            if (result.rowCount === 0) {
                throw new Error(`Candidate with ID ${candidateId} not found`);
            }
        });
    }
    getCandidates(from, to, filterText) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        SELECT "id", "user_id", "first_name", "last_name", "gender", "age", "address", "current_job", "pasts_occupations", "parents", "siblings", "height", "remarks", "photos", "phone"
        FROM candidate`;
            let { rows } = yield db_1.default.query(query);
            if (rows.length === 0) {
                throw new Error("No candidates found");
            }
            if (from !== undefined && to !== undefined) {
                rows = rows.filter((row) => row.id >= from && row.id <= to);
            }
            if (filterText) {
                rows = rows.filter((row) => row.first_name.includes(filterText) || row.last_name.includes(filterText));
            }
            return rows;
        });
    }
}
exports.CandidateDataAccess = CandidateDataAccess;
