const selectMovies = state => state.movies.movies;

const selectSelectedMovie = state => state.movies.selectedMovie;

const selectSelectedMovieSeances = state => state.movies.selectedMovieSeances;

const selectMoviesError = state => state.movies.error;

export { selectMovies, selectSelectedMovie, selectMoviesError, selectSelectedMovieSeances };
