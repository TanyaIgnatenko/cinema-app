import { FETCH_MOVIE, FETCH_MOVIES } from './action-types';

const initialState = {
  movies: null,
  selectedMovie: null,
};

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES.REQUEST: {
      return {
        ...state,
        movies: null,
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