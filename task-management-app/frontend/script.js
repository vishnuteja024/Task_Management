// script.js
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalDueDate = document.getElementById('modal-dueDate');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

let selectedTaskId = null;

// Function to fetch tasks from the backend API
function fetchTasks() {
  fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
      // Clear the existing task list
      taskList.innerHTML = '';
      // Iterate through each task and create HTML elements to display them
      tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
      });
    });
}

// Function to create HTML elements for a task
function createTaskElement(task) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
    <button onclick="showModal('${task._id}')">View Details</button>
  `;
  return taskItem;
}

// Fetch tasks when the page loads
fetchTasks();

// Event listener for submitting the task form
taskForm.addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;

  // Send a POST request to the backend API to add a new task
  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, dueDate })
  })
  .then(response => response.json())
  .then(newTask => {
    // Create HTML elements for the new task and append them to the task list
    const taskItem = createTaskElement(newTask);
    taskList.appendChild(taskItem);
    // Reset the task form fields
    taskForm.reset();
  });
});

// Function to show the modal with task details
function showModal(taskId) {
  selectedTaskId = taskId;
  fetch(`/api/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
      modalTitle.textContent = task.title;
      modalDescription.textContent = task.description;
      modalDueDate.textContent = `Due Date: ${new Date(task.dueDate).toLocaleDateString()}`;
      modal.style.display = 'block';
    });
}

// Close modal when the user clicks outside of it
modal.addEventListener('click', event => {
  if (event.target === modal || event.target.className === 'close') {
    modal.style.display = 'none';
  }
});

// Edit task
editBtn.addEventListener('click', () => {
  // Implement editing functionality here
});

// Delete task
deleteBtn.addEventListener('click', () => {
  // Implement deletion functionality here
});

// Close modal when the user clicks outside of it
window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
// Function to fetch tasks from the backend and display them
function fetchTasks() {
  fetch('/tasks')
  .then(response => response.json())
  .then(tasks => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = ''; // Clear existing tasks
      
      tasks.forEach(task => {
          const taskItem = document.createElement('div');
          taskItem.innerHTML = `
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <p>Due Date: ${task.dueDate}</p>
              <button onclick="editTask('${task.id}')">Edit</button>
              <button onclick="deleteTask('${task.id}')">Delete</button>
          `;
          taskList.appendChild(taskItem);
      });
  })
  .catch(error => console.error('Error:', error));
}

// Event listener to fetch tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks);

