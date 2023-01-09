"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.getOneCamp = exports.getCampaign = exports.updateCampaign = exports.createCampaign = exports.budgetFormat = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const campaignModel_1 = require("../models/campaignModel");
const fs_1 = __importDefault(require("fs"));
exports.budgetFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});
const createCampaign = async (req, res, next) => {
    try {
        const { name, from, to, totalbudget, dailybudget } = req.body;
        const { error } = utils_1.createCampaigns.validate(req.body);
        if (error) {
            console.log(error);
            return res.status(400).json({ error: error.details[0].message });
        }
        const duplicateName = await campaignModel_1.Campaign.findOne({ name: req.body.name });
        if (duplicateName) {
            return res.status(409).json({
                message: "Name has be used already"
            });
        }
        const newTotalBudget = exports.budgetFormat.format(totalbudget);
        const newDailyBudget = exports.budgetFormat.format(dailybudget);
        const campaign = await campaignModel_1.Campaign.create({
            id: (0, uuid_1.v4)(),
            name,
            from,
            to,
            totalbudget: newTotalBudget,
            dailybudget: newDailyBudget,
        });
        res.status(201);
        res.json({
            message: "You have successfully created a campaign.",
            campaign
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
};
exports.createCampaign = createCampaign;
const updateCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, from, to, totalbudget, dailybudget, creativeUpload } = req.body;
        const { error } = utils_1.updateCampaigns.validate(req.body);
        if (error) {
            console.log(error);
            return res.status(400).json({ error: error.details[0].message });
        }
        const Updatecampaign = await campaignModel_1.Campaign.findByIdAndUpdate(id, {
            name,
            from,
            to,
            totalbudget,
            dailybudget,
            creativeUpload
        }, { new: true });
        res.status(201);
        res.json({
            message: "You have successfully updated a campaign.",
            Updatecampaign
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to update',
            route: '/update'
        });
    }
};
exports.updateCampaign = updateCampaign;
const getCampaign = async (req, res, next) => {
    try {
        const campaign = await campaignModel_1.Campaign.find({});
        res.status(201);
        res.json({
            message: "You have successfully retrieved all campaigns",
            campaign
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve',
            route: '/getall'
        });
    }
};
exports.getCampaign = getCampaign;
const getOneCamp = async (req, res, next) => {
    try {
        const { id } = req.params;
        const campaign = await campaignModel_1.Campaign.findById(id);
        res.status(201);
        res.json({
            message: "You have successfully retrieved a campaign.",
            campaign
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to retrieve',
            route: '/getone'
        });
    }
};
exports.getOneCamp = getOneCamp;
const uploadImage = async (req, res, next) => {
    try {
        let fileType = req.file?.mimetype.split("/")[1];
        let newFileName = req.file?.filename + '.' + fileType;
        fs_1.default.rename(`./uploads/${req.file?.filename}`, `./uploads/${newFileName}`, function () {
            console.log("callback");
            res.json({
                messgage: "image uploaded"
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to upload',
            route: '/upload'
        });
    }
};
exports.uploadImage = uploadImage;
