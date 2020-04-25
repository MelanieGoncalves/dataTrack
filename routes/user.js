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

//login user
USERROUTES.post('/api/login', function (req, res) {
    USER.findOne({ email: req.body.username })
        .then(user => {

            if (!user) {
                console.log('Error');
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
                    console.log("Invalid login");
                }
            }
        });
});

// GET one user
USERROUTES.route("/api/user/:id").get(function (req, res) {
    //  console.log("??: " + JSON.stringify(req.session));
    //  if (req.session && req.session.userid) {
    //     console.log("id: " + req.session.user);
    USER.findOne({ _id: req.params.id })
        .then(user => {
            if (user != null) {
                res.status(200).json({
                    user: user
                });
            } else {
                res.status(400).json({
                    user: null
                });
            }
        });
    //  } else {
    // console.log("Session not found");
    //  }

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