// const Joi = require("joi");

// const addcategory = (req, resp, next) => {
//     const schema = Joi.object({
//         category: Joi.string().max(50).required().messages({ "string.max": "please add valid category", "any.required": "category is required" })
//     });

//     const { error } = schema.validate(req.body);

//     if (error) {
//         return resp.status(400).send({ error: error.details[0].message });
//     }
// }

// module.exports = { addcategory }