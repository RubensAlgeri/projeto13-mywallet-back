import joi from 'joi';
const regex = /^[0-9]*,[0-9]{2}$/;
const recordSchema = joi.object({
    value: joi.string().pattern(regex).required(),
    description: joi.string().required()
});

export default recordSchema;