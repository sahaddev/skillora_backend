const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({

  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  status: {
    type: String,
    enum: [
      'interested',
      'accepted',
      'rejected',
      'ignored'
    ],
    default: 'interested'
  }

}, { timestamps: true });

connectionSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId
  if (connectionRequest.fromUser.equals(connectionRequest.toUser)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next;
});

module.exports = mongoose.model('Connection', connectionSchema);