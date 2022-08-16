function createTodoElement(todo) {
  if (!todo) return null;

  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;

  const titleElement = todoElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  return todoElement;
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
(() => {
  const todoList = [
    { id: 1, title: 'javascript' },
    { id: 2, title: 'html' },
    { id: 3, title: 'css' },
  ];
  renderTodoList(todoList, 'todoList');
})();
