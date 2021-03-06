const express = require('express');
const { isEmpty } = require('lodash');
const User = require('../models/user.model');
const router = express.Router();

router.post('/add', async (req, res) => {
    if (isEmpty(req.body)) {
        return res.status(403).json({
            message: 'Body should not be empty',
            statusCode: 403
        });
    }
    const { firstname, lastname, email, password } = req.body;

    const newUser = new User({
        firstname,
        lastname,
        email,
        password,
        fb, li, tw, ig
    });
    try {
        await newUser.save();
        res.json({
            message: 'Data successfully saved',
            statusCode: 200,
            name,
            position,
            company
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'Internal Server error',
            statusCode: 500
        });
    }
});


router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});

        return res.json({
            registered: true,
            users: users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }

});

module.exports = router;