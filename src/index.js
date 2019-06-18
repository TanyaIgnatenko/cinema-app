import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import moment from 'moment';

import { App } from './components/app-components/app';
import { history } from './store/rootReducer';
import { store } from './store/store';

import './assets/scss/reset.scss';
import './assets/scss/main.scss';
import './index.scss';

moment.locale('ru');

const nominative_months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const subjective_months = [
  'Января',
  'Февраля',
  'Мара',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

moment.updateLocale('ru', {
  months(momentToFormat, format) {
    if (/^MMMM/.test(format)) {
      return nominative_months[momentToFormat.month()];
    }
    return subjective_months[momentToFormat.month()];
  },
  weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
});

const currentUser = {
  name: 'Таня',
  surname: 'Игнатенко',
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

