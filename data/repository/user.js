'use strict';

var users = require('../models/user');
require('../models/device');

module.exports = {
  find: function (condition, isPopulated) {
    if (isPopulated) {
      //Populate referenced object(s)
      return users
        .find(condition)
        .populate('device')
        .exec();
    }
    else {
      return users.find(condition).exec();
    }
  },
  findOne: function (condition, isPopulated) {
    if (isPopulated) {
      return users
        .findOne(condition)
        .populate('device')
        .exec();
    }
    else {
      return users.findOne(condition).exec();
    }
  },
  insert: function (item) {
    var obj = new users(item);
    return obj.save();
  },
  update: function (condition, areas) {
    return users.update(condition, areas, {multi: true}).exec();
  },
  remove: function (condition) {
    return users.remove(condition).exec();
  },
  count: function (condition) {
    return users.count(condition).exec();
  }
};