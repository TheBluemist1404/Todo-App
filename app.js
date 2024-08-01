const new_task = document.getElementById('add-task')
const todo_list = document.querySelector('.todo-list')
const add_task_form = document.getElementById('add-task-form')

//Initialize
let allTodos = getTodos();
updateTodo();

add_task_form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})
//add new todo into the list
function addTodo() {
    const todoText = new_task.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            done: false
        }
        allTodos.push(todoObject)
        updateTodo();
        saveTodos();
        new_task.value = "";
    }
}

//remake the todo_list
function updateTodo() {
    todo_list.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        new_todo = createTodo(todo, todoIndex);
        todo_list.append(new_todo);
    });
}

//create a li to add to todo_list
function createTodo(todo, todoIndex) {
    const todoID = "todo-" + todoIndex;
    const todoLi = document.createElement("li")
    const todoText = todo.text
    todoLi.className = "todo"
    todoLi.innerHTML = `
            <input type="checkbox" id="${todoID}" >
            <label for="${todoID}" class="custom-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="transparent">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
            </label>
            <label for="${todoID}" class="todo-text">
                ${todoText}
            </label>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
    `
// set up delete button
    const delete_button = todoLi.querySelector('.delete-button')
    delete_button.addEventListener('click', (e) => {
        deleteTodo(todoIndex);
    })
//set up checkbox property
    const check_box = todoLi.querySelector('input')
    check_box.addEventListener('change', ()=>{
        allTodos[todoIndex].done = check_box.checked
        saveTodos();
    })
//this is for the createTodo()
    check_box.checked = allTodos[todoIndex].done;
//return
    return todoLi;
}

function deleteTodo(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    updateTodo();
    saveTodos();
}
//save the todo_list
function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}
//get the saved todo_list
function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}