import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from '../navbar';
import { Routes } from '../routes';
import { ModalManager } from '../../base-components/ModalManager';

function App({ currentUser }) {
  return (
    <div className='app'>
      <ModalManager />
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
