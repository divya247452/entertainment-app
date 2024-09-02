const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const dotenv = require('dotenv')
dotenv.config()

// Authenticate the user
const protect = async (req, res, next) => {
    // read the JWT from cookie
    const token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            .json({message: "Not Authorised, token failed"})
        }
    } else {
        res.status(401)
        .json({message: "Not Authorised, no token"})
    }
}


module.exports =  protect;