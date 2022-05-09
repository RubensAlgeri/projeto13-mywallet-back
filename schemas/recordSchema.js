import joi from 'joi';
const regex = /^[0-9]*,[0-9]{2}$/;
const recordSchema = joi.object({
    value: joi.string().pattern(regex).required(),
    description: joi.string().required(),
    type: joi.string().valid('entrada', "saída"),
    date: joi.string().pattern(/^[0-9]{2}\/[0-9]{2}$/)
});

export default recordSchema;