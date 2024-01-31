import {Request, Response} from 'express';
import Candidate from '../models/candidate';
import {CandidateService} from "../services/candidateService";


export class CandidateController {
    private candidateService: CandidateService;

    constructor(candidateService: CandidateService) {
        this.candidateService = candidateService;
    }

    async createCandidate(req: Request, res: Response): Promise<void> {
        const candidateBody = req.body;
        const candidate = new Candidate(
            candidateBody.id,
            candidateBody.user_id,
            candidateBody.first_name,
            candidateBody.last_name,
            candidateBody.gender,
            candidateBody.age,
            candidateBody.address,
            candidateBody.current_job,
            candidateBody.pasts_occupations,
            candidateBody.parents,
            candidateBody.siblings,
            candidateBody.height,
            candidateBody.remarks,
            candidateBody.photos,
            candidateBody.phone
        );
        try {
            await this.candidateService.createCandidate(candidate);
            res.status(201).send({message: `Candidate created successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getCandidate(req: Request, res: Response): Promise<void> {
        const candidateId = +req.params.id;
        try {
            const candidate = await this.candidateService.getCandidate(candidateId);
            res.status(200).send(candidate);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updateCandidate(req: Request, res: Response): Promise<void> {
        const candidateId = +req.params.id;
        const updatedCandidateData = req.body;

        try {
            await this.candidateService.updateCandidate(candidateId, updatedCandidateData);
            res.status(200).send({message: 'Candidate updated successfully'});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deleteCandidate(req: Request, res: Response): Promise<void> {
        const candidateId = +req.params.id;
        try {
            await this.candidateService.deleteCandidate(candidateId);
            res.status(200).send({message: `Post ${candidateId} deleted successfully`});
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getCandidates(req: Request, res: Response): Promise<void> {
        const { from, to, filterText } = req.body;

        try {
            const candidates = await this.candidateService.getCandidates(from, to, filterText);
            res.status(200).send(candidates);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
}
