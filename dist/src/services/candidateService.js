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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateService = void 0;
class CandidateService {
    constructor(candidateAccess) {
        this.candidateDataAccess = candidateAccess;
    }
    createCandidate(candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.candidateDataAccess.add(candidate);
            }
            catch (error) {
                throw new Error(`Unable to add candidate: ${error.message}`);
            }
        });
    }
    getCandidate(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Candidate = yield this.candidateDataAccess.getOne(candidateId);
            if (!Candidate) {
                throw new Error(`candida with ID ${candidateId} not found`);
            }
            return Candidate;
        });
    }
    updateCandidate(candidateId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.candidateDataAccess.update(candidateId, updateData);
            }
            catch (error) {
                throw new Error(`Unable to update candida: ${error.message}`);
            }
        });
    }
    deleteCandidate(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.candidateDataAccess.delete(candidateId);
            }
            catch (error) {
                throw new Error(`Unable to delete candida: ${error.message}`);
            }
        });
    }
    getCandidates(from, to, filterText) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.candidateDataAccess.getCandidates(from, to, filterText);
            }
            catch (error) {
                throw new Error(`Unable to get candidates: ${error.message}`);
            }
        });
    }
}
exports.CandidateService = CandidateService;
