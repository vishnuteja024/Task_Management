// task.js
let tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-05-10' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-05-11' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', dueDate: '2024-05-12' }
];

class Task {
  constructor(id, title, description, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

function createTask(title, description, dueDate) {
  const id = tasks.length + 1;
  const newTask = new Task(id, title, description, dueDate);
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, newData) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...newData };
    return tasks[index];
  }
  return null;
}

function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = { Task, getAllTasks, getTaskById, createTask, updateTask, deleteTask };
