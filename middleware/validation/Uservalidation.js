const Joi = require("joi");

const Registration = (req, resp, next) => {
    const schema = Joi.object({
        FirstName: Joi.string().min(5).max(30).required().messages({ "string.min": "Please add valid FirstName ", "string.max": "Please add valid FirstName ", 'any.required': 'FirstName is required' }),
        LastName: Joi.string().min(5).max(30).required().messages({ "string.min": "Please add valid LastName ", "string.max": "Please add valid LastName ", 'any.required': 'LastName is required' }),
        email: Joi.string().email().required().messages({ 'string.email': 'please add valid email', "any.required": "email is required" }),
        ContactNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({ "string.pattern.base": "please add valid contactnumber" }),
        password: Joi.string().min(6).max(10).required().messages({ "string.min": "please add valid password", "string.max": "please add valid password", "any.required": "password is the required" }),
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return resp.status(400).send({ error: error.details[0].message });
    }

    next();
}

const Login = (req, resp, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({ 'string.email': 'please add valid email', "any.required": "email is required" }),
        password: Joi.string().min(6).required().messages({ "string.min": "please add valid password", "string.max": "please add valid password", "any.required": "password is the required" }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return resp.status(400).send({ error: error.details[0].message });
    }
    next();
}

const adduser = (req, resp, next) => {
    const schema = Joi.object({
        FirstName: Joi.string().required().messages({ "string.min": "Please add valid FirstName ", "string.max": "Please add valid FirstName ", 'any.required': 'FirstName is required' }),
        LastName: Joi.string().required().messages({ "string.min": "Please add valid LastName ", "string.max": "Please add valid LastName ", 'any.required': 'LastName is required' }),
        email: Joi.string().email().required().messages({ 'string.email': 'please add valid email', "any.required": "email is required" }),
        ContactNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({ "string.pattern.base": "please add valid contactnumber" }),
        ADDRESS_LINE_1: Joi.string().max(100).required().messages({ "string.max": "please add valid address", "any.required": "address is required" }),
        ADDRESS_LINE_2: Joi.string().max(100).messages({ "string.max": "please add valid address" }),
        city: Joi.string().max(50).required().messages({ "string.max": "please add valid city", "any.required": "city is required" }),
        state: Joi.string().max(50).required().messages({ "string.max": "please add valid state", "any.required": "state is required" }),
        postcode: Joi.string().max(6).required().messages({ "string.max": "please add valid postcode", "any.required": "postcode is required" }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return resp.status(400).send({ error: error.details[0].message });
    }
    next();
}

module.exports = { Registration, Login, adduser }