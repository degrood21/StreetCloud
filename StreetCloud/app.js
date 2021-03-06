var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//routes used to access the databases
var medicalRouter = require('./routes/medicalPage');
var foodRouter = require('./routes/foodPage');
var shelterRouter = require('./routes/shelterPage');
var searchRouter = require('./routes/searchPage');
var searchIndRouter = require('./routes/searchIndividual');
var jobsRouter = require('./routes/jobsPage');
var librariesRouter = require('./routes/librariesPage');
var daycareRouter = require('./routes/daycarePage');
var publicRestroomsRouter = require('./routes/publicRestroomsPage');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/medicalPage', medicalRouter);
app.use('/foodPage', foodRouter);
app.use('/shelterPage', shelterRouter);
app.use('/searchPage', searchRouter);
app.use('/searchIndividualPage', searchIndRouter);
app.use('/jobsPage', jobsRouter);
app.use('/librariesPage', librariesRouter);
app.use('/daycarePage', daycareRouter);
app.use('/publicRestroomsPage', publicRestroomsRouter);

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
