const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      category,
      priority,
      dueDate
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks of logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark task as completed
const completeTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "Completed" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task completed successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask
};