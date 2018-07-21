'use strict';

var express = require('express'),
  router = express.Router(),
  wrapper = require('../wrapper/co.wrapper'),
  taskModel = require('../data/models/task');

  router.route('/tasks').get((req, res) => {
    wrapper.defineArgs(req, res).execute(function* (req, res) {

       var tasks = yield taskModel.find({}).populate('user').exec();
      res.send({tasks:tasks});
    });
  });

  router.route('/task').post((req, res) => {
    wrapper.defineArgs(req, res).execute(function* (req, res) {
      res.send();
    });
  });

module.exports = router;
