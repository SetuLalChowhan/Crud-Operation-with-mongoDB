function validation(schema) {
    return async function (req, res, next) {
        try {
            await schema.validate(req.body);
            next();
        } catch (err) {
            console.log(err);
            res.status(400).send(err.errors[0]);
        }
    };
}

module.exports = validation;
