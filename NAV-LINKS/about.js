function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTime = document.getElementById('taskTime');
    const taskText = taskInput.value.trim();
    const taskDateTime = taskTime.value;

    if (taskText === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, due: taskDateTime });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTasks();

    taskInput.value = '';
    taskTime.value = '';
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskTableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    taskTableBody.innerHTML = ''; // Clear existing rows

    tasks.forEach((task, index) => {
        const newRow = taskTableBody.insertRow();

        const taskCell = newRow.insertCell(0);
        const timeCell = newRow.insertCell(1);
        const actionsCell = newRow.insertCell(2);

        taskCell.textContent = task.text;
        timeCell.textContent = new Date(task.datetime).toLocaleString();

        actionsCell.innerHTML = `
            <button onclick="toggleComplete(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Load tasks on page load
window.onload = loadTasks;