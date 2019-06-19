import { CLOSE_MODAL, SHOW_MODAL } from './action-types';

const showModal = (modalType, modalProps) => ({
  type: SHOW_MODAL,
  modalType,
  modalProps,
});

const closeModal = () => ({
  type: CLOSE_MODAL,
});

export { showModal, closeModal };
