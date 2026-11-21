const mongose = require('mongoose');


const connectDb = async ()=>{
await mongose.connect('mongodb://localhost:27017/');
};

module.exports = connectDb;
