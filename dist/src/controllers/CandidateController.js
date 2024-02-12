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
exports.CandidateController = void 0;
const candidate_1 = __importDefault(require("../models/candidate"));
class CandidateController {
    constructor(candidateService) {
        this.candidateService = candidateService;
    }
    createCandidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateBody = req.body;
            const candidate = new candidate_1.default(candidateBody.id, candidateBody.user_id, candidateBody.first_name, candidateBody.last_name, candidateBody.gender, candidateBody.age, candidateBody.address, candidateBody.current_job, candidateBody.pasts_occupations, candidateBody.parents, candidateBody.siblings, candidateBody.height, candidateBody.remarks, candidateBody.photos, candidateBody.phone);
            try {
                yield this.candidateService.createCandidate(candidate);
                res.status(201).send({ message: `Candidate created successfully` });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    getCandidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateId = +req.params.id;
            try {
                const candidate = yield this.candidateService.getCandidate(candidateId);
                res.status(200).send(candidate);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    updateCandidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateId = +req.params.id;
            const updatedCandidateData = req.body;
            try {
                yield this.candidateService.updateCandidate(candidateId, updatedCandidateData);
                res.status(200).send({ message: 'Candidate updated successfully' });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    deleteCandidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidateId = +req.params.id;
            try {
                yield this.candidateService.deleteCandidate(candidateId);
                res.status(200).send({ message: `Post ${candidateId} deleted successfully` });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    getCandidates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, size, filterText } = req.query;
            try {
                const candidates = yield this.candidateService.getCandidates(+page || 0, +size || 4, filterText);
                res.status(200).send(candidates);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.CandidateController = CandidateController;
