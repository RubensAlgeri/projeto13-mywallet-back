import recordSchema from "../schemas/recordSchema.js";

export function validaRegistro (req, res, next) {
const validation = recordSchema.validate(req.body);
if (validation.error) {
    return res.status(422).send(validation.error.details.map(details=>details.message));
}
next()
}