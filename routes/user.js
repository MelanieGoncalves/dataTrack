const EXPRESS = require('express');
const USERROUTES = EXPRESS.Router();
const USER = require('../models/user.model');

USERROUTES.route('/api/user/register').post(function (req, res) {
    USER.findOne({ email: req.body.email })
        .then(user => {
            if (user != null) {
                res.status(200).json({
                    response: 'Email is already linked with an account.'
                })
            } else {
                let newUser = new USER({
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: req.body.password,
                    fb: false,
                    li: false,
                    tw: false,
                    ig: false
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

USERROUTES.route("/api/users").get(function (req, res) {
    USER.find(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});
module.exports = USERROUTES;