export const setCheckboxFilter = (release_date) => ({
  type: 'SET_CHECKBOX_FILTER',
  release_date
});

export const removeCheckboxFilter = (release_date) => ({
  type: 'REMOVE_CHECKBOX_FILTER',
  release_date
});

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
});
