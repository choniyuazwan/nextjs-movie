const filtersReducerDefaultState = {
  release_date: []
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
  case 'SET_CHECKBOX_FILTER':
    return {
      ...state,
      release_date: [...state.release_date, action.release_date]
    };
  case 'REMOVE_CHECKBOX_FILTER':
    return {
      ...state,
      release_date: state.release_date.filter((release_date) => release_date !== action.release_date)
    };
  case 'CLEAR_FILTERS':
    return {
      ...state,
      release_date: []
    };
  default:
    return state;
  }
};

export default filtersReducer;
