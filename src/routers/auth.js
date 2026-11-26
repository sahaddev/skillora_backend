const express = require('express');
const {signupValidator} = require('../utils/validations');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

const authRouter = express.Router();

// signup user
authRouter.post('/signup',async (req,res)=>{
const {password,firstName,lastName,email} = req.body;

try {
// validate data
await signupValidator(req);
// hash password
const hashpassword =await  bcrypt.hash(password, 10);
 const userObj = new User({
    firstName,
    lastName,
    email,
    password: hashpassword
});
await userObj.save();
    res.status(201).send({'Status':true,'message':'User created successfully'});
} catch (error) {
    res.status(401).send({'Status':false,'message':error.message});
}
});

// signup user
authRouter.post('/login',async (req,res)=>{
const {password,email} = req.body;
try {
// validate data
if(!password || !email){
    throw new Error('Invalid credential');
}
const user = await  User.findOne({email:email});
if (!user) {
    throw new Error('Invalid credential');
}
// check password
const isPasswordValid =  await bcrypt.compare(password, user.password);

if (isPasswordValid) {
    const token = await user.getJWT();
    res.cookie('token',token);
     res.status(201).send({'Status':true,'message':'Login User successfully'});
} else {
    throw new Error('Invalid credential');
}
} catch (error) {
    res.status(401).send({'Status':false,'message':error.message});
}
});

authRouter.post('logout',(req,res)=>{
 req.session = null;
 res.json({status :true,message:'User logOut successfully'});
});

module.exports = authRouter;