import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, EditStatusOfItem, EditPriorityOfItem } from './LocalStorage.js';
// the object layout for the task:
// example: {TaskName: 'Task Name', TaskDescription: 'Task Description', Status: 'Status', Priority: 'Priority', TaskDate: 'Task Date'}

// the object input and btns for the tasks:
const task_name = document.getElementById('task-name');
const task_description = document.getElementById('task-desc');
const task_date = document.getElementById('task-due');// date
const task_status = document.getElementById('task-status');
const task_priority = document.getElementById('task-priority');
const task_btn_submit = document.getElementById('submit-btn');

// the task list:
const todoTaskList = document.getElementById('todo-list');
const inProgressTaskList = document.getElementById('in-progress-list');
const completeTaskList = document.getElementById('complete-list');

if (task_btn_submit && task_name && task_date && task_status && task_priority) {
    task_btn_submit.addEventListener('click', () => {
        if (!task_name.value || !task_date.value) {
            alert('Task Name and Task Date are required');
            return;
        }
        const task = {
            TaskName: task_name.value,
            TaskDescription: task_description.value,
            TaskDate: task_date.value,
            Status: task_status.value,
            Priority: task_priority.value
        };
        saveToLocalStorage(task);
        getFromLocalStorage();
        displayTasks();
    });
} else {
    console.error('One or more required elements not found');
}

function displayTasksLayout(task) {
    return `
    <li class="list-group-item d-flex justify-content-between align-items-start">
            <div>
                <h5>${task.TaskName}</h5>
                <p class="mb-1">${task.TaskDescription}</p>
                <label class="form-label">Status:</label>
                <select class="form-select form-select-sm task-status">
                    <option value="todo" ${task.Status === 'todo' ? 'selected' : ''}>To Do</option>
                    <option value="in-progress" ${task.Status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="complete" ${task.Status === 'complete' ? 'selected' : ''}>Complete</option>
                </select>
                <label class="form-label mt-2">Priority:</label>
                <select class="form-select form-select-sm task-priority">
                    <option value="low" ${task.Priority === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${task.Priority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${task.Priority === 'high' ? 'selected' : ''}>High</option>
                </select
                        
                <small class="text-muted d-block mt-2">Due:${task.TaskDate}</small>
            </div>
        <button class="btn btn-sm btn-danger">Remove</button>
    </li>`
}

function displayTasks() {
    let tasks = getFromLocalStorage();
    if (tasks.length === 0) { console.log('No tasks found'); return; }
    todoTaskList.innerHTML = '';
    inProgressTaskList.innerHTML = '';
    completeTaskList.innerHTML = '';
    const divider = document.createElement("div");
    divider.style.width = "100%"; divider.style.height = "2px"; divider.style.backgroundColor = "#ccc"; divider.style.margin = "10px 0";
    tasks.forEach(task => {
        switch (task.Status.toLowerCase()) {
            case 'todo':
                const taskElement = document.createElement("div");
                taskElement.innerHTML = displayTasksLayout(task);

                const space = document.createElement("div");
                space.style.width = "100%";
                space.style.height = "2px";
                space.style.backgroundColor = "#ccc";
                space.style.margin = "10px 0";

                todoTaskList.appendChild(taskElement);
                todoTaskList.appendChild(space);
                break;
            case 'in-progress': {
                const taskElement = document.createElement("div");
                taskElement.innerHTML = displayTasksLayout(task);
                
                const space = document.createElement("div");
                space.style.width = "100%";
                space.style.height = "2px";
                space.style.backgroundColor = "#ccc";
                space.style.margin = "10px 0";
        
                inProgressTaskList.appendChild(taskElement);
                inProgressTaskList.appendChild(space);
                break;
            }
            case 'complete': {
                const taskElement = document.createElement("div");
                taskElement.innerHTML = displayTasksLayout(task);
                
                const space = document.createElement("div");
                space.style.width = "100%";
                space.style.height = "2px";
                space.style.backgroundColor = "#ccc";
                space.style.margin = "10px 0";
        
                completeTaskList.appendChild(taskElement);
                completeTaskList.appendChild(space);
                break;
            }
            default:
                console.error(`Task Status "${task.Status}" not found`);
                break;
        }
    });
    const removeButtons = document.querySelectorAll('.btn-danger');
    removeButtons.forEach(removeButton => {
        removeButton.addEventListener('click', () => {
            const taskName = removeButton.parentElement.querySelector('h5').innerText;
            removeFromLocalStorage(taskName);
            displayTasks();
        });
    });
    const statusSelects = document.querySelectorAll('.task-status');
    statusSelects.forEach(statusSelect => {
        statusSelect.addEventListener('change', () => {
            const taskName = statusSelect.parentElement.querySelector('h5').innerText;
            EditStatusOfItem(taskName, statusSelect.value);
            displayTasks();
        });
    });
    const prioritySelects = document.querySelectorAll('.task-priority');
    prioritySelects.forEach((select) => {
        select.addEventListener('change', () => {
            const taskName = select.parentElement.querySelector('h5').innerText;
            EditPriorityOfItem(taskName, select.value);
            displayTasks();
        });
    });
}

const body = document.querySelector('body');
body.addEventListener('click', () => {
    displayTasks();
});

displayTasks();
getFromLocalStorage();


