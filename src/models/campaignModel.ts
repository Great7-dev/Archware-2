import mongoose from "mongoose";

export interface ICampaign extends mongoose.Document {
    name: string;
    from: string;
    to: string;
    totalBudget: number;
    dailyBudget: number;
}

const campaignSchema = new mongoose.Schema({
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
},{
    timestamps:true
});

export const Campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);

