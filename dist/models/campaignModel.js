"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const campaignSchema = new mongoose_1.default.Schema({
    name: {
        unique: true,
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    totalbudget: {
        type: String,
        required: true,
    },
    dailybudget: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
exports.Campaign = mongoose_1.default.model("Campaign", campaignSchema);
