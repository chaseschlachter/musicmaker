const Joi = require('joi');

module.exports.eventSchema = Joi.object({
    event: Joi.object({
        event_name: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    }).required()
});

//module.exports.artistSchema = Joi.object({
//    event: Joi.object({
//        email: Joi.string().required(),
//        location: Joi.string().required(),
//        genre: Joi.string().required(),
//        about: Joi.string(),
//        size: Joi.number(),
//    }).required()
//});
