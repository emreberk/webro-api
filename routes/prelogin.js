'use strict';

var express = require('express'),
  router = express.Router(),
  wrapper = require('../wrapper/co.wrapper'),
  userRepository = require('../data/repository/user'),
  hat = require('hat'),
  bcrypt = require('bcrypt-nodejs');

  router.route('/register').post((req, res) => {
    wrapper.defineArgs(req, res).execute(function* (req, res) {

      var email = req.body.email,
      password = req.body.password;

      if (email == null || password == null) {
        res.status(400).send();
        return;
      }

      var savedUser = yield userRepository.findOne({ email: email });

      if (savedUser == null) {
        var accessToken = hat();
        var user = {
          email: email,
          accessToken: accessToken
        };
        var hashedPassword = bcrypt.hashSync(password);
        user.password = hashedPassword;
        savedUser = yield userRepository.insert(user);
      } else {
        res.status(400).send({ msg: "Email is already registered." });
        return;
      }

      res.send(savedUser);
    });
  });

  router.route('/login').post((req, res) => {
    wrapper.defineArgs(req, res).execute(function* (req, res) {
  
      var email = req.body.email,
        password = req.body.password;
  
      if (email == null || password == null) {
        res.status(400).send();
        return;
      }
  
      var user = yield userRepository.findOne({ email: email });
  
      if (user == null) {
        res.status(400).send({ msg: "User not found." });
        return;
      }
  
      var passwordMatched = bcrypt.compareSync(password, user.password);
      
      if(!passwordMatched){
        res.status(400).send({ msg: "User not found." });
        return;
      }
  
      res.send(user);
    });
  });


module.exports = router;
