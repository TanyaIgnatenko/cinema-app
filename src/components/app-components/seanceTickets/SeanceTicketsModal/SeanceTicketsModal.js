import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../base-components/Modal';
import { SeanceTicketsPage } from '../SeanceTicketsPage';
import { closeModal } from '../../../../ducks/ui/modals/actions';

function SeanceTicketsModal({ closeModal, ...seanceTicketsPageProps }) {
  return (
    <Modal onClose={closeModal}>
      <SeanceTicketsPage {...seanceTicketsPageProps} />
    </Modal>
  );
}

SeanceTicketsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  closeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(SeanceTicketsModal);
