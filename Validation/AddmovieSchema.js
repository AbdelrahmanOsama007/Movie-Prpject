const Joi = require("joi");
const addMovieSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    rating: Joi.number().required(),
    image: Joi.string().required(),
    actors: Joi.string().required(),
    realeseDate: Joi.date().required(),
    duration: Joi.number().required(),
    language: Joi.string().required(),
}).required();

module.exports = { body : { addMovieSchema } };