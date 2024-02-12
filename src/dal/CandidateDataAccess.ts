import pool from "../../db";
import Candidate from "../models/candidate";
import {DataAccessInterface} from "./CandidateDataAccessInterface";

export class CandidateDataAccess implements DataAccessInterface<Candidate> {
    async add(candidate: Candidate): Promise<void> {
        const query = 'INSERT INTO candidate (user_id, first_name, last_name, gender, age, address, current_job, pasts_occupations, parents, siblings, height, remarks, photos, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)'
        await pool.query(query, [
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
        ])
    }

    async getOne(candidateId: number): Promise<Candidate> {
        const query = 'SELECT * FROM candidate WHERE id = $1';
        const result = await pool.query(query, [candidateId]);

        if (result.rows.length === 0) {
            throw new Error(`Candidate with ID ${candidateId} not found`);
        }

        return result.rows[0];
    }

    async update(candidateId: number, updateData: Partial<Candidate>): Promise<void> {
        let query = 'UPDATE candidate SET ';
        const updates: string[] = [];
        const values: (string | number | string[])[] = [];


        Object.entries(updateData).forEach(([key, value], index) => {
            // Enclose column names in double quotes
            const quotedKey = `${key}`;
            updates.push(`${quotedKey} = $${index + 1}`);
            values.push(value);
        });

        query += updates.join(', ') + ' WHERE id = $' + (values.length + 1); // Use values.length for postID

        values.push(candidateId);

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            throw new Error(`Unable to update post with ID ${candidateId}. Post not found.`);
        }
    }

    async delete(candidateId: number): Promise<void> {
        const query = 'DELETE FROM candidate WHERE id = $1'
        const result = await pool.query(query, [candidateId]);
        if (result.rowCount === 0) {
            throw new Error(`Candidate with ID ${candidateId} not found`);
        }
    }

    async getCandidates(pageParam: number, sizeParam: number, filterText?: string): Promise<{
        candidates: Candidate[];
        totalPages: number;
    }> {

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
        const candidatesResult = await pool.query(candidatesQuery, [...queryParams, sizeParam, sizeParam * pageParam ]);

        // Fetching total number of candidates for pagination
        const totalResult = await pool.query(totalQuery, queryParams);
        const totalRows = parseInt(totalResult.rows[0].count);

        const totalPages = Math.ceil(totalRows / sizeParam);

        return {
            candidates: candidatesResult.rows,
            totalPages
        };
    }
}


