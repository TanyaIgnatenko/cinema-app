import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from './NavLink';
import { UserIcon } from './UserIcon';
import { ToggleIcon } from '../../base-components/ToggleIcon';
import { VerticalLine } from '../../base-components/VerticalLine';
import { Dropdown } from '../../base-components/Dropdown';
import { Button } from '../../base-components/Button';
import { MODAL, ROUTE } from '../../../constants';

import './NavBar.scss';
import { showModal } from '../../../ducks/ui/modals/actions';
import { connect } from 'react-redux';

function NavBar({ showModal }) {
  const showNotAvailableAuthModal = useCallback(() => {
    showModal(MODAL.NOT_AVAILABLE_AUTH);
  }, []);

  return (
    <header className='navBarContainer'>
      <ul className='leftPart'>
        <li>
          <h1 className='brand'>Формула кино</h1>
        </li>
        <li>
          <NavLink to={ROUTE.MOVIES}>Уже в кино</NavLink>
        </li>
        <li>
          <NavLink to={ROUTE.BEST_DEALS}>Акции</NavLink>
        </li>
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
