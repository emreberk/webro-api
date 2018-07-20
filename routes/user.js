'use strict';

var express = require('express'),
  router = express.Router(),
  wrapper = require('../wrapper/co.wrapper'),
  userRepository = require('../data/repository/user');

router.route('/getUser')
  .get((req,res) => {
    wrapper.defineArgs(req,res).execute(function* (req, res) {
      var userId = req.body.userId;

      var result = yield userRepository.find({_id: userId}, true);

      res.send(result);
    });
  });


module.exports = router;
