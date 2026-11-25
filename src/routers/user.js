const express = require('express');
const User = require('../models/user');


const userRouter = express.Router();

// delete user
userRouter.delete('/user',async (req,res)=>{
const id = req.body.userId;
try {
await User.findByIdAndDelete(id);
    res.status(200).send({'Status':true,'message':'User delete successfully'});
} catch (error) {
    res.status(401).send({'Status':false,'message':error});
}
});

// get all user
userRouter.get('/feed',async (req,res)=>{
try {
const users = await User.find({});
    res.status(200).send(users);
} catch (error) {
    res.status(401).send({'Status':false,'message':error});
}
});



module.exports = userRouter;