function getAllTodoElement() {
  return document.querySelectorAll('#todoList > li');
}

function isMathStatus(liElement, filterStatus) {
  return filterStatus === 'All' || liElement.dataset.status === filterStatus;
}

function isMatchSearch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return true;
  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function isMatch(liElement, params) {
  return (
    isMatchSearch(liElement, params.get('searchTerm')) &&
    isMathStatus(liElement, params.get('status'))
  );
}

// function searchTodo(searchTerm) {
//   const todoElementList = getAllTodoElement();
//   for (const todoElement of todoElementList) {
//     const needToShow = isMatch(todoElement, searchTerm);
//     todoElement.hidden = !needToShow;
//   }
// }

function initSearchInput(params) {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;
  if (params.get('searchTerm')) {
    searchInput.value = params.get('searchTerm');
  }
  searchInput.addEventListener('input', () => {
    // searchTodo(searchInput.value);
    handleFilterChange('searchTerm', searchInput.value);
  });
}

function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, '', url);

  const todoElementList = getAllTodoElement();
  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, url.searchParams);
    todoElement.hidden = !needToShow;
  }
}

// function filterTodo(filterStatus) {
//   const todoElementList = getAllTodoElement();
//   for (const todoElement of todoElementList) {
//     const needToShow = filterStatus === 'All' || todoElement.dataset.status === filterStatus;
//     todoElement.hidden = !needToShow;
//   }
// }

function initFilterStatus(params) {
  const filterStatusSelect = document.getElementById('filterStatus');
  if (!filterStatusSelect) return;

  if (params.get('status')) {
    filterStatusSelect.value = params.get('status');
  }

  filterStatusSelect.addEventListener('change', () => {
    // console.log('status change', filterStatusSelect.value);
    // filterTodo(filterStatusSelect.value);
    handleFilterChange('status', filterStatusSelect.value);
  });
}

(() => {
  const params = new URLSearchParams(window.location.search);
  initSearchInput(params);
  initFilterStatus(params);
})();
