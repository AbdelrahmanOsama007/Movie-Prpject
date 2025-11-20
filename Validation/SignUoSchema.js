const Joi = require('joi');
const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    age: Joi.number().required().min(18).max(100),
    gender: Joi.string().required(),
    favoriteMovies: Joi.array().items(Joi.string())
    .default([]),
    watchlist: Joi.array().items(Joi.string()).
    default([]),
});
// bycrypt password


module.exports = {
    body: signUpSchema,
}

