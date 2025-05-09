const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const register = async(req, res)=>{
    const {name, phone, email, password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(402).json({message : "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            name,
            phone,
            email,
            password : hashedPassword
        })
        await user.save();
        res.status(200).json({success:true ,message : "User registered successfully"});

    }catch(error){
        res.status(500).json({success:false, message : error.message});
    }
}

const login = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user =await User.findOne({email});
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message : "Invalid Password"});
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn : '2d'}); 
        return res.status(200).json({success:true, token, user:{_id: user._id, name:user.name}});

    } catch (error) {
        res.status(500).json({success:false, message : error.message});
    }
}

module.exports = {register, login}