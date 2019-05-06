import { FETCH_MOVIE, FETCH_MOVIES, FETCH_SEANCES } from './action-types';

const initialState = {
  movies: null,
  selectedMovie: null,
  movieSeances: null,
};

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES.REQUEST: {
      return {
        ...state,
        movies: null,
      };
    }
    case FETCH_MOVIE.REQUEST: {
      return {
        ...state,
        selectedMovie: null,
      };
    }
    case FETCH_SEANCES.REQUEST: {
      return {
        ...state,
        movieSeances: null,
      };
    }
    case FETCH_MOVIES.SUCCESS: {
      return {
        ...state,
        movies: action.movies,
      };
    }
    case FETCH_MOVIE.SUCCESS: {
      return {
        ...state,
        selectedMovie: action.movie,
      };
    }
    case FETCH_SEANCES.SUCCESS: {
      return {
        ...state,
        movieSeances: action.seances,
      };
    }
    case FETCH_MOVIES.ERROR:
    case FETCH_MOVIE.ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};