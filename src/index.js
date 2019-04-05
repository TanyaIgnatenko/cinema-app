import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import { NavBar } from './components/NavBar';

const history = createBrowserHistory();

const currentUser = {
  name: 'Таня',
  surname: 'Игнатенко',
};

ReactDOM.render(
  <Router history={history}>
    <NavBar
      currentUser={currentUser}
      onLogout={() => {}}
      onSettings={() => {}}
    />
  </Router>,
  document.getElementById('root'),
);
