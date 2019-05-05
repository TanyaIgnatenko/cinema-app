import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from '../../pages/navbar';
import { Routes } from '../routes';

import '../../assets/scss/main.scss';

function App({ currentUser }) {
  return (
    <div className='app'>
      <NavBar
        currentUser={currentUser}
        onLogout={() => {}}
        onSettings={() => {}}
      />
      <div className='page'>
        <Routes className='' />
      </div>
    </div>
  );
}

App.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }),
};

App.defaultProps = {
  currentUser: null,
};

export default App;
