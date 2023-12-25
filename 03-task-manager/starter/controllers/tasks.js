const express = require("express");
const Task = require("../models/Task");
const app = express();
app.use(express.json());

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    // res.status(200).json({ tasks, amount: tasks.length });
    //setup a global model for your response so it's easy for frontend to access the data sent.
    res.status(200).json({
      status: "success",
      data: { tasks, numberofTasks: tasks.length },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const creatNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      task,
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ message: "the id is not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json(err);
  }
};

const updateTask = async (req, res) => {
  const { id, name, completed } = req.body;
  try {
    const task = await Task.updateOne(
      { _id: id },
      { name: name, completed: completed }
    );
    if (!task) {
      res.status(404).json({ message: "tasks not fouhnd" });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: "server error try again later" });
  }
};
const deleteTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: id });
    if (!deleteTask) {
      return res
        .status(404)
        .json({ message: "task not found id is incorrect" });
    }
    res.status(200).json({ deleteTask });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllTasks,
  creatNewTask,
  getSingleTask,
  updateTask,
  deleteTasks,
};
