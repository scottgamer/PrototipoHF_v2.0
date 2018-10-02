const express = require('express');
const path = require('path');

const multer = require('multer');
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
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

//on error
mongoose.connection.on('error', (err) => {
  console.log('Connection error ' + err);
});

// specify the folder for storing multer
app.use(express.static(path.join(__dirname, 'uploads')));

// headers and content type
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//routes imports
const users = require('./routes/users');
const applications = require('./routes/applications');
const categories = require('./routes/categories');
const events = require('./routes/events');
const news = require('./routes/news');
const questions = require('./routes/questions');

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
app.use('/applications', applications);
app.use('/categories', categories);
app.use('/events', events);
app.use('/news', news);
app.use('/questions', questions);

//Index route
app.get('/', (req, res) => {
  res.send('Index - Invalid endpoint');
});

//any other route typed in url
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


//Multer storage
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.post("/upload", upload.array("uploads[]", 12), (req, res) => {
  console.log('files', req.files);
  res.send(req.files);
});

//Start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
