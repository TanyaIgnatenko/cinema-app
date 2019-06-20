import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectModalsToShow } from '../../../ducks/ui/modals/selectors';
import { SeanceTicketsModal } from '../../app-components/seanceTickets/SeanceTicketsModal';
import { TicketsPaymentModal } from '../../app-components/ticketsPayment/TicketsPaymentModal';
import { PaymentSuccessModal } from '../../app-components/ticketsPayment/PaymentSuccessModal';
import { MODAL } from '../../../constants';
import { NotAvailableAuthModal } from '../../app-components/auth/NotAvailableAuthModal';

const MODAL_COMPONENTS = {
  [MODAL.SEANCE_TICKETS]: SeanceTicketsModal,
  [MODAL.TICKETS_PAYMENT]: TicketsPaymentModal,
  [MODAL.PAYMENT_SUCCESS]: PaymentSuccessModal,
  [MODAL.NOT_AVAILABLE_AUTH]: NotAvailableAuthModal,
};

function ModalManager({ modalsToShow }) {
  return (
    <React.Fragment>
      {modalsToShow.map(modal => {
        const SpecificModalComponent = MODAL_COMPONENTS[modal.modalType];
        return (
          <SpecificModalComponent key={modal.modalType} {...modal.modalProps} />
        );
      })}
    </React.Fragment>
  );
}

ModalManager.propTypes = {
  modalsToShow: PropTypes.arrayOf(
    PropTypes.shape({
      modalType: PropTypes.oneOf([
        MODAL.SEANCE_TICKETS,
        MODAL.TICKETS_PAYMENT,
        MODAL.PAYMENT_SUCCESS,
        MODAL.NOT_AVAILABLE_AUTH,
      ]).isRequired,
      modalProps: PropTypes.object,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  modalsToShow: selectModalsToShow(state),
});

export default connect(
  mapStateToProps,
  null,
)(ModalManager);
