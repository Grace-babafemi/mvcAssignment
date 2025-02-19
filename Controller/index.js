const taskModel = require("../Model/index");
const bcrypt = require("bcrypt");

const handleError = (res, error) => {
  console.log(error);
  return res
    .status(500)
    .json({ Message: "An Error Occurred", error: error || error.Message });
};

const registered = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({ Message: "All Field is Required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await taskModel.create({
      userName,
      email,
      password: hashPassword,
      task: [],
    });
    return res.status(200).json({ success: true, data: createUser });
  } catch (error) {
    console.log(error);

    handleError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const checkExisted = await taskModel.findOne({ email });
    if (checkExisted)
      return res.status(400).json({ Message: "User Already Exist" });
    const newUser = await taskModel.create({ userName, email, password });
    res
      .status(201)
      .json({ Message: "User Already Registered SUCCESSFULLY!", newUser });
  } catch (error) {
    handleError(res, error);
  }
};

const userLoggedIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alreadyLoggedIn = await taskModel.findOne({ email });

    if (!taskModel || taskModel.password !== password) {
      return res.status(401).json({ Message: "Invalid email or password" });
    }
    res
      .status(200)
      .json({ Message: "Login SUCCESSFULLY", taskModel: alreadyLoggedIn });
  } catch (error) {
    handleError(res, error);
  }
};

const createTask = async (req, res) => {
  try {
      const { id } = req.params;
      const { title, description } = req.body;

      const user = await taskModel.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.task = { title, description, completed: false };
      await user.save();

      res.status(201).json({ message: "Task created successfully!", task: user.task });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
  }
};


const updateTask = async (req, res) => {
  try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const user = await taskModel.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.task = { title, description, completed };
      await user.save();

      res.status(200).json({ message: "Task updated successfully!", task: user.task });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
  }
};


const deleteTask = async (req, res) => {
  try {
      const { id } = req.params;

      const user = await taskModel.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.task = null;
      await user.save();

      res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  registered,
  loginUser,
  userLoggedIn,
  createTask,
  updateTask,
  deleteTask,
};
