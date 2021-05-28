export const addMovie = ({ id = '', title = '', poster_path = '', release_date = '' } = {}) => ({
  type: 'ADD_MOVIE',
  movie: {
    id,
    title,
    poster_path,
    release_date
  }
});

export const clearMovies = () => ({
  type: 'CLEAR_MOVIES'
});
