var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var config = require('./db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news')
var uploadRouter = require('./routes/uploads')

var app = express();

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise


mongoose.connection.on('connected', function () { 

  console.log('Mongoose connection open to success'); }); /** * 连接异常 */ 
  
  mongoose.connection.on('error',function (err) { 
  
  console.log('Mongoose connection error: ' + err); }); /** * 连接断开 */ 
  
  mongoose.connection.on('disconnected', function () { 
  
  console.log('Mongoose connection disconnected'); });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api', newsRouter);
app.use('/api', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(cors())

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('80', function(){
	console.log("server  running ....");
})

module.exports = app;
