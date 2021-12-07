'use strict'

var gTodos
var gOriginalTodos
var gFirstRender = 0
_createTodos()

var gSortBy = 'TXT'
var gFilterBy = 'ALL'

function getTodosForDisplay() {
    // if (gFilterBy === 'ALL') return gTodos
    let todos = gTodos.slice()
    if (gFilterBy !== 'ALL') {
        todos = gTodos.filter(todo =>
            (todo.isDone && gFilterBy === 'DONE') ||
            (!todo.isDone && gFilterBy === 'ACTIVE'))
    }

    console.log(todos);


    if (gSortBy === 'TXT') {
        console.log('sorting');
        todos.sort(function (todo1, todo2) {
            if (todo1.txt.toLowerCase() < todo2.txt.toLowerCase()) { return -1; }
            if (todo2.txt.toLowerCase() > todo1.txt.toLowerCase()) { return 1; }
            return 0;
        })
    }

    if (gSortBy === 'IMPORTANCE') {
        todos.sort(function (todo1, todo2) {
            return todo2.importance - todo1.importance;
        })
    }

    if (gSortBy === 'CREATED') {
        todos.sort(function (todos1, todos2) {
            return todos2.timeStamp - todos1.timeStamp
        })
    }

    if (gFirstRender) {
        if (todos.length === 0 && gFilterBy === 'ALL') {
            todos = 'no todos!'
        }
        if (todos.length === 0 && gFilterBy === 'ACTIVE') {
            todos = 'no active todos!'
        }
        if (todos.length === 0 && gFilterBy === 'DONE') {
            todos = 'no done todos!'
        }
    }
    gFirstRender++
    return todos

}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const todos = gTodos.filter(todo => !todo.isDone)
    return todos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    if (confirm('are you sure?')) {
        gTodos.splice(idx, 1)
        _saveTodosToStorage()
    }
}

function addTodo(txt, imp) {
    if (!txt || txt === ' ') return
    const todo = _createTodo(txt, imp)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}


// Those are "private" functions meant to be used ONLY by the service itself
function _createTodo(txt, importance = 0) {
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        timeStamp: Date.now(),
        importance
    }
    return todo
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (!todos || todos.length === 0) {
        todos = [
            _createTodo('Learn JS'),
            _createTodo('Master CSS'),
            _createTodo('Study HTML'),
        ]
    }
    gTodos = todos
    gOriginalTodos = gTodos
    _saveTodosToStorage()
}

function _createdAt() {
    return getTime()
}


function getTime() {
    return new Date().toString().split(" ")[4];
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}