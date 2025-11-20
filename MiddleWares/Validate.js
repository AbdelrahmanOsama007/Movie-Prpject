const ApiError = require('../utils/ApiError.js');
const validate = (schema) => {
    return (req, res, next) => {
        const entries = [...Object.keys(schema)];
        entries.forEach((key, id, arr) => {
            const { error } = schema[key].validate(req[key]);
            if (error) {
                throw new ApiError(error.message, 400);
            }
        });
        next();
    };
};

module.exports = validate;
