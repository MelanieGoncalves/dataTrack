//Import npm packages
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const ROUTER = express.Router();
const USERROUTES = require('./routes/user');

const routes = require('./routes');

//const MONGODB_URI = require('./config_uri.js').mongoURI;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dataTrack_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

/* var sess = {
    /* genid: function (req) {
        return genuuid() // use UUIDs for session IDs
    }, 
    secret: 'secretsecret',
    resave: true,
    saveUninitialized: true
} */

//HTTP request logger
//app.use(morgan('tiny'));
//app.use(session(sess));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(USERROUTES, ROUTER);
app.use('/', routes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
    app.set('trust proxy', 1);
    //  sess.cookie.secure = true;
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

//module.exports = app;