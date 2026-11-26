const express = require('express');
const bcrypt = require('bcrypt');
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

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

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

profileRouter.patch('/profile/password', userAuthMiddlewares, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // check the password
    if (!oldPassword || !newPassword) {
      throw new Error('check required fields');
    }
    const loggedInUser = req.user;
    const userPassword = loggedInUser.password;

    const isPasswordValid = await bcrypt.compare(oldPassword, userPassword);

    // update the password

    if (!isPasswordValid) {
      throw new Error('Invalid Old password');
    } else {
      const hashpassword = await bcrypt.hash(newPassword, 10);
      // save new password
      loggedInUser.password = hashpassword;
      loggedInUser.save();

      res.status(200).send({ "status": true, 'message': 'User password update successfully' });
    }



  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }

});

module.exports = profileRouter;