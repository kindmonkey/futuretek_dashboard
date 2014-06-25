var express = require('express');
var path = require('path');
var ejsEngine = require('ejs-locals');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var setting = require('./routes/setting');
var sensors = require('./routes/sensors');
//var mongoose = require('mongoose');

var app = express();

//mongoose.connect('mongodb://kindmong:kid10129@dbh85.mongolab.com:27857/kindmongdb');
//var db = mongoose.connection;

//db.on('error', console.error);
//db.once('open', function() {
    // Create your schemas and models here.
//    console.log( "connection successful.." );
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsEngine);
//app.engine('html', ejsEngine.renderFile);

app.use('/', routes);
app.use('/sensors', sensors);
app.use('/users', users);
app.use('/setting', setting);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

module.exports = app;