const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();
const port = 3000;

//Mongoose connection
mongoose.connect(config.database, { useNewUrlParser: true });

//on connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database ' + config.database);
});

//on error
mongoose.connection.on('error', (err)=>{
    console.log('Connection error ' + err);
});

//routes imports
const users = require('./routes/users');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Cors middleware
app.use(cors());

//Body-parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//routes
app.use('/users', users);

//Index route
app.get('/', (req, res)=>{
    res.send('Invalid endpoint');
});

//any other route typed in url
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start server
app.listen(port, ()=>{
    console.log('Server started on port '+ port);
});
