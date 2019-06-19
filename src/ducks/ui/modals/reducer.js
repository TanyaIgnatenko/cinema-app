import { CLOSE_MODAL, SHOW_MODAL } from './action-types';

const initialState = {
  modalsToShow: [],
};

export const modals = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      const modal = {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
      return {
        ...state,
        modalsToShow: [...state.modalsToShow, modal],
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalsToShow: state.modalsToShow.slice(
          0,
          state.modalsToShow.length - 1,
        ),
      };
    }
    default:
      return state;
  }
};
