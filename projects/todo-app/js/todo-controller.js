'use strict'

console.log('Hi');


function onInit() {
    renderTodos();
}
function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();
    if (todos.length === 0) {
        checkTodosToDisplay();
        return;
    }
    todos.forEach(function (todo) {
        strHTML +=
            `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')">x</button>
        </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTML;

    document.querySelector('.total').innerText = getTodosCount()
    document.querySelector('.active').innerText = getActiveTodosCount()
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var elPriority = document.querySelector('.priority');
    var txt = elNewTodoTxt.value
    if (!elNewTodoTxt.value) {
        alert('Please insert a mission')
        return;
    }
    var priority = elPriority.value
    addTodo(txt , priority);
    renderTodos();
    elNewTodoTxt.value = '';
}

function onRemoveTodo(ev, todoId) {
    var result = confirm('Are you sure you want to delete that mission?');
    ev.stopPropagation();
    if (!result) return;
    removeTodo(todoId);
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos();
}