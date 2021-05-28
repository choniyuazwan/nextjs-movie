const moviesDefaultState = {
  movies: []
};

const moviesReducer = (state = moviesDefaultState, action) => {
  switch (action.type) {
  case 'ADD_MOVIE':
    return {
      ...state,
      movies: [ ...state.movies, action.movie ]
    };
  case 'CLEAR_MOVIES':
    return {
      ...state,
      movies: []
    };
  default:
    return state;
  }
};

export default moviesReducer;
