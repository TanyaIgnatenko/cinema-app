import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../base-components/Modal';
import { TicketsPaymentPage } from '../TicketsPaymentPage';
import { closeModal } from '../../../../ducks/ui/modals/actions';
import { resetPaymentStatus } from '../../../../ducks/data/tickets/actions';

function TicketsPaymentModal({
  closeModal,
  resetPaymentStatus,
  ...ticketsPaymentPageProps
}) {
  const handleModalClose = useCallback(() => {
    resetPaymentStatus();
    closeModal();
  }, []);

  return (
    <Modal onClose={handleModalClose}>
      <TicketsPaymentPage {...ticketsPaymentPageProps} />
    </Modal>
  );
}

TicketsPaymentModal.propTypes = {
  resetPaymentStatus: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  resetPaymentStatus,
  closeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(TicketsPaymentModal);
