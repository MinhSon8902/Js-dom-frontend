function renderTodoList(ulElementID) {
  const todoList = [
    { id: 1, title: 'javascript' },
    { id: 2, title: 'html' },
    { id: 3, title: 'css' },
  ];

  const ulElement = document.getElementById(ulElementID);
  if (!ulElement) return;
  for (const todo of todoList) {
    const liElement = document.createElement('li');
    liElement.textContent = todo.title;
    liElement.dataset.id = todo.id;
    ulElement.appendChild(liElement);
  }
}
(() => {
  renderTodoList('todoList');
})();
