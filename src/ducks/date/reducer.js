import { SELECT_DATE } from './action-types';

const initialState = {
  selectedDate: null,
};

export const date = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.date,
      };
    }
    default: {
      return state;
    }
  }
};
