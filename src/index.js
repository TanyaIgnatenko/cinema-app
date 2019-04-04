import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import { NavBar } from './components/NavBar';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <NavBar />
  </Router>,
  document.getElementById('root'),
);
