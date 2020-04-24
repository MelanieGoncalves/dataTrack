const EXPRESS = require('express');
const USERROUTES = EXPRESS.Router();
const USER = require('../models/user.model');

USERROUTES.route('/user/register').post(function (req, res) {
    USER.findOne({ email: req.body.email })
        .then(user => {
            if (user != null) {
                res.status(200).json({
                    response: 'Email is already linked with an account.'
                })
            } else {
                let newUser = new USER({
                    email: 'test@test.com',
                    first_name: 'Test',
                    last_name: 'Testington',
                    password: '123testing',

                });

                newUser.save().then(saved => {
                    if (saved != null) {

                    } else {
                        console.log('User has been saved!');
                        res.status(401).json({
                            reponse: "Register Failed",
                            registered: false
                        })
                    }
                })
            }
        }).catch(err => {
            console.log(err);
        });
});


module.exports = USERROUTES;