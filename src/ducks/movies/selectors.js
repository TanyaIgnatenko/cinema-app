const selectMovies = state => state.movies.movies;

const selectSelectedMovie = state => state.movies.selectedMovie;

const selectMoviesError = state => state.movies.error;

export { selectMovies, selectSelectedMovie, selectMoviesError };
