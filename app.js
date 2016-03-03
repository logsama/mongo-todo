
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var todoModel = require('./models/todo');
var todoRoute = require('./routes/todo');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
//var methodOverride = require('method-override');

var app = express();

// configure was eliminated in version 4
//app.configure(function(){
app.set('port', process.env.PORT || 3000);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
 //app.use(methodOverride);
  //app.use(express.favicon());
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  //app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(app.route());
//});

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

/// development only
//if ('development' == app.get('env')) {
  //app.configure('development', function(){
  //app.use(express.errorHandler());
///}
//});

/*
version 4-
// production only
app.configure('production', function(){
});

version 4+
// production only
if ('production' == app.get('env')) {
  app.set('mongodb_uri', 'mongo://localhost/prod');
}
*/

var uriString =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/HelloMongoose';

mongoose.connect('mongodb://Chris.Logsdon:test@ds061395.mongolab.com:61395/mongo-todo-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log('Successfully mongodb is connected');
});

app.get('/todo',todoRoute.index);
app.get('/todo/:id',todoRoute.findById);
app.put('/todo/:id',todoRoute.update);
app.delete('/todo/:id',todoRoute.delete)
app.post('/todo',todoRoute.newTodo);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
