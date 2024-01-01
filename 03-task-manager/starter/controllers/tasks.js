const express = require("express");
const Task = require("../models/Task");
const app = express();
app.use(express.json());
const asyncWrapper = require("../middleware/async");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({
    status: "success",
    data: { tasks, numberofTasks: tasks.length },
  });
});

const creatNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    task,
  });
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });
  if (!task) {
    return res.status(404).json({ message: "the id is not found" });
  }
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id, name, completed } = req.body;

  const task = await Task.updateOne(
    { _id: id },
    { name: name, completed: completed }
  );
  if (!task) {
    res.status(404).json({ message: "tasks not fouhnd" });
  }
  res.status(200).json({ task });
});
const deleteTasks = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const deleteTask = await Task.findOneAndDelete({ _id: id });
  if (!deleteTask) {
    return res.status(404).json({ message: "task not found id is incorrect" });
  }
  res.status(200).json({ deleteTask });
});

module.exports = {
  getAllTasks,
  creatNewTask,
  getSingleTask,
  updateTask,
  deleteTasks,
};
