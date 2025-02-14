// Save Task to Local Storage
function saveToLocalStorage(UserTask) {
    console.log(`Trying to save ${UserTask.TaskName} to local storage`);
    let SavedTasks = getFromLocalStorage();

    // Ensure the task doesn't already exist
    if (!SavedTasks.some(task => task.TaskName === UserTask.TaskName)) {
        SavedTasks.push(UserTask);
        console.log(`${UserTask.TaskName} added to local storage`);
        localStorage.setItem('SavedTask', JSON.stringify(SavedTasks));
        console.log(`Saved ${UserTask.TaskName} to local storage`);
    } else {
        console.warn(`Task "${UserTask.TaskName}" already exists in local storage`);
    }
}

// Get Tasks from Local Storage
function getFromLocalStorage() {
    console.log(`Trying to get tasks from local storage`);
    let SavedTasks = JSON.parse(localStorage.getItem('SavedTask')) || [];
    console.log(`Found ${SavedTasks.length} tasks in local storage`, SavedTasks);
    return SavedTasks;
}

// Remove Task from Local Storage
function removeFromLocalStorage(TaskName) {
    console.log(`Trying to remove "${TaskName}" from local storage`);
    let SavedTasks = getFromLocalStorage();
    let taskIndex = SavedTasks.findIndex(task => task.TaskName === TaskName);

    if (taskIndex !== -1) {
        SavedTasks.splice(taskIndex, 1);
        console.log(`"${TaskName}" removed from local storage`);
        localStorage.setItem('SavedTask', JSON.stringify(SavedTasks));
    } else {
        console.warn(`Task "${TaskName}" not found`);
    }
}

// Edit Task Status
function EditStatusOfItem(TaskName, Status) {
    console.log(`Trying to edit status of "${TaskName}" in local storage: ${Status}`);
    let SavedTasks = getFromLocalStorage();
    let taskIndex = SavedTasks.findIndex(task => task.TaskName === TaskName);

    if (taskIndex !== -1) {
        SavedTasks[taskIndex].Status = Status;
        console.log(`"${TaskName}" status updated to "${Status}"`);
        localStorage.setItem('SavedTask', JSON.stringify(SavedTasks));
    } else {
        console.warn(`Task "${TaskName}" not found`);
    }
}

// Edit Task Priority
function EditPriorityOfItem(TaskName, Priority) {
    console.log(`Trying to edit priority of "${TaskName}" in local storage: ${Priority}`);
    let SavedTasks = getFromLocalStorage();
    let taskIndex = SavedTasks.findIndex(task => task.TaskName === TaskName);

    if (taskIndex !== -1) {
        SavedTasks[taskIndex].Priority = Priority;
        console.log(`"${TaskName}" priority updated to "${Priority}"`);
        localStorage.setItem('SavedTask', JSON.stringify(SavedTasks));
    } else {
        console.warn(`Task "${TaskName}" not found`);
    }
}

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, EditStatusOfItem, EditPriorityOfItem };
