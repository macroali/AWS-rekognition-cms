global.fetch = require('node-fetch');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const fs = require('fs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');
const config = JSON.parse(fs.readFileSync('./bin/config.json')); // require('./bin/config.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

const UserPoolId = config.cognito.userPoolId;
const ClientId = config.cognito.clientId;
const userPool = new AmazonCognitoIdentity.CognitoUserPool({ UserPoolId, ClientId })

// Session
const session = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}
if (process.env.PORT) {
    session.cookie = { secure: true };
}
app.use(expressSession(session));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);

// static
app.use('/asset_public', express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;