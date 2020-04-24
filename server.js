//Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const ROUTER = express.Router();
const USERROUTES = require('./routes/user');

//const routes = require('./routes');

//const MONGODB_URI = require('./config_uri.js').mongoURI;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dataTrack_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})



//HTTP request logger
//app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(USERROUTES, ROUTER);
//app.use('/', routes);

/* app.get('/', (req, res) => {
    const data = {
        username: 'melaniedfg',
        age: 29
    }
    res.json(data);
});

app.get('/api/name', (req, res) => {
    const data = {
        username: 'franklin',
        age: 29

    }
    res.json(data);
}); */

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));