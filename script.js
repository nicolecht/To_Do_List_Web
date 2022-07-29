const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".taskbox");

let todos = JSON.parse(localStorage.getItem("todo-list")); // get localStorage todo-list

// show all todos
function showTodo() {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            // if todo status is completed, set isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" name="" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li><i class="uil-pen"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i class="uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        });
    }
    taskBox.innerHTML = li;
}
showTodo();

// show task-menu
function showMenu(selectedTask) {
    // get task-menu ul
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        // remove show class from task-menu on the doc click
        if(e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    })
}

// delete task
function deleteTask(deleteId) {
    // remove selected task from array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos)); // update storage
    showTodo();
}

// update task status
function updateStatus(selectedTask) {
    // get paragraph containing task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed"; //update to complete status
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending"; //update to pending status
    }
    localStorage.setItem("todo-list", JSON.stringify(todos)); // save new status to storage
}

// add new task
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!todos) { // if todos doesn't exist, pass an empty array to todos
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = {name: userTask, status: "pending"}; //default status
        todos.push(taskInfo); // add new task to todos
        localStorage.setItem("todo-list", JSON.stringify(todos)); // save to storage with todo-list name
        showTodo();
    }
});
