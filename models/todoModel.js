const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Todo', todoSchema);