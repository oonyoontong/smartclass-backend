const express = require('express');
const path = require('path');
const multer = require('multer');
const upload  = multer({dest: 'uploads/'});


const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const session = require('express-session');
const passport = require('passport');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

const account = require('./routes/account');
const course = require('./routes/course');
const lecture = require('./routes/lecture');
const quiz = require('./routes/quiz');
const question = require('./routes/question');
const live = require('./routes/live');
const feedback = require('./routes/feedback');

app.use('/account',account);
app.use('/course',course);
app.use('/lecture',lecture);
app.use('/quiz',quiz);
app.use('/question',question);
app.use('/live',live);
app.use('/feedback',feedback);


//Connecting to MongoDB
const mongoDB =  'mongodb://username:password@ds012578.mlab.com:12578/smartclass-db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error'));

app.post('/upload',upload.single('example'),function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    res.send("file received");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  /*res.status(err.status).json({
      message: err.message,
      error: err
  });*/
});

module.exports = app;
