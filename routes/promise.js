'use strict';

var express = require('express'),
  router = express.Router(),
  promise = require('../promises/sample'),
  wrapper = require('../wrapper/co.wrapper');

router.route('/promise')
  .post((req,res) => {
    wrapper.defineArgs(req,res).execute(function* (req, res) {
      var reqValue = req.body.reqValue;

      var result = yield promise.createPromise(reqValue);

      res.send(result);
    });
  });

router.route('/promise')
  .get((req,res) => {
    wrapper.defineArgs(req,res).execute(function* (req, res) {
      //this will create error
      var result = yield promise.createPromise();

      res.send(result);
    });
  });


module.exports = router;
