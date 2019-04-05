import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from './NavLink';
import { UserIcon } from './UserIcon';
import { VerticalLine } from '../common/VerticalLine';
import { Dropdown } from '../common/Dropdown';
import { ROUTE } from '../../constants';

import './NavBar.scss';

import downArrowIcon from '../../assets/images/down-arrow.svg';

function NavBar({ currentUser, onLogout, onSettings }) {
  return (
    <ul className='navBarContainer'>
      <div className='leftPart'>
        <h1 className='brand'>Формула кино</h1>
        <NavLink to={ROUTE.MOVIES}>Уже в кино</NavLink>
        <NavLink to={ROUTE.SOON_MOVIES}>Скоро в кино</NavLink>
        <NavLink to={ROUTE.BEST_DEALS}>Акции</NavLink>
      </div>
      <div className='rightPart'>
        {currentUser ? (
          <>
            <VerticalLine length={60} width={1} className='zone-delimeter' />
            <UserIcon />
            <div className='usernameContainer'>
              <p>{currentUser.name}</p>
              <p>{currentUser.surname}</p>
            </div>

            <Dropdown>
              <Dropdown.Toggle>
                <img alt='toggle-icon' src={downArrowIcon} />
              </Dropdown.Toggle>
              <Dropdown.List>
                <Dropdown.Item onClick={onSettings}>Настройки</Dropdown.Item>
                <Dropdown.Item onClick={onLogout}>Выход</Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          </>
        ) : (
          <button>Войти</button>
        )}
      </div>
    </ul>
  );
}

NavBar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  currentUser: null,
};

export default NavBar;
