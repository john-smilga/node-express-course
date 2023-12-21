const getAllTasks = (req, res) => {
  return res.send("all items from the file");
};

const creatNewTask = (req, res) => {
  return res.send("creating new task");
};

const getSingleTask = (req, res) => {
  return res.send("get single task");
};

const updateTask = (req, res) => {
  return res.send("updating task");
};
const deleteTasks = (req, res) => {
  return res.send("deleting tasks");
};

module.exports = {
  getAllTasks,
  creatNewTask,
  getSingleTask,
  updateTask,
  deleteTasks,
};
