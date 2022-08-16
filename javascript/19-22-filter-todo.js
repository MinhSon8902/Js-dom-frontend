function getAllTodoElement() {
  return document.querySelectorAll('#todoList > li');
}

function isMatch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return true;
  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const todoElementList = getAllTodoElement();
  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, searchTerm);
    todoElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    searchTodo(searchInput.value);
  });
}

function filterTodo(filterStatus) {
  const todoElementList = getAllTodoElement();
  for (const todoElement of todoElementList) {
    const needToShow = filterStatus === 'All' || todoElement.dataset.status === filterStatus;
    todoElement.hidden = !needToShow;
  }
}

function initFilterStatus() {
  const filterStatusSelect = document.getElementById('filterStatus');
  if (!filterStatusSelect) return;
  filterStatusSelect.addEventListener('change', () => {
    console.log('status change', filterStatusSelect.value);
    filterTodo(filterStatusSelect.value);
  });
}

(() => {
  initSearchInput();
  initFilterStatus();
})();
