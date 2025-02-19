const express = require("express");
const {
  registered,
  loginUser,
  userLoggedIn,
  createTask,
  updateTask,
  deleteTask,
} = require("../Controller/index");

const routers = express.Router();

routers.post("/createUser", registered);
routers.post("/loginUser", loginUser, userLoggedIn);
routers.post("/checkAccount", userLoggedIn);
routers.post("/tasks", createTask);
routers.put("/tasks/:id", updateTask);
routers.delete("/tasks/:id", deleteTask);

module.exports = routers;
