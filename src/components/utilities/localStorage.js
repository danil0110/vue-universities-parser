// Load data from local storage
export const loadFromLS = () => {
  const data = window.localStorage.getItem('universities');

  if (data) {
    return JSON.parse(data);
  }

  return { searchValue: '', universities: [], favorites: [] };
};

// Save data to local storage
export const saveToLS = (data) => {
  window.localStorage.setItem('universities', JSON.stringify(data));
};

// Clear data in local storage except favorite universities
export const clearLS = () => {
  const data = loadFromLS();
  window.localStorage.setItem('universities', JSON.stringify({ ...data, searchValue: '', universities: [] }));
};
