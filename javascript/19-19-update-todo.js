function createTodoElement(todo) {
  if (!todo) return null;

  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  const divElement = todoElement.querySelector('div.todo');
  if (!divElement) return null;
  const alertClass = todo.status === 'complete' ? 'alert-success' : 'alert-secondary';
  divElement.classList.remove('alert-secondary');
  divElement.classList.add(alertClass);

  const btnElement = todoElement.querySelector('button.mark-as-done');
  if (!btnElement) return null;
  const btnClass = todo.status === 'complete' ? 'btn-success' : 'btn-dark';
  const btnTitle = todo.status === 'complete' ? 'Reset' : 'Finish';
  btnElement.classList.remove('btn-success');
  btnElement.classList.add(btnClass);
  btnElement.textContent = btnTitle;

  const titleElement = todoElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    markAsDoneButton.addEventListener('click', () => {
      const currentStatus = todoElement.dataset.status;
      const newStatus = currentStatus === 'pending' ? 'complete' : 'pending';
      const todoList = getTodoList();
      const index = todoList.findIndex((x) => x.id === todo.id);
      if (index >= 0) {
        todoList[index].status = newStatus;
        localStorage.setItem('todo_list', JSON.stringify(todoList));
      }

      todoElement.dataset.status = newStatus;

      const newAlertClass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
      divElement.classList.remove('alert-success', 'alert-secondary');
      divElement.classList.add(newAlertClass);

      const newBtnClass = currentStatus === 'pending' ? 'btn-success' : 'btn-dark';
      btnElement.classList.remove('btn-success', 'btn-dark');
      btnElement.classList.add(newBtnClass);

      const newBtnTitle = currentStatus === 'pending' ? 'Reset' : 'Finish';
      btnElement.textContent = newBtnTitle;
    });
  }

  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      const todoList = getTodoList();
      //console.log({ todoList, removeId: todo.id });
      const newTodoList = todoList.filter((x) => x.id != todo.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));
      todoElement.remove();
    });
  }

  const editButton = todoElement.querySelector('button.edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      const todoList = getTodoList();
      const latestTodo = todoList.find((x) => x.id === todo.id);
      if (!latestTodo) return;
      populateTodoForm(latestTodo);
    });
  }

  return todoElement;
}
function populateTodoForm(todo) {
  const todoForm = document.getElementById('todoFormId');
  if (!todoForm) return;
  todoForm.dataset.id = todo.id;
  const todoInput = document.getElementById('todoText');
  if (todoInput) todoInput.value = todo.title;
  const todoCheckStt = document.getElementById('checkStatus');
  if (todoCheckStt) todoCheckStt.checked = todo.status === 'complete' ? true : false;
}

function renderTodoList(todoList, ulElementID) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;
  const ulElement = document.getElementById(ulElementID);
  if (!ulElement) return;
  for (const todo of todoList) {
    const liElement = createTodoElement(todo);
    ulElement.appendChild(liElement);
  }
}

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch {
    return [];
  }
}

function handleTodoFormSubmit(event) {
  const todoForm = document.getElementById('todoFormId');
  if (!todoForm) return;
  event.preventDefault();
  const todoInput = document.getElementById('todoText');
  if (!todoInput) return;

  const isEdit = Boolean(todoForm.dataset.id);
  if (isEdit) {
    const todoCheckStt = document.getElementById('checkStatus');
    if (!todoCheckStt) return;
    const todoList = getTodoList();
    const index = todoList.findIndex((x) => x.id.toString() === todoForm.dataset.id);
    if (index < 0) return;
    todoList[index].title = todoInput.value;
    (todoList[index].status = todoCheckStt.checked === true ? 'complete' : 'pending'),
      localStorage.setItem('todo_list', JSON.stringify(todoList));
    const liElement = document.querySelector(
      `ul#todoList > li[data-id = "${todoForm.dataset.id}"]`
    );
    if (liElement) {
      // liElement.textContent = todoInput.value;
      const titleElement = liElement.querySelector('.todo__title');
      if (titleElement) titleElement.textContent = todoInput.value;
      const divElement = liElement.querySelector('div.todo');
      if (!divElement) return;
      const alertClass = todoCheckStt.checked === true ? 'alert-success' : 'alert-secondary';
      divElement.classList.remove('alert-secondary', 'alert-success');
      divElement.classList.add(alertClass);
    }
  } else {
    const todoCheckStt = document.getElementById('checkStatus');
    if (!todoCheckStt) return;
    const todoText = todoInput.value;
    const newTodo = {
      id: Date.now(),
      title: todoText,
      status: todoCheckStt.checked === true ? 'complete' : 'pending',
    };
    const todoList = getTodoList();
    todoList.push(newTodo);
    localStorage.setItem('todo_list', JSON.stringify(todoList));
    const newLiElement = createTodoElement(newTodo);
    const ulElement = document.getElementById('todoList');
    if (!ulElement) return;
    ulElement.appendChild(newLiElement);
  }
  delete todoForm.dataset.id;
  todoForm.reset();
}

(() => {
  // const todoList = [
  //   { id: 1, title: 'javascript', status: 'pending' },
  //   { id: 2, title: 'html', status: 'complete' },
  //   { id: 3, title: 'css', status: 'pending' },
  // ];
  const todoList = getTodoList();
  renderTodoList(todoList, 'todoList');

  const todoForm = document.getElementById('todoFormId');
  if (todoForm) {
    todoForm.addEventListener('submit', handleTodoFormSubmit);
  }
})();
