const jwt = require('jsonwebtoken')

const middlewareValidarJWT = (req, res, next) => {
    const token = req.headers["authorization"]
    jwt.verify(token, "$chave$", (err, userInfo) => {
        if (err) {
            res.status(403).end()
            return
        }
        req.userInfo = userInfo
        next()
    });
};

module.exports = middlewareValidarJWT