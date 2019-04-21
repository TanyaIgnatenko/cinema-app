import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { App } from './containers/app';
import { Calendar } from './components/common/Calendar';

import './assets/scss/main.scss';

const history = createBrowserHistory();

const currentUser = {
  name: 'Таня',
  surname: 'Игнатенко',
};

ReactDOM.render(
  <BrowserRouter history={history}>
    <Calendar
      minDate='2019-03-04'
      maxDate='2019-06-28'
      onDateSelected={() => {}}
      selectedMonth='2019-04-01'
    />
  </BrowserRouter>,
  document.getElementById('root'),
);
