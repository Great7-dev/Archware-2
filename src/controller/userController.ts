import express ,{Request, Response, NextFunction} from 'express';
import {v4 as uuidv4} from 'uuid';
import { createCampaigns, updateCampaigns } from '../utils/utils';
import { Campaign } from '../models/campaignModel';
import fs from "fs"


export const budgetFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
    })


export const createCampaign = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {name, from, to, totalbudget, dailybudget} = req.body;
        
        const {error} = createCampaigns.validate(req.body);
        if(error) {
            console.log(error)
            return res.status(400).json({error: error.details[0].message})
        }
        const duplicateName =  await Campaign.findOne({name: req.body.name})
        if(duplicateName){
            return res.status(409).json({
                message:"Name has be used already"
            })
        }
        
        const newTotalBudget = budgetFormat.format(totalbudget)
        const newDailyBudget = budgetFormat.format(dailybudget)
        const campaign = await Campaign.create({
            id: uuidv4(),
            name,
            from,
            to,
            totalbudget:newTotalBudget,
            dailybudget:newDailyBudget,
        })
        res.status(201);
        res.json({
                message:"You have successfully created a campaign.",
                campaign
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:'failed to create',
            route:'/create'
        })
    }
}

export const updateCampaign = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params
        const {name, from, to, totalbudget, dailybudget, creativeUpload} = req.body;
        const {error} = updateCampaigns.validate(req.body);
        if(error) {
            console.log(error)
            return res.status(400).json({error: error.details[0].message})
        }
        const Updatecampaign = await Campaign.findByIdAndUpdate(id,{
            name,
            from,
            to,
            totalbudget,
            dailybudget,
            creativeUpload
        },
        {new:true})
        res.status(201);
        res.json({
                message:"You have successfully updated a campaign.",
                Updatecampaign
            })
    } catch (err) {
        res.status(500).json({
            message:'failed to update',
            route:'/update'
        })
    }
}

export const getCampaign = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const campaign = await Campaign.find({});
        res.status(201);
        res.json({
                message:"You have successfully retrieved all campaigns",
                campaign
            })
    } catch (err) {
        res.status(500).json({
            message:'failed to retrieve',
            route:'/getall'
        })
    }
}

export const getOneCamp = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findById(id); 
        res.status(201);
        res.json({
                message:"You have successfully retrieved a campaign.",
                campaign
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:'failed to retrieve',
            route:'/getone'
        })
    }
}

export const uploadImage = async(req:Request, res:Response, next:NextFunction) => {
    try {
        let fileType = req.file?.mimetype.split("/")[1];
       let newFileName = req.file?.filename + '.' + fileType
        fs.rename(`./uploads/${req.file?.filename}`, `./uploads/${newFileName}`, function() {
           res.json({
         messgage:"image uploaded"
  });
  })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:'failed to upload',
            route:'/upload'
        })
    }
}