import Joi from "joi";


export const createCampaigns = Joi.object().keys({
    name: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    totalbudget: Joi.string().required(),
    dailybudget: Joi.string().required(),
   
})

export const updateCampaigns = Joi.object().keys({
    name: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
    totalbudget: Joi.string(),
    dailybudget: Joi.string(),
   
})