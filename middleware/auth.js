const jwt = require("jsonwebtoken");
async function authenticate(req, res, next) {
    try {
        const {authorization} = req.headers;

        const token = authorization;

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        const {id, email} = decoded;

        req.id = id;
        req.email = email;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("Authentication failed");
    }
}

module.exports = authenticate;
