const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gSortBy = 'NAME';
var gTodos = _createTodos();


function getTodosForDisplay() {
    var todos;
    if (gFilterBy === 'ALL') {
        todos = gTodos;
    } else {
        todos = gTodos.filter(function (todo) {
            return (
                gFilterBy === 'DONE' && todo.isDone ||
                gFilterBy === 'ACTIVE' && !todo.isDone
            )
        })
    };

    return sortTodos(todos)
}

function addTodo(txt, priority) {
    gTodos.unshift(_createTodo(txt, priority))
    saveToStorage(STORAGE_KEY, gTodos);

}

function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gTodos);
}

function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}
function setSort(sortBy) {
    gSortBy = sortBy;
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var count = gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count += 1
        return count;
    }, 0)
    return count;
}
function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

function sortTodos(todos) {
    switch (gSortBy) {
        case 'NAME':
            gTodos.sort(function (todo, todo2) {
                var todo1Name = todo.txt.toUpperCase();
                var todo2Name = todo2.txt.toUpperCase();
                if (todo1Name > todo2Name) {
                    return 1;
                }
                if (todo1Name < todo2Name) {
                    return -1;
                }
                if (todo1Name === todo2Name) {
                    return 0;
                }
            })
            break;
        case 'CTIME':
            gTodos.sort(function (todo, todo2) {
                return todo.createdAt - todo2.createdAt;
            })
            break;
        case 'PRIORITY':
            gTodos.sort(function (todo, todo2) {
                return todo2.priority - todo.priority;
            })
            break;
        default: gSortBy;
    }
    return todos;
}

function checkTodosToDisplay() {
    var elFilter = document.querySelector('.filterbtn')
    var elTodoList = document.querySelector('.todo-list')
    switch (elFilter.value) {
        case 'ALL':
            elTodoList.innerText = ('No todos!')
            break;
        case 'ACTIVE':
            elTodoList.innerText = ('No active todos!')
            break;
        case 'DONE':
            elTodoList.innerText = ('No done todos!')
            break;
        default: elFilter.value;
    }
}


// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt, priority) {
    return {
        id: makeId(),
        priority: priority,
        txt: txt,
        isDone: false,
        createdAt: Date.now()
    };
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = []
        todos.push(_createTodo('Learn HTML'))
        todos.push(_createTodo('Master CSS'))
        todos.push(_createTodo('Become JS Ninja'))
    }
    return todos;
}
