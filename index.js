'use strict';

var mongoConfig = require('./mongo'),
  express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');

var app = express();

// Define Routes
var authorization = require('./authorization/authorization.router');
var promiseRoute = require('./routes/promise');
var userRoute = require('./routes/user');
var preloginRoute = require('./routes/prelogin');
var taskRoute = require('./routes/task');

// MongoDb Configuration
var mConfig = mongoConfig.init();

mongoose.connect(mConfig.connectionString, mConfig.authOptions, function(err){
  if(err)
  {
    console.log("Connection failed due to : " + err);
  }
  else{
    console.log("Connected to : " + mConfig.connectionString);
    console.log('Running environment : ' + process.env.NODE_ENV);
  }
});

// Request size limit 100 Mb
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded());

app.use(cors());
app.options('*', cors());

app.use('/api', preloginRoute);
app.use('/api', taskRoute);

// Hero Mode On:
//Modules above does not require authorization
app.use('/api', authorization);
//Modules below requires authorization
// Hero Mode Off:

// Implement Routes 
app.use('/api', promiseRoute);
app.use('/api', userRoute);

app.set('port', process.env.PORT || 8081);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
