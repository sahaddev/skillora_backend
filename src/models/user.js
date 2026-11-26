const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25,
  },

  lastName: {
    type: String,
    trim: true,
    maxLength: 25,

  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxLength: 25,
  },

  password: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    default: '',
    maxLength: 100,

  },

  profileImage: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  },

  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],


  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, 'SKILLORA@123', {
    expiresIn: '1d',
  });
  return token;
}

module.exports = mongoose.model('User', userSchema);
