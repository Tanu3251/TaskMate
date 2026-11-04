const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/complete", protect, completeTask);

module.exports = router;