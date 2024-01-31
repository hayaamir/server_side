import { DataAccessInterface } from '../dal/CandidateDataAccessInterface';
import Candidate from '../models/candidate';

export class CandidateService {
    private candidateDataAccess: DataAccessInterface<Candidate>;

    constructor(candidateAccess: DataAccessInterface<Candidate>) {
        this.candidateDataAccess = candidateAccess;
    }

    async createCandidate(candidate: Candidate): Promise<void> {
        try {
            await this.candidateDataAccess.add(candidate);
        } catch (error) {
            throw new Error(`Unable to add candidate: ${(error as Error).message}`);
        }
    }

    async getCandidate(candidateId: number): Promise<Candidate> {
        const Candidate = await this.candidateDataAccess.getOne(candidateId);
        if (!Candidate) {
            throw new Error(`candida with ID ${candidateId} not found`);
        }
        return Candidate;
    }

    async updateCandidate(candidateId: number, updateData: Partial<Candidate>): Promise<void> {
        try {
            await this.candidateDataAccess.update(candidateId, updateData);
        } catch (error) {
            throw new Error(`Unable to update candida: ${(error as Error).message}`);
        }
    }

    async deleteCandidate(candidateId: number): Promise<void> {
        try {
            await this.candidateDataAccess.delete(candidateId);
        } catch (error) {
            throw new Error(`Unable to delete candida: ${(error as Error).message}`);
        }
    }

    async getCandidates(from?: number, to?: number, filterText?: string): Promise<Candidate[]> {
        try {
            return await this.candidateDataAccess.getCandidates(from, to, filterText);
        } catch (error) {
            throw new Error(`Unable to get candidates: ${(error as Error).message}`);
        }
    }
}
