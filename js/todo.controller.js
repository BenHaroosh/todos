'use strict'

function onInit() {
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay();
    console.log(todos);

    if (!Array.isArray(todos)) {
        document.querySelector('.todo-list').innerText = `${todos}`
        return
    }
    const strHTMLs = todos.map(todo => {
        const className = (todo.isDone) ? 'done' : ''
        const strHTML = `<li class="${className}" onclick="onToggleTodo(this, '${todo.id}')">
            <span>${todo.txt}</span>
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
         </li>`

        return strHTML
    })
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.todo-total-count').innerText = getTotalCount()
    document.querySelector('.todo-active-count').innerText = getActiveCount()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    console.log('Removing..', todoId);
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(elTodo, todoId) {
    console.log('Toggling..', todoId);
    toggleTodo(todoId)
    // elTodo.classList.toggle('done') // but also need to re-render stat
    renderTodos()
}

function onAddTodo() {
    const elTxtInput = document.querySelector('.txt');
    const elImpInput = document.querySelector('.Importance');
    console.log('Adding Todo', elTxtInput.value);
    if (elImpInput.value > 3 || elImpInput.value < 1) return
    addTodo(elTxtInput.value, elImpInput.value)
    elImpInput.value = ''
    elTxtInput.value = ''
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By', filterBy);
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortBy) {
    console.log('sorting By', sortBy)
    setSort(sortBy)
    renderTodos()
}