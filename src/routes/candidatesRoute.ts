import express, { Request, Response } from 'express';
import { CandidateController } from "../controllers/CandidateController";
import { CandidateService } from "../services/candidateService";
import { CandidateDataAccess } from "../dal/CandidateDataAccess";

const router = express.Router();
const candidateController = new CandidateController(new CandidateService(new CandidateDataAccess()));

router.post('/', async (req: Request, res: Response) => await candidateController.createCandidate(req,res));
router.get('/:id', async (req: Request, res: Response) => await candidateController.getCandidate(req,res));
router.put('/:id', async (req: Request, res: Response) => await candidateController.updateCandidate(req,res));
router.delete('/:id', async (req: Request, res: Response) => await candidateController.deleteCandidate(req,res));
router.get('/', async (req: Request, res: Response) => await candidateController.getCandidates(req, res));

export default router;
