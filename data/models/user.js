var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
  },
  {
    timestamps: true
  });

userSchema.set('toJSON', {virtuals: true});

// Transform object on serialization
if (!userSchema.options.toJSON)
  userSchema.options.toJSON = {};

userSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.userId = ret._id;
  ret.createdAt = ret._id.getTimestamp();

  // Hide unwanted properties
  delete ret._id;
  delete ret.__v;
  delete ret.password;
};

module.exports = mongoose.model('User', userSchema, 'users');
