const EXPRESS = require('express');
const USERROUTES = EXPRESS.Router();
const USER = require('../models/user.model');
const app = require('../server');

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
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    password: req.body.password,
                    fb: false,
                    li: false,
                    tw: false,
                    ig: false
                });

                //   req.session.user = newUser;
                //   req.session.isLoggedIn = true;

                newUser.save().then(saved => {
                    if (saved != null) {
                        console.log('User has been saved!');

                        //  console.log(JSON.stringify(req.session.user));
                        //    req.session.save();
                        res.status(200).json({
                            registered: true
                        })

                    } else {

                        res.status(401).json({
                            response: "Register Failed",
                            registered: false
                        })
                    }
                })
            }
        }).catch(err => {
            console.log(err);
        });
});

USERROUTES.route('/api/accounts/:id').put(function (req, res) {
    console.log(req.body.fb);
    USER.updateOne(
        { _id: req.params.id },
        {
            $set: {
                fb: req.body.fb,
                tw: req.body.tw,
                li: req.body.li,
                ig: req.body.ig,
            }
        }
    ).then(response => {
        res.status(200).json({
            response: "Update successful",
            updated: true,
            user: response
        });
    }).catch(err => {
        res.status(401).json({
            response: "Update failed",
            updated: false
        });
    });
});

//login user
USERROUTES.post('/api/login', function (req, res) {
    USER.findOne({ email: req.body.username })
        .then(user => {

            if (!user) {
                res.status(200).json({
                    registered: false,
                    issue: 'user not found'
                })
            } else {
                if (req.body.password === user.password) {
                    //   req.session.userid = user._id;
                    //   req.session.save();
                    //   console.log(req.session.userid);
                    res.status(200).json({
                        registered: true,
                        user: user
                    })
                } else {
                    res.status(200).json({
                        registered: false,
                        issue: 'invalid password'
                    })
                }
            }
        });
});

// GET one user
USERROUTES.route("/api/user/:id").get(function (req, res) {
    USER.findOne({ _id: req.params.id }).then((user) => {
        if (user != null) {
            res.status(200).json({
                user: user,
            });
        } else {
            res.status(400).json({
                user: null,
            });
        }
    });

});

// GET ALL users
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