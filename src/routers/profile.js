const express = require('express');
const userAuthMiddlewares = require('../middlewares/auth');
const { validateEditProfile } = require('../utils/validations');

const profileRouter = express.Router();

profileRouter.patch('/profile/edit', userAuthMiddlewares, (req, res) => {

  try {
    //validation
    if (!validateEditProfile(req)) {
      throw new Error('Invalid Fields');
    }
    const loggedInUser = req.user;

    Object.keys(res.body).forEach((key) => (loggedInUser[key] = res.body[key]));

    loggedInUser.save();
    res.status(200).send({ "status": true, 'message': 'User update successfully' });
  } catch (error) {
    res.status(400).send('ERROR :' + error)
  }
});

profileRouter.get('/profile/view', userAuthMiddlewares, (req, res) => {
  try {
    res.send({ status: true, data: req.user });
  } catch (error) {
    res.status(400).send({ status: false, message: error });
  }
})

module.exports = profileRouter;