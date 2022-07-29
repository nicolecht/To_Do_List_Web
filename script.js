const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".taskbox");

let todos = JSON.parse(localStorage.getItem("todo-list")); // get localStorage todo-list

function showTodo() {
    let li = "";
    todos.forEach((todo, id) => {
        li += `<li class="task">
                    <label for="${id}">
                        <input type="checkbox" name="" id="${id}">
                        <p>${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i class="uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li><i class="uil-pen"></i>Edit</li>
                            <li><i class="uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
    });
    taskBox.innerHTML = li;
}
showTodo();

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
