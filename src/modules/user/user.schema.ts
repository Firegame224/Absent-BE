import Joi from "joi";

export const userSChema = Joi.object({
    email : Joi.string().email().min(3).max(20),
    password : Joi.string().min(8).max(20)
})