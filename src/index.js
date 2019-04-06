import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import { App } from './containers/app';

import './assets/scss/main.scss';

const history = createBrowserHistory();

const currentUser = {
  name: 'Таня',
  surname: 'Игнатенко',
};

ReactDOM.render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
