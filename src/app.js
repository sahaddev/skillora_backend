const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user');
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


app.post('/user',async (req,res)=>{
const userObj = User(req.body);
console.log(userObj);
try {
await userObj.save();
    res.status(201).send({'Status':true,'message':'User created successfully'});
} catch (error) {
    res.status(401).send({'Status':false,'message':error});
}
});



app.delete('/user',async (req,res)=>{
const id = req.body.userId;
console.log(id);
try {
await User.findByIdAndDelete(id);
    res.status(200).send({'Status':true,'message':'User delete successfully'});
} catch (error) {
    res.status(401).send({'Status':false,'message':error});
}
});

app.get('/feed',async (req,res)=>{
try {
const users = await User.find({});
    res.status(200).send(users);
} catch (error) {
    res.status(401).send({'Status':false,'message':error});
}
});
