const express = require('express');

const app = express();

app.listen(7777,()=>{
    console.log('working with 7777 port');
});

app.use('/test',(req,res)=>{
    res.send('Skillora here');
});

app.use(express.json());