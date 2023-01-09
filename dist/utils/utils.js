"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCampaigns = exports.createCampaigns = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCampaigns = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    from: joi_1.default.string().required(),
    to: joi_1.default.string().required(),
    totalbudget: joi_1.default.string().required(),
    dailybudget: joi_1.default.string().required(),
});
exports.updateCampaigns = joi_1.default.object().keys({
    name: joi_1.default.string(),
    from: joi_1.default.string(),
    to: joi_1.default.string(),
    totalbudget: joi_1.default.string(),
    dailybudget: joi_1.default.string(),
});
