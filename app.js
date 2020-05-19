const express = require('express');
const expSession = require('express-session');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// const indexRouter = require('./routes/index.js');
// const usersRouter = require('./routes/users');

const app = express();
const db = require('./config/db.config');
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout'}));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
require('./routes/router.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error -> ' + err);
//   // res.render('error');
// });

module.exports = app;
