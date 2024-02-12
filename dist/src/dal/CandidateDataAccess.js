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
            const query = 'INSERT INTO candidate (user_id, first_name, last_name, gender, age, address, current_job, pasts_occupations, parents, siblings, height, remarks, photos, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
            yield db_1.default.query(query, [
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
    getCandidates(pageParam, sizeParam, filterText) {
        return __awaiter(this, void 0, void 0, function* () {
            let candidatesQuery = `SELECT * FROM candidate`;
            let totalQuery = `SELECT COUNT(*) FROM candidate`;
            const queryParams = [];
            // Adding filter condition if filterText is provided
            if (filterText) {
                candidatesQuery += ` WHERE first_name LIKE $1 OR last_name LIKE $1`;
                totalQuery += ` WHERE first_name LIKE $1 OR last_name LIKE $1`;
                queryParams.push(`%${filterText}%`);
            }
            // Completing the query for pagination
            candidatesQuery += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
            // Fetching filtered and paginated candidates
            const candidatesResult = yield db_1.default.query(candidatesQuery, [...queryParams, sizeParam, sizeParam * pageParam]);
            // Fetching total number of candidates for pagination
            const totalResult = yield db_1.default.query(totalQuery, queryParams);
            const totalRows = parseInt(totalResult.rows[0].count);
            const totalPages = Math.ceil(totalRows / sizeParam);
            return {
                candidates: candidatesResult.rows,
                totalPages
            };
        });
    }
}
exports.CandidateDataAccess = CandidateDataAccess;
