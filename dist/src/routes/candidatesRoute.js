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
const express_1 = __importDefault(require("express"));
const CandidateController_1 = require("../controllers/CandidateController");
const candidateService_1 = require("../services/candidateService");
const CandidateDataAccess_1 = require("../dal/CandidateDataAccess");
const router = express_1.default.Router();
const candidateController = new CandidateController_1.CandidateController(new candidateService_1.CandidateService(new CandidateDataAccess_1.CandidateDataAccess()));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield candidateController.createCandidate(req, res); }));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield candidateController.getCandidate(req, res); }));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield candidateController.updateCandidate(req, res); }));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield candidateController.deleteCandidate(req, res); }));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield candidateController.getCandidates(req, res); }));
exports.default = router;
