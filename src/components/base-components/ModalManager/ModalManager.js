import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectModalsToShow } from '../../../ducks/ui/modals/selectors';
import { SeanceTicketsPage } from '../../app-components/seanceTickets/SeanceTicketsPage';
import { MODAL } from '../../../constants';
import { SeanceTicketsModal } from '../../app-components/seanceTickets/SeanceTicketsModal';

const MODAL_COMPONENTS = {
  [MODAL.SEANCE_TICKETS]: SeanceTicketsModal,
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
      modalType: PropTypes.oneOf([MODAL.SEANCE_TICKETS]).isRequired,
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
