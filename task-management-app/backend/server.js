// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-05-10' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-05-11' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', dueDate: '2024-05-12' }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    dueDate
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Add other endpoints for updating, deleting, and retrieving a single task by ID as needed

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
