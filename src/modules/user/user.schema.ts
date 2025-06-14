import Joi from "joi";

export const userSChema = Joi.object({
    email : Joi.string().email().min(3).max(20),
    password : Joi.string().min(8).max(20)
})

export const userUpdateSchema = Joi.object({
    email : Joi.string().email().min(3).max(30),
    name : Joi.string().min(3).max(20),
    role : Joi.string(),
    userId : Joi.string().required()
})