const jwt = require ("jsonwebtoken")
const user = require ("../models/usermodel.js")


exports.requireSignin = (req,res,next)  => {
    try {
        const decoded = jwt.verify(
            req.headers.token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(error)
    }
}