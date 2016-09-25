var express = require('express');
var path = require("path");
var session  = require('express-session');
var bodyParser=require('body-parser');
var indexRoutes=require('./routes/indexRoutes');
var taskRoutes=require('./routes/tasksRoutes');
var RedisStore = require("connect-redis")(session);
var app = express();

app.set('view engine','jade');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({ store:new RedisStore(),secret:'ExpressApp' }))

app.use(function(req,res,next){
  req.session.date = req.session.date || new Date().toUTCString();
  res.locals.session = { id:req.session.id, date:req.session.date };
  next();
})

app.get('/',function(req,res,next){
  res.send('Hello Express Home');
})

app.use('/index',indexRoutes);
app.use('/tasks',taskRoutes);










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


module.exports = app;
