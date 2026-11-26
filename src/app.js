const express = require('express');
const connectDb = require('./config/database');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routers/auth');
const connectionRouter = require('./routers/connection');
const profileRouter = require('./routers/profile');
const userRouter = require('./routers/user');

connectDb().then(() => {
  console.log('connected mongoose');
  app.listen(7777, () => {
    console.log('working with 7777 port');
  });
}).catch((e) => {
  console.log('fail to connect mongoose');
});

app.use('/', authRouter, connectionRouter, profileRouter, userRouter);