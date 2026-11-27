const express = require('express');

const connectionRouter = express.Router();
const userAuth = require('../middlewares/auth');
const connectionDb = require('../models/connection');
const User = require('../models/user');

connectionRouter.post('/request/send/:status/:userId', userAuth, async (req, res) => {
    try {
        const fromUser = req.user._id;
        //verify param
        const validParams = ['status', 'userId'];
        Object.keys(req.params).every((key) => {
            if (!validParams.includes(key)) {
                throw new Error('Invalid params');
            }
        });
        // verify status
        const inputstatus = req.params.status;
        const validStatus = [
            'interested',
            'ignored'
        ];
        if (!validStatus.includes(inputstatus)) {
            return res
                .status(400)
                .json({ message: "Invalid status type: " + inputstatus });
        }
        // check valid userId
        const toUserDb = await User.findById(req.params.userId);
        if (!toUserDb) {
            return res.status(404).json({ message: "User not found!" });
        }
        const toUser = toUserDb._id;
        // check connection already exist
        const existingConnectionRequest = await connectionDb.findOne({
            $or: [
                { fromUser, toUser },
                { fromUser: toUser, toUser: fromUser },
            ]
        })
        if (existingConnectionRequest) {
            return res
                .status(400)
                .send({ message: "Connection Request Already Exists!!" });
        }

        //save to connection db
        const connection = new connectionDb({
            fromUser,
            toUser,
            status: inputstatus,
        });
        await connection.save();
        res.json({
            message:
                req.user.firstName + " is " + inputstatus + " in " + toUserDb.firstName,
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
});

module.exports = connectionRouter;