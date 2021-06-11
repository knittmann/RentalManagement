const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const validSchema = Joi.object ({
        name: Joi.string()
            .min(5)
            .max(64)
            .required(),
        username: Joi.string()
            .min(4)
            .max(64)
            .required(),
        password: Joi.string()
            .min(4)
            .max(64)
            .required(),
        role: Joi.string()
            .min(5)
            .max(32)
            .required()
    });

    return validSchema.validate(data);
};

const loginValidation = (data) => {
    const validSchema = Joi.object ({
        username: Joi.string()
            .min(4)
            .max(64)
            .required(),
        password: Joi.string()
            .min(4)
            .max(64)
            .required()
    });

    return validSchema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;