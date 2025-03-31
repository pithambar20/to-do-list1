
function addTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [] 

    let taskInput = document.getElementById("taskInput");
    let taskTime = document.getElementById("taskTime");
    let taskText = taskInput.value.trim();
    let taskDue = taskTime.value;

    if (taskText === "" || taskDue === "") {
        alert("Please enter a task and a deadline!");
        return;
    }

    let task = { text: taskText, due: new Date(taskDue), id: Date.now() };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks))
    renderTasks();
    scheduleReminder(task);
    
    taskInput.value = "";
    taskTime.value = "";
}

function renderTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [] 
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} (Due: ${task.due.toLocaleString()}) 
                        <button onclick="removeTask(${task.id})">X</button>`;
        taskList.appendChild(li);
    });
}

function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [] 
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks))
    renderTasks();
}

function scheduleReminder(task) {
    let timeDiff = task.due - new Date();
    if (timeDiff > 0) {
        setTimeout(() => {
            alert(`Reminder: ${task.text} is due now!`);
        }, timeDiff);
    }
}

renderTasks();

function saveData(){
    let data = document.getElementById("userInput").value;
    localStorage.setItem("savedData", data); // Save data to localStorage
    window.location.href = "/NAV-LINKS/list.html"; // Redirect to another page
}
