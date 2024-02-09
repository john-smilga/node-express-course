const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAlljobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
const getJob = async (req, res) => {
  res.send("get Job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};
const updateJob = async (req, res) => {
  res.send("update job");
};

module.exports = {
  getAlljobs,
  createJob,
  deleteJob,
  getJob,
  updateJob,
};
