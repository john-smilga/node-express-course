const express = require("express");
const Task = require("../models/Task");
const app = express();
app.use(express.json());

const getAllTasks = (req, res) => {
  return res.send("all items from the file");
};

const creatNewTask = async (req, res) => {
  const task = await Task.create({ name: "first task", completed: true });
  res.status(201).json({
    task,
  });
};

const getSingleTask = (req, res) => {
  const { id } = req.params;
  return res.send(`heres your task ${id}`);
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
