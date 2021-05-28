export const getAllMovies = state => state.moviesReducer.movies;

export const getFilteredMovies = state => {
  const { moviesReducer: { movies }, filtersReducer } = state;
  return movies.filter((movie) => {
    if (filtersReducer.release_date.length > 0) {
      return filtersReducer.release_date.includes(movie.release_date);
    } else {
      return movie;
    }
  }).sort((a, b) => {
    const textA = a.release_date.toUpperCase();
    const textB = b.release_date.toUpperCase();
    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
  });
};
