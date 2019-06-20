import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../base-components/Modal';
import { SeanceTicketsPage } from '../SeanceTicketsPage';
import { closeModal } from '../../../../ducks/ui/modals/actions';
import { resetReservationStatus } from '../../../../ducks/data/tickets/actions';

function SeanceTicketsModal({
  resetReservationStatus,
  closeModal,
  ...seanceTicketsPageProps
}) {
  const handleModalClose = useCallback(() => {
    resetReservationStatus();
    closeModal();
  }, []);

  return (
    <Modal onClose={handleModalClose}>
      <SeanceTicketsPage {...seanceTicketsPageProps} />
    </Modal>
  );
}

SeanceTicketsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resetReservationStatus: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  closeModal,
  resetReservationStatus,
};

export default connect(
  null,
  mapDispatchToProps,
)(SeanceTicketsModal);
