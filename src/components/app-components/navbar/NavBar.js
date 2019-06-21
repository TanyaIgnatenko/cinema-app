import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavLink } from './NavLink';
import { Button } from '../../base-components/Button';
import { MODAL, ROUTE } from '../../../constants';
import { showModal } from '../../../ducks/ui/modals/actions';

import './NavBar.scss';

function NavBar({ showModal }) {
  const showNotAvailableAuthModal = useCallback(() => {
    showModal(MODAL.NOT_AVAILABLE_AUTH);
  }, []);

  return (
    <header className='navBarContainer'>
      <ul className='leftPart'>
        <h1 className='brand'>Формула кино</h1>
        <NavLink to={ROUTE.MOVIES}>Уже в кино</NavLink>
        <NavLink to={ROUTE.BEST_DEALS}>Акции</NavLink>
      </ul>
      <div className='rightPart'>
        <Button className='login-btn' onClick={showNotAvailableAuthModal}>
          Войти
        </Button>
      </div>
    </header>
  );
}

NavBar.propTypes = {
  showModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  showModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(NavBar);
