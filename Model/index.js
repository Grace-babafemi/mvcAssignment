const mongoose = require("mongoose");

const taskManagerScema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  task: {
    title: String,
    description: String,
    completed: {type: Boolean, default:false},
  },
});

module.exports = taskModel = mongoose.model("task", taskManagerScema)