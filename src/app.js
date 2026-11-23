const express = require('express');
const connectDb = require('./config/database');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const {signupValidator} = require('./utils/validations');
const app = express();
app.use(express.json());


connectDb().then(()=>{
  console.log('connected mongoose');
  app.listen(7777,()=>{
    console.log('working with 7777 port');
});
}).catch((e)=>{
    console.log('fail to connect mongoose');
});

// signup user
app.post('/signup',async (req,res)=>{
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
app.post('/login',async (req,res)=>{
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
const value =  await bcrypt.compare(password, user.password);

if (value) {
     res.status(201).send({'Status':true,'message':'Login User successfully'});
} else {
    throw new Error('Invalid credential');
   
    
}
} catch (error) {
    res.status(401).send({'Status':false,'message':error.message});
}
});

// delete user
app.delete('/user',async (req,res)=>{
const id = req.body.userId;
try {
await User.findByIdAndDelete(id);
    res.status(200).send({'Status':true,'message':'User delete successfully'});
} catch (error) {
    res.status(401).send({'Status':false,'message':error});
}
});

// get all user
app.get('/feed',async (req,res)=>{
try {
const users = await User.find({});
    res.status(200).send(users);
} catch (error) {
    res.status(401).send({'Status':false,'message':error});
}
});

// login api


