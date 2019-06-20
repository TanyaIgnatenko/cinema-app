import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../base-components/Modal';
import { TicketsPaymentPage } from '../TicketsPaymentPage';
import { closeModal } from '../../../../ducks/ui/modals/actions';

function TicketsPaymentModal({ closeModal, ...ticketsPaymentPageProps }) {
  return (
    <Modal onClose={closeModal}>
      <TicketsPaymentPage {...ticketsPaymentPageProps} />
    </Modal>
  );
}

TicketsPaymentModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  closeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(TicketsPaymentModal);
