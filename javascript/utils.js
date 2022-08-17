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
