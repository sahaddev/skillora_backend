var validator = require('validator');
const User = require('../models/user');


const signupValidator =async (req)=>{
    
    const {firstName,email,password} = req.body;
    const existingUser = await User.findOne({ email });
    if(!firstName){
        throw new Error('Invalid Name');
    }else if(!validator.isStrongPassword(password)){
        throw new Error('Password required');
    }else if(!validator.isEmail(email)){
        throw new Error('Required valid email');
    }else if(existingUser != null){
        throw new Error('Email already exist');
    }
}

module.exports = {signupValidator,};