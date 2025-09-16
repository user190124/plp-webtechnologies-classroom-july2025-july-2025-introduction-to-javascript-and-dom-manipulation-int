// Part 1: Mastering JavaScript Basics - Variables and Conditionals
// Array to store tasks
let tasks = [];
const maxTasks = 10; // Maximum tasks allowed
let taskCount = 0;

// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Part 2: JavaScript Functions - Reusable Logic
// Function to add a new task
function addTask(taskText) {
    // Check if task text is empty or task limit reached
    if (!taskText.trim()) {
        alert('Please enter a task!');
        return false;
    }
    if (taskCount >= maxTasks) {
        alert(`Maximum of ${maxTasks} tasks reached!`);
        return false;
    }

    // Create task object and add to array
    const task = {
        id: Date.now(), // Unique ID based on timestamp
        text: taskText,
        completed: false
    };
    tasks.push(task);
    taskCount++;
    renderTasks();
    return true;
}

// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Function to clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    taskCount = tasks.length;
    renderTasks();
}

// Part 3: JavaScript Loops - Repetition
// Function to render tasks using a forEach loop
function renderTasks() {
    taskList.innerHTML = ''; // Clear current list
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="complete-btn" data-id="${task.id}">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
        `;
        taskList.appendChild(li);
    });

    // Update task count and button visibility using a for loop
    let completedCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completedCount++;
        }
    }
    clearCompletedBtn.style.display = completedCount > 0 ? 'block' : 'none';
}

// Part 4: Mastering the DOM - Interactions
// DOM Interaction 1: Add task on button click
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (addTask(taskText)) {
        taskInput.value = ''; // Clear input
    }
});

// DOM Interaction 2: Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const taskText = taskInput.value;
        if (addTask(taskText)) {
            taskInput.value = ''; // Clear input
        }
    }
});

// DOM Interaction 3: Toggle task completion on button click (delegated event)
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
        const taskId = Number(e.target.getAttribute('data-id'));
        toggleTaskCompletion(taskId);
    }
});

// DOM Interaction 4: Clear completed tasks
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// Initialize the app
renderTasks();