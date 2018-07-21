'use strict';

var express = require('express'),
  router = express.Router(),
  wrapper = require('../wrapper/co.wrapper'),
  userRepository = require('../data/repository/user');

  router.route('/user/current').get((req, res) => {
    wrapper.defineArgs(req, res).execute(function* (req, res) {
      var foundedUser = req.app.get("userData");
      var userObject = foundedUser;
      res.send(userObject);
    });
  });

module.exports = router;
