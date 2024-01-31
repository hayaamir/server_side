import pool from "../../db";
import Candidate from "../models/candidate";
import {DataAccessInterface} from "./CandidateDataAccessInterface";

export class CandidateDataAccess implements DataAccessInterface<Candidate>{
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

    async getCandidates(from?: number, to?: number, filterText?: string): Promise<Candidate[]> {
        const query = `
        SELECT "id", "user_id", "first_name", "last_name", "gender", "age", "address", "current_job", "pasts_occupations", "parents", "siblings", "height", "remarks", "photos", "phone"
        FROM candidate`;

        let {rows} = await pool.query(query);

        if (rows.length === 0) {
            throw new Error("No candidates found");
        }

        if (from !== undefined && to !== undefined) {
            rows = rows.filter((row) => row.id >= from && row.id <= to);
        }

        if (filterText) {
            rows = rows.filter((row) => row.first_name.includes(filterText) || row.last_name.includes(filterText))
        }

        return rows as Candidate[];
    }
}


