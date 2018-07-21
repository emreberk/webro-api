var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String,
    status: String,
    fromlocation: Object,
    tolocation: Object,
    address: String,
  },
  {
    timestamps: true
  });

  taskSchema.set('toJSON', {virtuals: true});

// Transform object on serialization
if (!taskSchema.options.toJSON)
taskSchema.options.toJSON = {};

taskSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.createdAt = ret._id.getTimestamp();

  // Hide unwanted properties
  delete ret._id;
  delete ret.__v;
};

module.exports = mongoose.model('Task', taskSchema, 'tasks');
