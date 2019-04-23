import { FETCH_MOVIES } from './action-types';

const initialState = {
  movies: [],
};

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES.SUCCESS: {
      return {
        ...state,
        movies: action.movies,
      };
    }
    default: {
      return state;
    }
  }
};