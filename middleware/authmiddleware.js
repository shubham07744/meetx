const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).json({success:false, message : "Token not Provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({success:false, message : "Invalid Token"});
        }
        const user =await User.findById(decoded._id).select("-password");
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({success:false,message:"Invalid Token", error : error.message});
    }
}

module.exports = verifyUser;