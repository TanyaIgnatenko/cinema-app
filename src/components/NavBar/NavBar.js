import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from './NavLink';
import { VerticalLine } from '../common/VerticalLine';
import { ROUTE } from '../../constants';

import './NavBar.scss';

function NavBar({ currentUser, onLogout, onSettings }) {
  return (
    <ul className='navBarContainer'>
      <h1 className='brand'>Формула кино</h1>
      <NavLink to={ROUTE.MOVIES}>Уже в кино</NavLink>
      <NavLink to={ROUTE.SOON_MOVIES}>Скоро в кино</NavLink>
      <NavLink to={ROUTE.BEST_DEALS}>Акции</NavLink>
      {/*{currentUser ? (*/}
      {/*  <>*/}
      {/*    <VerticalLine length={5} className='zone-delimeter' />*/}
      {/*    <UserIcon />*/}
      {/*    <div>*/}
      {/*      <p>{currentUser.name}</p>*/}
      {/*      <p>{currentUser.surname}</p>*/}
      {/*    </div>*/}

      {/*     <Dropdown toggleIcon={}>*/}
      {/*        <Dropdown.ToggleIcon openedClassname='up' closedClassname='down'>*/}
      {/*          <ArrowIcon/>*/}
      {/*        </Dropdown.ToggleIcon>*/}
      {/*        <Dropdown.Item onClick={onSettings}>Настройки</Dropdown.Item>*/}
      {/*        <Dropdown.Item onClick={onLogout}>Выход</Dropdown.Item>*/}
      {/*     </Dropdown>*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <button>Войти</button>*/}
      {/*)}*/}
    </ul>
  );
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  currentUser: null,
};

export default NavBar;
