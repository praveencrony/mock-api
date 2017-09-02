'use strict';

require('dotenv').config({path: __dirname + '/.env'}); // require env

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const app           = express();


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Set orgin
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


//Set Public Path Dir
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
  });

//Initial Dummy user data
var userList = [{
  'fname' : 'Praveen',
  'lname' : 'P',
  'email' : 'praveenmng@gmail.com',
  'username' : 'Praveen',
  'password' : 'praveenp'

}];

//User Register API
app.post('/register', function(req, res)
{
  
  if(! req.body )
		return res.json({'msg':'invalid Request', 'error': 1});

  if(! req.body.form.fname )
		return res.json({'msg':'Please Enter Your First Name', 'error': 1});

  if(! req.body.form.lname )
    return res.json({'msg':'Please Enter Your Last Name', 'error': 1});

  if(! req.body.form.email )
    return res.json({'msg':'Please Enter Your Email', 'error': 1});

  if(! req.body.form.username )
    return res.json({'msg':'Please Enter Your Username', 'error': 1});

  if(! req.body.form.password )
    return res.json({'msg':'Please Enter Your Password', 'error': 1});
  
  userList.push({
    'fname' : req.body.form.fname,
    'lname' : req.body.form.lname,
    'email' : req.body.form.email,
    'username' : req.body.form.username,
    'password' : req.body.form.password
  });

  res.json({
			'data': userList,
      'error': 0,
      'msg': 'Successfully Registered'
		});
	
});

//Get Registered Users list API
app.get('/getusers', function(req, res)
{
    res.json({
      'users': userList,
      'error': 0,
      'msg': ''
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  
  res.status(err.status || 500);
  res.json( {
    message: err.message,
    error: {}
  });
});

//Port Config
const server      = require('http').Server(app);
const serverIp    = process.env.APP_IP || '0.0.0.0';
const serverPort  = process.env.PORT || 8000;

server.listen(serverPort, serverIp);

module.exports = app;
