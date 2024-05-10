// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskModel = require('./task');

router.get('/', (req, res) => {
  const tasks = taskModel.getAllTasks();
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = taskModel.getTaskById(taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

router.post('/', (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Please provide title, description, and due date' });
  }
  const newTask = taskModel.createTask(title, description, dueDate);
  res.status(201).json(newTask);
});

router.patch('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const newData = req.body;
  const updatedTask = taskModel.updateTask(taskId, newData);
  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(updatedTask);
});

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const success = taskModel.deleteTask(taskId);
  if (!success) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.sendStatus(204);
});

module.exports = router;
